import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { CheckSquare, Clock, AlertTriangle, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react'
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
    { label: 'En progreso', value: inProgress.length, icon: TrendingUp, light: 'bg-[#e8faf7] text-[#00263d]' },
    { label: 'Vencidas', value: overdue.length, icon: AlertTriangle, light: 'bg-red-50 text-red-700' },
    { label: 'Vencen pronto', value: dueSoon.length, icon: Clock, light: 'bg-amber-50 text-amber-700' },
    { label: 'Total horas', value: formatHours(totalLogged), icon: CheckSquare, light: 'bg-green-50 text-green-700' },
  ]

  const byStatus = STATUS_LIST.map(s => ({
    ...s,
    count: myTasks.filter(t => t.status === s.id).length
  }))

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

  function getService(id) { return services.find(s => s.id === id) }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Hola, {currentUser?.name} 👋</h1>
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

      {/* Calendario */}
      <div className="mb-6">
        <CalendarView tasks={myTasks} today={today} services={services} users={users} />
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
              const service = getService(task.serviceId)
              const isOverdue = task.dueDate < today
              const status = STATUS_LIST.find(s => s.id === task.status)
              const priority = PRIORITIES.find(p => p.id === task.priority)
              const assignees = (Array.isArray(task.assignedTo) ? task.assignedTo : [task.assignedTo])
                .map(id => users.find(u => u.id === id)).filter(Boolean)
              return (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-1 h-12 rounded-full flex-shrink-0" style={{ backgroundColor: priority?.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs" style={{ color: service?.color }}>{service?.icon} {service?.name}</span>
                      <span className={`text-xs ${isOverdue ? 'text-red-500 font-semibold' : 'text-gray-400'}`}>
                        {isOverdue ? '⚠ ' : ''}{new Date(task.dueDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex -space-x-1 flex-shrink-0">
                    {assignees.map(u => (
                      <div key={u.id} className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white"
                        style={{ backgroundColor: u.color }}>{u.name[0]}</div>
                    ))}
                  </div>
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

          {currentUser?.role === 'admin' && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h2 className="font-semibold text-gray-900 mb-3">Carga por persona</h2>
              <div className="space-y-3">
                {byUser.map(u => (
                  <div key={u.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                          style={{ backgroundColor: u.color }}>{u.name[0]}</div>
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

function CalendarView({ tasks, today, services, users }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState(null)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const monthName = currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
  const firstDay = new Date(year, month, 1).getDay() // 0=domingo
  const startOffset = firstDay === 0 ? 6 : firstDay - 1 // lunes primero
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1))
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1))

  function getTasksForDay(day) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return tasks.filter(t => t.dueDate === dateStr && t.status !== 'done')
  }

  const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

  const selectedTasks = selectedDay ? getTasksForDay(selectedDay) : []
  const selectedDateStr = selectedDay
    ? `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    : null

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 capitalize">{monthName}</h2>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4 text-gray-500" />
          </button>
          <button onClick={() => setCurrentDate(new Date())}
            className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-gray-600 font-medium">
            Hoy
          </button>
          <button onClick={nextMonth}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-100 rounded-xl overflow-hidden">
        {/* Empty cells before first day */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`e-${i}`} className="bg-white min-h-[72px]" />
        ))}

        {/* Day cells */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const dayTasks = getTasksForDay(day)
          const isToday = dateStr === today
          const isSelected = selectedDay === day
          const isPast = dateStr < today
          const hasOverdue = dayTasks.some(t => t.dueDate < today)

          return (
            <div
              key={day}
              onClick={() => setSelectedDay(isSelected ? null : day)}
              className={`bg-white min-h-[72px] p-1.5 cursor-pointer transition-all hover:bg-[#f0fdf9] ${
                isSelected ? 'ring-2 ring-inset ring-[#78dcc6] bg-[#f0fdf9]' : ''
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold mb-1 ${
                isToday
                  ? 'bg-[#00263d] text-white'
                  : isPast
                    ? 'text-gray-300'
                    : 'text-gray-700'
              }`}>
                {day}
              </div>
              <div className="space-y-0.5">
                {dayTasks.slice(0, 3).map(t => {
                  const priority = PRIORITIES.find(p => p.id === t.priority)
                  return (
                    <div key={t.id}
                      className="text-xs px-1 py-0.5 rounded truncate leading-tight"
                      style={{ backgroundColor: (priority?.color || '#6366f1') + '20', color: priority?.color || '#6366f1' }}>
                      {t.title}
                    </div>
                  )
                })}
                {dayTasks.length > 3 && (
                  <div className="text-xs text-gray-400 px-1">+{dayTasks.length - 3} más</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Selected day detail */}
      {selectedDay && selectedTasks.length > 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Tareas del {selectedDay} de {currentDate.toLocaleDateString('es-ES', { month: 'long' })}
          </p>
          <div className="space-y-2">
            {selectedTasks.map(t => {
              const priority = PRIORITIES.find(p => p.id === t.priority)
              const status = STATUS_LIST.find(s => s.id === t.status)
              const service = services.find(s => s.id === t.serviceId)
              const assignees = (Array.isArray(t.assignedTo) ? t.assignedTo : [t.assignedTo])
                .map(id => users.find(u => u.id === id)).filter(Boolean)
              return (
                <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                  <div className="w-1 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: priority?.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{t.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {service && <span className="text-xs" style={{ color: service.color }}>{service.icon} {service.name}</span>}
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ backgroundColor: status?.color + '20', color: status?.color }}>
                        {status?.label}
                      </span>
                    </div>
                  </div>
                  <div className="flex -space-x-1">
                    {assignees.map(u => (
                      <div key={u.id} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ring-1 ring-white"
                        style={{ backgroundColor: u.color }} title={u.name}>{u.name[0]}</div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {selectedDay && selectedTasks.length === 0 && (
        <div className="mt-4 border-t border-gray-100 pt-4 text-center text-sm text-gray-400">
          Sin tareas para este día
        </div>
      )}
    </div>
  )
}
