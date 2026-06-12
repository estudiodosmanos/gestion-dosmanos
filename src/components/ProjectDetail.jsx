import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { X, Timer, StopCircle, Edit2, Trash2, Plus } from 'lucide-react'
import { STATUS_LIST, PRIORITIES, formatHours, formatTime } from '../utils/data'
import TaskModal from './TaskModal'

export default function ProjectDetail({ project, onClose }) {
  const { state, dispatch, activeTimer, timerSeconds, startTimer, stopTimer } = useApp()
  const { tasks, users, services, currentUser } = state
  const isAdmin = currentUser?.role === 'admin'

  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editTask, setEditTask] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const projectTasks = isAdmin
    ? tasks.filter(t => t.projectId === project.id)
    : tasks.filter(t => t.projectId === project.id && t.assignedTo === currentUser?.id)
  const filtered = filterStatus === 'all'
    ? projectTasks
    : projectTasks.filter(t => t.status === filterStatus)

  const sorted = [...filtered].sort((a, b) => {
    const pd = { high: 0, medium: 1, low: 2 }
    if (a.status === 'done' && b.status !== 'done') return 1
    if (a.status !== 'done' && b.status === 'done') return -1
    if (pd[a.priority] !== pd[b.priority]) return pd[a.priority] - pd[b.priority]
    return a.dueDate.localeCompare(b.dueDate)
  })

  const done = projectTasks.filter(t => t.status === 'done').length
  const total = projectTasks.length
  const pct = total ? Math.round((done / total) * 100) : 0
  const totalLogged = projectTasks.reduce((s, t) => s + (t.loggedTime || 0), 0)
  const today = new Date().toISOString().split('T')[0]

  const service = services.find(s => s.id === project.serviceId)

  function getUser(id) { return users.find(u => u.id === id) }
  function getService(id) { return services.find(s => s.id === id) }

  function handleDelete(id) {
    if (confirm('¿Eliminar esta tarea?')) dispatch({ type: 'DELETE_TASK', payload: id })
  }

  function handleToggleStatus(task) {
    const idx = STATUS_LIST.findIndex(s => s.id === task.status)
    const next = STATUS_LIST[(idx + 1) % STATUS_LIST.length]
    dispatch({ type: 'UPDATE_TASK', payload: { ...task, status: next.id } })
  }

  // Unique assignees on this project
  const assigneeIds = [...new Set(projectTasks.flatMap(t => Array.isArray(t.assignedTo) ? t.assignedTo : [t.assignedTo]))]
  const assignees = assigneeIds.map(id => getUser(id)).filter(Boolean)

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-screen w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start gap-4 p-5 border-b border-gray-100">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: project.color + '20' }}>
            <span className="text-2xl">{service?.icon || '📁'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 truncate">{project.name}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-500">{project.client}</span>
              {service && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: service.color + '15', color: service.color }}>
                  {service.name}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-4 gap-0 border-b border-gray-100">
          {[
            { label: 'Total', value: total, color: 'text-gray-900' },
            { label: 'Completadas', value: done, color: 'text-green-600' },
            { label: 'Activas', value: total - done, color: 'text-[#00263d]' },
            { label: 'Horas', value: formatHours(totalLogged), color: 'text-amber-600' },
          ].map(s => (
            <div key={s.label} className="py-3 text-center border-r border-gray-100 last:border-0">
              <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Progress + assignees */}
        <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progreso</span><span>{pct}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, backgroundColor: project.color }} />
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {assignees.map(u => (
              <div key={u.id} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white"
                style={{ backgroundColor: u.color }} title={u.name}>
                {u.name[0]}
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-5 py-3 flex items-center gap-2 border-b border-gray-100">
          <div className="flex gap-1 flex-1 flex-wrap">
            {[{ id: 'all', label: 'Todas' }, ...STATUS_LIST].map(s => (
              <button key={s.id} onClick={() => setFilterStatus(s.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterStatus === s.id
                    ? 'bg-[#00263d] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {s.label}
                {s.id !== 'all' && (
                  <span className="ml-1 opacity-70">
                    ({projectTasks.filter(t => t.status === s.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>
          {isAdmin && (
            <button
              onClick={() => { setEditTask(null); setShowTaskModal(true) }}
              className="flex items-center gap-1.5 bg-[#00263d] hover:bg-[#003a5c] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0">
              <Plus className="w-3.5 h-3.5" />
              Añadir tarea
            </button>
          )}
        </div>

        {/* Task list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-2">
          {sorted.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p>No hay tareas con este filtro</p>
            </div>
          )}

          {sorted.map(task => {
            const taskAssignees = (Array.isArray(task.assignedTo) ? task.assignedTo : [task.assignedTo]).map(id => getUser(id)).filter(Boolean)
            const taskService = getService(task.serviceId)
            const priority = PRIORITIES.find(p => p.id === task.priority)
            const status = STATUS_LIST.find(s => s.id === task.status)
            const isOverdue = task.dueDate < today && task.status !== 'done'
            const isActive = activeTimer?.taskId === task.id
            const canTime = (Array.isArray(task.assignedTo) ? task.assignedTo.includes(currentUser?.id) : task.assignedTo === currentUser?.id) || isAdmin

            return (
              <div key={task.id} className={`p-3.5 rounded-xl border transition-all ${
                task.status === 'done'
                  ? 'bg-gray-50 border-gray-100 opacity-60'
                  : isActive
                    ? 'border-green-400 bg-green-50 ring-1 ring-green-200'
                    : 'bg-white border-gray-200 hover:border-gray-300'
              }`}>
                <div className="flex items-start gap-3">
                  {/* Priority bar */}
                  <div className="w-1 h-12 rounded-full flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: task.status === 'done' ? '#cbd5e1' : priority?.color }} />

                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.status === 'done' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{task.description}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 mt-1.5">
                      {taskService && taskService.id !== project.serviceId && (
                        <span className="text-xs" style={{ color: taskService.color }}>
                          {taskService.icon} {taskService.name}
                        </span>
                      )}
                      <button onClick={() => handleToggleStatus(task)}
                        className="text-xs px-2 py-0.5 rounded-full font-medium cursor-pointer hover:opacity-80 transition-opacity"
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
                    </div>
                  </div>

                  {/* Right actions */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {taskAssignees.length > 0 && (
                      <div className="flex -space-x-1">
                        {taskAssignees.map(u => (
                          <div key={u.id} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ring-1 ring-white"
                            style={{ backgroundColor: u.color }} title={u.name}>
                            {u.name[0]}
                          </div>
                        ))}
                      </div>
                    )}

                    {canTime && task.status !== 'done' && (
                      isActive ? (
                        <button onClick={stopTimer}
                          className="flex items-center gap-1 bg-red-100 text-red-600 hover:bg-red-200 text-xs font-semibold px-2 py-1 rounded-lg transition-colors">
                          <StopCircle className="w-3 h-3" />
                          {formatTime(timerSeconds)}
                        </button>
                      ) : (
                        <button onClick={() => startTimer(task.id)} disabled={!!activeTimer}
                          className="flex items-center gap-1 bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-40 text-xs font-semibold px-2 py-1 rounded-lg transition-colors">
                          <Timer className="w-3 h-3" />
                          Fichar
                        </button>
                      )
                    )}

                    <button onClick={() => { setEditTask(task); setShowTaskModal(true) }}
                      className="p-1 text-gray-400 hover:text-[#00263d] hover:bg-[#e8faf7] rounded-lg transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {isAdmin && (
                      <button onClick={() => handleDelete(task.id)}
                        className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {showTaskModal && (
        <TaskModal
          task={editTask}
          defaultProjectId={project.id}
          onClose={() => { setShowTaskModal(false); setEditTask(null) }}
        />
      )}
    </>
  )
}
