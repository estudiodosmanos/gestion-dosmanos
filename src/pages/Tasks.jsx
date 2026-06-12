import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Timer, StopCircle, Trash2, Edit2, ChevronDown, Filter } from 'lucide-react'
import { STATUS_LIST, PRIORITIES, formatHours, formatTime } from '../utils/data'
import TaskModal from '../components/TaskModal'

export default function Tasks() {
  const { state, dispatch, activeTimer, timerSeconds, startTimer, stopTimer } = useApp()
  const { tasks, users, services, projects, currentUser } = state

  const [showModal, setShowModal] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterUser, setFilterUser] = useState(currentUser?.role === 'admin' ? 'all' : currentUser?.id)
  const [filterService, setFilterService] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')

  const isAdmin = currentUser?.role === 'admin'

  const hasUser = (t, uid) => Array.isArray(t.assignedTo) ? t.assignedTo.includes(uid) : t.assignedTo === uid
  let filtered = isAdmin ? tasks : tasks.filter(t => hasUser(t, currentUser?.id))
  if (filterStatus !== 'all') filtered = filtered.filter(t => t.status === filterStatus)
  if (filterPriority !== 'all') filtered = filtered.filter(t => t.priority === filterPriority)
  if (isAdmin && filterUser !== 'all') filtered = filtered.filter(t => hasUser(t, filterUser))
  if (filterService !== 'all') filtered = filtered.filter(t => t.serviceId === filterService)

  filtered = [...filtered].sort((a, b) => {
    if (sortBy === 'dueDate') return a.dueDate.localeCompare(b.dueDate)
    if (sortBy === 'priority') {
      const pd = { high: 0, medium: 1, low: 2 }
      return pd[a.priority] - pd[b.priority]
    }
    return a.title.localeCompare(b.title)
  })

  const today = new Date().toISOString().split('T')[0]

  function getUser(id) { return users.find(u => u.id === id) }
  function getService(id) { return services.find(s => s.id === id) }
  function getProject(id) { return projects.find(p => p.id === id) }

  function handleDelete(id) {
    if (confirm('¿Eliminar esta tarea?')) dispatch({ type: 'DELETE_TASK', payload: id })
  }

  function handleToggleStatus(task) {
    const idx = STATUS_LIST.findIndex(s => s.id === task.status)
    const next = STATUS_LIST[(idx + 1) % STATUS_LIST.length]
    dispatch({ type: 'UPDATE_TASK', payload: { ...task, status: next.id } })
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tareas</h1>
        <button onClick={() => { setEditTask(null); setShowModal(true) }}
          className="flex items-center gap-2 bg-[#00263d] hover:bg-[#003a5c] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Nueva tarea
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5 flex flex-wrap gap-3 items-center">
        <Filter className="w-4 h-4 text-gray-400" />

        <Select label="Estado" value={filterStatus} onChange={setFilterStatus}
          options={[{ value: 'all', label: 'Todos' }, ...STATUS_LIST.map(s => ({ value: s.id, label: s.label }))]} />

        <Select label="Prioridad" value={filterPriority} onChange={setFilterPriority}
          options={[{ value: 'all', label: 'Todas' }, ...PRIORITIES.map(p => ({ value: p.id, label: p.label }))]} />

        {isAdmin && (
          <Select label="Persona" value={filterUser} onChange={setFilterUser}
            options={[{ value: 'all', label: 'Todos' }, ...users.filter(u => u.role !== 'admin').map(u => ({ value: u.id, label: u.name }))]} />
        )}

        <Select label="Servicio" value={filterService} onChange={setFilterService}
          options={[{ value: 'all', label: 'Todos' }, ...services.map(s => ({ value: s.id, label: s.name }))]} />

        <Select label="Ordenar" value={sortBy} onChange={setSortBy}
          options={[{ value: 'dueDate', label: 'Fecha' }, { value: 'priority', label: 'Prioridad' }, { value: 'title', label: 'Nombre' }]} />

        <span className="text-xs text-gray-400 ml-auto">{filtered.length} tareas</span>
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <CheckSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p>No hay tareas con estos filtros</p>
          </div>
        )}
        {filtered.map(task => {
          const assignees = (Array.isArray(task.assignedTo) ? task.assignedTo : [task.assignedTo]).map(id => getUser(id)).filter(Boolean)
          const service = getService(task.serviceId)
          const project = getProject(task.projectId)
          const priority = PRIORITIES.find(p => p.id === task.priority)
          const status = STATUS_LIST.find(s => s.id === task.status)
          const isOverdue = task.dueDate < today && task.status !== 'done'
          const isActive = activeTimer?.taskId === task.id
          const canTime = !activeTimer || isActive

          return (
            <div key={task.id} className={`bg-white rounded-2xl border shadow-sm p-4 transition-all ${
              isActive ? 'border-green-400 ring-2 ring-green-100' : 'border-gray-100 hover:border-gray-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className="w-1 h-14 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: priority?.color }} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className={`font-medium text-gray-900 ${task.status === 'done' ? 'line-through text-gray-400' : ''}`}>
                        {task.title}
                      </p>
                      {task.description && (
                        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{task.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {(isAdmin || hasUser(task, currentUser?.id)) && (
                        <>
                          {isActive ? (
                            <button onClick={stopTimer}
                              className="flex items-center gap-1.5 bg-red-100 text-red-600 hover:bg-red-200 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                              <StopCircle className="w-3.5 h-3.5" />
                              {formatTime(timerSeconds)}
                            </button>
                          ) : (
                            <button onClick={() => startTimer(task.id)} disabled={!!activeTimer}
                              className="flex items-center gap-1.5 bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                              <Timer className="w-3.5 h-3.5" />
                              Fichar
                            </button>
                          )}
                        </>
                      )}
                      <button onClick={() => { setEditTask(task); setShowModal(true) }}
                        className="p-1.5 text-gray-400 hover:text-[#00263d] hover:bg-[#e8faf7] rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      {isAdmin && (
                        <button onClick={() => handleDelete(task.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {service && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: service.color + '15', color: service.color }}>
                        {service.icon} {service.name}
                      </span>
                    )}
                    {project && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {project.name}
                      </span>
                    )}
                    <button onClick={() => handleToggleStatus(task)}
                      className="text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer transition-all hover:opacity-80"
                      style={{ backgroundColor: status?.color + '20', color: status?.color }}>
                      {status?.label}
                    </button>
                    <span className={`text-xs ${isOverdue ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                      {isOverdue ? '⚠ ' : '📅 '}
                      {new Date(task.dueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </span>
                    {task.loggedTime > 0 && (
                      <span className="text-xs text-[#78dcc6] bg-[#e8faf7] px-2 py-0.5 rounded-full">
                        ⏱ {formatHours(task.loggedTime)}
                      </span>
                    )}
                    {assignees.length > 0 && (
                      <div className="flex items-center gap-1 ml-auto">
                        <div className="flex -space-x-1">
                          {assignees.map(u => (
                            <div key={u.id} className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ring-1 ring-white"
                              style={{ backgroundColor: u.color }} title={u.name}>
                              {u.name[0]}
                            </div>
                          ))}
                        </div>
                        {assignees.length === 1 && <span className="text-xs text-gray-500">{assignees[0].name}</span>}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {showModal && (
        <TaskModal task={editTask} onClose={() => { setShowModal(false); setEditTask(null) }} />
      )}
    </div>
  )
}

function CheckSquare({ className }) {
  return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
}

function Select({ label, value, onChange, options }) {
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)}
        className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-xs px-3 py-2 pr-7 rounded-lg focus:ring-2 focus:ring-[#78dcc6] outline-none cursor-pointer">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" />
    </div>
  )
}
