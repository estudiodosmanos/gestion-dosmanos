import { useApp } from '../context/AppContext'
import { formatTime, formatHours } from '../utils/data'
import { Clock } from 'lucide-react'

export default function TimeTracking() {
  const { state } = useApp()
  const { timeEntries, tasks, users, services, currentUser } = state
  const isAdmin = currentUser?.role === 'admin'

  const myEntries = isAdmin
    ? timeEntries
    : timeEntries.filter(e => e.userId === currentUser?.id)

  const sorted = [...myEntries].sort((a, b) => b.startedAt - a.startedAt)

  // Stats
  const totalSeconds = myEntries.reduce((s, e) => s + e.duration, 0)
  const today = new Date().toISOString().split('T')[0]
  const todaySeconds = myEntries
    .filter(e => new Date(e.startedAt).toISOString().split('T')[0] === today)
    .reduce((s, e) => s + e.duration, 0)

  // Group by task
  const byTask = tasks.map(t => {
    const entries = myEntries.filter(e => e.taskId === t.id)
    return { task: t, seconds: entries.reduce((s, e) => s + e.duration, 0), count: entries.length }
  }).filter(x => x.seconds > 0).sort((a, b) => b.seconds - a.seconds)

  // By user (admin)
  const byUser = users.filter(u => u.role !== 'admin').map(u => {
    const secs = timeEntries.filter(e => e.userId === u.id).reduce((s, e) => s + e.duration, 0)
    return { user: u, seconds: secs }
  }).filter(x => x.seconds > 0).sort((a, b) => b.seconds - a.seconds)

  function getTask(id) { return tasks.find(t => t.id === id) }
  function getUser(id) { return users.find(u => u.id === id) }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Registro de tiempos</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total registrado', value: formatHours(totalSeconds), sub: formatTime(totalSeconds) },
          { label: 'Hoy', value: formatHours(todaySeconds), sub: formatTime(todaySeconds) },
          { label: 'Fichas totales', value: myEntries.length, sub: 'registros' },
          { label: 'Tareas con tiempo', value: byTask.length, sub: 'tareas' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Log */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Historial de fichas</h2>
          {sorted.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Clock className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Aún no hay tiempo registrado</p>
              <p className="text-sm mt-1">Usa el botón "Fichar" en las tareas para empezar</p>
            </div>
          )}
          <div className="space-y-2">
            {sorted.map(entry => {
              const task = getTask(entry.taskId)
              const user = getUser(entry.userId)
              const service = task ? services.find(s => s.id === task.serviceId) : null
              const date = new Date(entry.startedAt)
              return (
                <div key={entry.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{task?.title || 'Tarea eliminada'}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {service && <span className="text-xs" style={{ color: service.color }}>{service.icon} {service.name}</span>}
                      <span className="text-xs text-gray-400">
                        {date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} · {date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                  {isAdmin && user && (
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: user.color }}>
                      {user.name[0]}
                    </div>
                  )}
                  <span className="text-sm font-bold text-[#00263d] flex-shrink-0 font-mono">
                    {formatTime(entry.duration)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Por tarea</h2>
            <div className="space-y-3">
              {byTask.slice(0, 8).map(({ task, seconds }) => {
                const service = services.find(s => s.id === task.serviceId)
                const max = byTask[0]?.seconds || 1
                return (
                  <div key={task.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-700 truncate flex-1 mr-2">{task.title}</span>
                      <span className="text-xs font-semibold text-gray-900 flex-shrink-0">{formatHours(seconds)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full"
                        style={{ width: `${(seconds / max) * 100}%`, backgroundColor: service?.color || '#6366f1' }} />
                    </div>
                  </div>
                )
              })}
              {byTask.length === 0 && <p className="text-xs text-gray-400">Sin datos</p>}
            </div>
          </div>

          {isAdmin && byUser.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Por persona</h2>
              <div className="space-y-3">
                {byUser.map(({ user, seconds }) => (
                  <div key={user.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: user.color }}>{user.name[0]}</div>
                        <span className="text-xs text-gray-700">{user.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900">{formatHours(seconds)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full"
                        style={{ width: `${(seconds / byUser[0].seconds) * 100}%`, backgroundColor: user.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
