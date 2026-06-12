import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { X, Check } from 'lucide-react'
import { STATUS_LIST, PRIORITIES } from '../utils/data'

export default function TaskModal({ task, onClose, defaultProjectId }) {
  const { state, dispatch } = useApp()
  const { users, services, projects, currentUser } = state
  const isAdmin = currentUser?.role === 'admin'

  const normalizeAssigned = (val) => {
    if (!val) return isAdmin ? [] : [currentUser?.id]
    return Array.isArray(val) ? val : [val]
  }

  const [form, setForm] = useState({
    title: task?.title || '',
    description: task?.description || '',
    assignedTo: normalizeAssigned(task?.assignedTo),
    serviceId: task?.serviceId || services[0]?.id,
    projectId: task?.projectId || defaultProjectId || '',
    priority: task?.priority || 'medium',
    status: task?.status || 'pending',
    dueDate: task?.dueDate || new Date().toISOString().split('T')[0],
    estimatedHours: task?.estimatedHours || '',
  })

  function toggleAssignee(uid) {
    setForm(f => {
      const already = f.assignedTo.includes(uid)
      return {
        ...f,
        assignedTo: already
          ? f.assignedTo.filter(id => id !== uid)
          : [...f.assignedTo, uid]
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    if (task) {
      dispatch({ type: 'UPDATE_TASK', payload: { ...task, ...form } })
    } else {
      dispatch({
        type: 'ADD_TASK',
        payload: {
          ...form,
          id: 't_' + Date.now(),
          loggedTime: 0,
          createdAt: new Date().toISOString().split('T')[0],
        }
      })
    }
    onClose()
  }

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">{task ? 'Editar tarea' : 'Nueva tarea'}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)}
              placeholder="Nombre de la tarea"
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#78dcc6] focus:border-transparent outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)}
              rows={2} placeholder="Detalles de la tarea..."
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-[#78dcc6] focus:border-transparent outline-none resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
              <select value={form.serviceId} onChange={e => set('serviceId', e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]">
                {services.map(s => <option key={s.id} value={s.id}>{s.icon} {s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Proyecto</label>
              <select value={form.projectId} onChange={e => set('projectId', e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]">
                <option value="">Sin proyecto</option>
                {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
              <select value={form.priority} onChange={e => set('priority', e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]">
                {PRIORITIES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]">
                {STATUS_LIST.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha límite</label>
              <input type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Horas estimadas</label>
              <input type="number" min="0" step="0.5" value={form.estimatedHours} onChange={e => set('estimatedHours', e.target.value)}
                placeholder="0"
                className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]" />
            </div>
          </div>

          {isAdmin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Asignar a
                {form.assignedTo.length > 0 && (
                  <span className="ml-2 text-xs font-normal text-[#78dcc6]">
                    {form.assignedTo.length} seleccionada{form.assignedTo.length > 1 ? 's' : ''}
                  </span>
                )}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {users.filter(u => u.role !== 'admin').map(u => {
                  const selected = form.assignedTo.includes(u.id)
                  return (
                    <button type="button" key={u.id}
                      onClick={() => toggleAssignee(u.id)}
                      className={`flex items-center gap-2 p-2 rounded-xl border transition-all text-left ${
                        selected ? 'border-[#78dcc6] bg-[#e8faf7]' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: u.color }}>{u.name[0]}</div>
                      <span className="text-sm font-medium text-gray-700 flex-1">{u.name}</span>
                      {selected && <Check className="w-4 h-4 text-[#78dcc6] flex-shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
              Cancelar
            </button>
            <button type="submit"
              className="px-4 py-2 text-sm font-semibold bg-[#00263d] hover:bg-[#003a5c] text-white rounded-xl transition-colors">
              {task ? 'Guardar cambios' : 'Crear tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
