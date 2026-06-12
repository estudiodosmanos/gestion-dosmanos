import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Trash2, Edit2, FolderOpen, ChevronRight } from 'lucide-react'
import { STATUS_LIST } from '../utils/data'
import ProjectDetail from '../components/ProjectDetail'

export default function Projects() {
  const { state, dispatch } = useApp()
  const { projects, tasks, services, currentUser } = state
  const [selectedProject, setSelectedProject] = useState(null)
  const isAdmin = currentUser?.role === 'admin'

  const [showForm, setShowForm] = useState(false)
  const [editProject, setEditProject] = useState(null)
  const [form, setForm] = useState({ name: '', client: '', serviceId: '', color: '#6366f1' })

  function openNew() { setForm({ name: '', client: '', serviceId: services[0]?.id, color: '#6366f1' }); setEditProject(null); setShowForm(true) }
  function openEdit(p) { setForm({ name: p.name, client: p.client, serviceId: p.serviceId, color: p.color }); setEditProject(p); setShowForm(true) }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return
    if (editProject) {
      dispatch({ type: 'UPDATE_PROJECT', payload: { ...editProject, ...form } })
    } else {
      dispatch({ type: 'ADD_PROJECT', payload: { ...form, id: 'p_' + Date.now() } })
    }
    setShowForm(false)
  }

  function handleDelete(id) {
    if (confirm('¿Eliminar proyecto? Las tareas asociadas permanecerán.'))
      dispatch({ type: 'DELETE_PROJECT', payload: id })
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Proyectos</h1>
        {isAdmin && (
          <button onClick={openNew}
            className="flex items-center gap-2 bg-[#00263d] hover:bg-[#003a5c] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" />
            Nuevo proyecto
          </button>
        )}
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-[#b8f0e6] shadow-sm p-5 mb-5">
          <h3 className="font-semibold text-gray-900 mb-4">{editProject ? 'Editar proyecto' : 'Nuevo proyecto'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Nombre del proyecto"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Cliente</label>
              <input value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))}
                placeholder="Nombre del cliente"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Servicio</label>
              <select value={form.serviceId} onChange={e => setForm(f => ({ ...f, serviceId: e.target.value }))}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]">
                {services.map(s => <option key={s.id} value={s.id}>{s.icon} {s.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Color</label>
              <input type="color" value={form.color} onChange={e => setForm(f => ({ ...f, color: e.target.value }))}
                className="w-full h-9 border border-gray-300 rounded-xl px-1 py-1 cursor-pointer" />
            </div>
            <div className="col-span-2 flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">Cancelar</button>
              <button type="submit"
                className="px-4 py-2 text-sm font-semibold bg-[#00263d] hover:bg-[#003a5c] text-white rounded-xl">
                {editProject ? 'Guardar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.filter(project => {
          if (isAdmin) return true
          return tasks.some(t => t.projectId === project.id && (Array.isArray(t.assignedTo) ? t.assignedTo.includes(currentUser?.id) : t.assignedTo === currentUser?.id))
        }).map(project => {
          const projectTasks = isAdmin
            ? tasks.filter(t => t.projectId === project.id)
            : tasks.filter(t => t.projectId === project.id && (Array.isArray(t.assignedTo) ? t.assignedTo.includes(currentUser?.id) : t.assignedTo === currentUser?.id))
          const service = services.find(s => s.id === project.serviceId)
          const byStatus = STATUS_LIST.map(s => ({
            ...s,
            count: projectTasks.filter(t => t.status === s.id).length
          }))
          const done = projectTasks.filter(t => t.status === 'done').length
          const total = projectTasks.length
          const pct = total ? Math.round((done / total) * 100) : 0

          return (
            <div key={project.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 cursor-pointer hover:border-[#78dcc6] hover:shadow-md transition-all group"
              onClick={() => setSelectedProject(project)}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: project.color + '20' }}>
                    <FolderOpen className="w-5 h-5" style={{ color: project.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 group-hover:text-[#00263d] transition-colors">{project.name}</p>
                    <p className="text-xs text-gray-500">{project.client}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {isAdmin && (
                    <>
                      <button onClick={e => { e.stopPropagation(); openEdit(project) }}
                        className="p-1.5 text-gray-400 hover:text-[#00263d] hover:bg-[#e8faf7] rounded-lg transition-colors">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={e => { e.stopPropagation(); handleDelete(project.id) }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </>
                  )}
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>

              {service && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: service.color + '15', color: service.color }}>
                  {service.icon} {service.name}
                </span>
              )}

              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Progreso</span>
                  <span className="text-xs font-semibold text-gray-700">{pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, backgroundColor: project.color }} />
                </div>
              </div>

              <div className="mt-3 flex gap-2 flex-wrap">
                {byStatus.filter(s => s.count > 0).map(s => (
                  <span key={s.id} className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: s.color + '20', color: s.color }}>
                    {s.count} {s.label}
                  </span>
                ))}
                {total === 0 && <span className="text-xs text-gray-400">Sin tareas</span>}
              </div>
            </div>
          )
        })}
      </div>

      {selectedProject && (
        <ProjectDetail
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}
