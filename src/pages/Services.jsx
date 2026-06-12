import { useApp } from '../context/AppContext'
import { STATUS_LIST, PRIORITIES, formatHours } from '../utils/data'

export default function Services() {
  const { state } = useApp()
  const { tasks, services, users, timeEntries, currentUser } = state
  const isAdmin = currentUser?.role === 'admin'

  const allTasks = isAdmin ? tasks : tasks.filter(t => t.assignedTo === currentUser?.id)

  const serviceStats = services.map(service => {
    const sTasks = allTasks.filter(t => t.serviceId === service.id)
    const active = sTasks.filter(t => t.status !== 'done')
    const done = sTasks.filter(t => t.status === 'done')
    const totalSeconds = timeEntries
      .filter(e => sTasks.some(t => t.id === e.taskId))
      .reduce((sum, e) => sum + e.duration, 0)
    const byPriority = PRIORITIES.map(p => ({
      ...p,
      count: active.filter(t => t.priority === p.id).length
    }))
    const byUser = users.filter(u => u.role !== 'admin').map(u => ({
      ...u,
      count: sTasks.filter(t => t.assignedTo === u.id && t.status !== 'done').length
    })).filter(u => u.count > 0)
    return { service, tasks: sTasks, active, done, totalSeconds, byPriority, byUser }
  }).filter(s => s.tasks.length > 0)
    .sort((a, b) => b.active.length - a.active.length)

  const total = allTasks.filter(t => t.status !== 'done').length

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Carga por servicio</h1>
        <p className="text-sm text-gray-500 mt-1">Distribución de tareas activas por tipo de servicio</p>
      </div>

      {/* Overview bar */}
      {total > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
          <p className="text-sm font-medium text-gray-600 mb-3">{total} tareas activas en total</p>
          <div className="flex h-8 rounded-xl overflow-hidden gap-0.5">
            {serviceStats.map(({ service, active }) => active.length === 0 ? null : (
              <div key={service.id}
                className="flex items-center justify-center text-white text-xs font-semibold transition-all"
                style={{ width: `${(active.length / total) * 100}%`, backgroundColor: service.color }}
                title={`${service.name}: ${active.length}`}>
                {active.length > 1 ? active.length : ''}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            {serviceStats.filter(s => s.active.length > 0).map(({ service, active }) => (
              <div key={service.id} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: service.color }} />
                <span className="text-xs text-gray-600">{service.icon} {service.name}</span>
                <span className="text-xs font-semibold text-gray-900">({active.length})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Service cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {serviceStats.map(({ service, tasks: sTasks, active, done, totalSeconds, byPriority, byUser }) => (
          <div key={service.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ backgroundColor: service.color + '15' }}>
                {service.icon}
              </div>
              <div>
                <h2 className="font-bold text-gray-900">{service.name}</h2>
                <p className="text-sm text-gray-500">{sTasks.length} tareas · {formatHours(totalSeconds)} registradas</p>
              </div>
              <div className="ml-auto text-right">
                <p className="text-2xl font-bold" style={{ color: service.color }}>{active.length}</p>
                <p className="text-xs text-gray-400">activas</p>
              </div>
            </div>

            {/* Progress */}
            {sTasks.length > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Completadas</span>
                  <span>{done.length} / {sTasks.length}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${(done.length / sTasks.length) * 100}%`, backgroundColor: service.color }} />
                </div>
              </div>
            )}

            {/* By priority */}
            {active.length > 0 && (
              <div className="flex gap-2 mb-3">
                {byPriority.filter(p => p.count > 0).map(p => (
                  <span key={p.id} className="text-xs px-2 py-1 rounded-full font-medium"
                    style={{ backgroundColor: p.color + '20', color: p.color }}>
                    {p.count} {p.label}
                  </span>
                ))}
              </div>
            )}

            {/* By user */}
            {isAdmin && byUser.length > 0 && (
              <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                <span className="text-xs text-gray-400">Asignado a:</span>
                {byUser.map(u => (
                  <div key={u.id} className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: u.color }}>{u.name[0]}</div>
                    <span className="text-xs text-gray-600">{u.name} ({u.count})</span>
                  </div>
                ))}
              </div>
            )}

            {/* Recent tasks */}
            <div className="mt-3 space-y-1.5">
              {active.slice(0, 3).map(task => {
                const priority = PRIORITIES.find(p => p.id === task.priority)
                const status = STATUS_LIST.find(s => s.id === task.status)
                const today = new Date().toISOString().split('T')[0]
                const isOverdue = task.dueDate < today
                return (
                  <div key={task.id} className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: priority?.color }} />
                    <span className="text-gray-700 truncate flex-1">{task.title}</span>
                    <span className={isOverdue ? 'text-red-500 font-medium' : 'text-gray-400'}>
                      {new Date(task.dueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                )
              })}
              {active.length > 3 && (
                <p className="text-xs text-gray-400 pl-3">+{active.length - 3} más</p>
              )}
            </div>
          </div>
        ))}

        {serviceStats.length === 0 && (
          <div className="col-span-2 text-center py-12 text-gray-400">
            <p>No hay tareas registradas</p>
          </div>
        )}
      </div>
    </div>
  )
}
