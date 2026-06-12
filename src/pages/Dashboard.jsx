import { useApp } from '../context/AppContext'
import { CheckSquare, Clock, AlertTriangle, TrendingUp } from 'lucide-react'
import { STATUS_LIST, PRIORITIES, formatHours } from '../utils/data'

export default function Dashboard() {
  const { state } = useApp()
  const { tasks, users, services, currentUser } = state

  const hasUser = (t, uid) => Array.isArray(t.assignedTo) ? t.assignedTo.includes(uid) : t.assignedTo === uid
  const myTasks = currentUser?.role === 'admin'
    ? tasks
    : tasks.filter(t => hasUser(t, currentUser?.id))

  const today = new Date().toISOString().split('T')[0]
  const overdue = myTasks.filter(t => t.dueDate < today && t.status !== 'done')
  const dueSoon = myTasks.filter(t => t.dueDate >= today && t.dueDate <= new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0] && t.status !== 'done')
  const inProgress = myTasks.filter(t => t.status === 'in_progress')
  const totalLogged = myTasks.reduce((sum, t) => sum + (t.loggedTime || 0), 0)

  const stats = [
    { label: 'En progreso', value: inProgress.length, icon: TrendingUp, color: 'bg-[#e8faf7]0', light: 'bg-[#e8faf7] text-[#00263d]' },
    { label: 'Vencidas', value: overdue.length, icon: AlertTriangle, color: 'bg-red-500', light: 'bg-red-50 text-red-700' },
    { label: 'Vencen pronto', value: dueSoon.length, icon: Clock, color: 'bg-amber-500', light: 'bg-amber-50 text-amber-700' },
    { label: 'Total horas', value: formatHours(totalLogged), icon: CheckSquare, color: 'bg-green-500', light: 'bg-green-50 text-green-700' },
  ]

  // Tasks by priority
  const byPriority = PRIORITIES.map(p => ({
    ...p,
    count: myTasks.filter(t => t.priority === p.id && t.status !== 'done').length
  }))

  // Tasks by status
  const byStatus = STATUS_LIST.map(s => ({
    ...s,
    count: myTasks.filter(t => t.status === s.id).length
  }))

  // Tasks by user (admin only)
  const byUser = users.filter(u => u.role !== 'admin').map(u => ({
    ...u,
    count: tasks.filter(t => hasUser(t, u.id) && t.status !== 'done').length,
    done: tasks.filter(t => hasUser(t, u.id) && t.status === 'done').length,
  }))

  const urgentTasks = myTasks
    .filter(t => t.status !== 'done')
    .sort((a, b) => {
      const pd = { high: 0, medium: 1, low: 2 }
      if (pd[a.priority] !== pd[b.priority]) return pd[a.priority] - pd[b.priority]
      return a.dueDate.localeCompare(b.dueDate)
    })
    .slice(0, 5)

  function getUser(id) { return users.find(u => u.id === id) }
  function getService(id) { return services.find(s => s.id === id) }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Hola, {currentUser?.name} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${s.light} mb-3`}>
              <s.icon className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent tasks */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Tareas urgentes</h2>
          <div className="space-y-3">
            {urgentTasks.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-4">No hay tareas pendientes 🎉</p>
            )}
            {urgentTasks.map(task => {
              const assignee = getUser(task.assignedTo)
              const service = getService(task.serviceId)
              const isOverdue = task.dueDate < today
              const status = STATUS_LIST.find(s => s.id === task.status)
              const priority = PRIORITIES.find(p => p.id === task.priority)
              return (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: priority?.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs" style={{ color: service?.color }}>{service?.icon} {service?.name}</span>
                      <span className={`text-xs ${isOverdue ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                        {isOverdue ? '⚠ ' : ''}
                        {new Date(task.dueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                  {assignee && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ backgroundColor: assignee.color }}>
                      {assignee.name[0]}
                    </div>
                  )}
                  <span className="text-xs px-2 py-1 rounded-full font-medium flex-shrink-0"
                    style={{ backgroundColor: status?.color + '20', color: status?.color }}>
                    {status?.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* By status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900 mb-3">Estado</h2>
            <div className="space-y-2">
              {byStatus.map(s => (
                <div key={s.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-sm text-gray-600">{s.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* By user (admin) */}
          {currentUser?.role === 'admin' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Carga por persona</h2>
              <div className="space-y-3">
                {byUser.map(u => (
                  <div key={u.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: u.color }}>
                          {u.name[0]}
                        </div>
                        <span className="text-sm text-gray-700">{u.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{u.count} activas</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all"
                        style={{ width: `${Math.min(100, (u.count / Math.max(1, Math.max(...byUser.map(x => x.count)))) * 100)}%`, backgroundColor: u.color }} />
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
