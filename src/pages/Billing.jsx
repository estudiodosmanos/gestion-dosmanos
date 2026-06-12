import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Euro, TrendingUp, TrendingDown, Plus, Edit2, Check, X } from 'lucide-react'
import { formatHours, loadFromStorage, saveToStorage } from '../utils/data'

function useBilling() {
  const [billing, setBilling] = useState(() => loadFromStorage('billing', {}))

  function setBillForTask(taskId, amount) {
    const updated = { ...billing, [taskId]: parseFloat(amount) || 0 }
    setBilling(updated)
    saveToStorage('billing', updated)
  }

  return { billing, setBillForTask }
}

const HOURLY_RATE = 60 // € por hora — coste interno estimado

export default function Billing() {
  const { state } = useApp()
  const { tasks, projects, services, users } = state
  const { billing, setBillForTask } = useBilling()

  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [filterService, setFilterService] = useState('all')
  const [filterProject, setFilterProject] = useState('all')
  const [hourlyRate, setHourlyRate] = useState(HOURLY_RATE)
  const [editingRate, setEditingRate] = useState(false)
  const [rateValue, setRateValue] = useState(String(HOURLY_RATE))

  const allBillableTasks = tasks.filter(t => t.status === 'done' || billing[t.id])

  let filtered = allBillableTasks
  if (filterService !== 'all') filtered = filtered.filter(t => t.serviceId === filterService)
  if (filterProject !== 'all') filtered = filtered.filter(t => t.projectId === filterProject)

  const totalBilled = filtered.reduce((s, t) => s + (billing[t.id] || 0), 0)
  const totalCost = filtered.reduce((s, t) => s + ((t.loggedTime || 0) / 3600) * hourlyRate, 0)
  const totalProfit = totalBilled - totalCost
  const margin = totalBilled > 0 ? Math.round((totalProfit / totalBilled) * 100) : 0

  // Group by project
  const byProject = projects.map(p => {
    const pTasks = filtered.filter(t => t.projectId === p.id)
    const billed = pTasks.reduce((s, t) => s + (billing[t.id] || 0), 0)
    const cost = pTasks.reduce((s, t) => s + ((t.loggedTime || 0) / 3600) * hourlyRate, 0)
    return { project: p, tasks: pTasks, billed, cost, profit: billed - cost }
  }).filter(x => x.tasks.length > 0)

  function startEdit(task) {
    setEditingId(task.id)
    setEditValue(billing[task.id] ? String(billing[task.id]) : '')
  }

  function confirmEdit(taskId) {
    setBillForTask(taskId, editValue)
    setEditingId(null)
  }

  function getUser(id) { return users.find(u => u.id === id) }
  function getService(id) { return services.find(s => s.id === id) }
  function getProject(id) { return projects.find(p => p.id === id) }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facturación</h1>
          <p className="text-sm text-gray-500 mt-0.5">Ingresos, costes y beneficio por tarea</p>
        </div>
        {/* Hourly rate config */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2 shadow-sm">
          <span className="text-xs text-gray-500">Coste/hora interno:</span>
          {editingRate ? (
            <div className="flex items-center gap-1.5">
              <input autoFocus value={rateValue} onChange={e => setRateValue(e.target.value)}
                className="w-16 border border-[#78dcc6] rounded-lg px-2 py-1 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#78dcc6] text-center" />
              <span className="text-xs text-gray-400">€</span>
              <button onClick={() => { setHourlyRate(parseFloat(rateValue) || hourlyRate); setEditingRate(false) }}
                className="p-1 bg-[#00263d] text-white rounded-lg hover:bg-[#003a5c]"><Check className="w-3 h-3" /></button>
              <button onClick={() => setEditingRate(false)}
                className="p-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"><X className="w-3 h-3" /></button>
            </div>
          ) : (
            <button onClick={() => { setEditingRate(true); setRateValue(String(hourlyRate)) }}
              className="flex items-center gap-1 font-semibold text-[#00263d] hover:underline text-sm">
              {hourlyRate}€/h <Edit2 className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KPICard label="Facturado" value={`${totalBilled.toFixed(0)}€`} icon={Euro} color="indigo" sub={`${filtered.filter(t => billing[t.id]).length} tareas facturadas`} />
        <KPICard label="Coste estimado" value={`${totalCost.toFixed(0)}€`} icon={Euro} color="amber" sub={`A ${hourlyRate}€/h`} />
        <KPICard
          label="Beneficio"
          value={`${totalProfit >= 0 ? '+' : ''}${totalProfit.toFixed(0)}€`}
          icon={totalProfit >= 0 ? TrendingUp : TrendingDown}
          color={totalProfit >= 0 ? 'green' : 'red'}
          sub={`Margen: ${margin}%`}
        />
        <KPICard label="Horas totales" value={formatHours(filtered.reduce((s, t) => s + (t.loggedTime || 0), 0))} icon={Euro} color="purple" sub="registradas en tareas" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-5 flex flex-wrap gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Servicio</label>
          <select value={filterService} onChange={e => setFilterService(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6] bg-gray-50">
            <option value="all">Todos los servicios</option>
            {services.map(s => <option key={s.id} value={s.id}>{s.icon} {s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Proyecto</label>
          <select value={filterProject} onChange={e => setFilterProject(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6] bg-gray-50">
            <option value="all">Todos los proyectos</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Task list */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h2 className="font-semibold text-gray-900 mb-4">Tareas · importe facturado</h2>

          {filtered.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No hay tareas con estos filtros.<br/>Marca tareas como completadas para añadir facturación.</p>
          )}

          <div className="space-y-2">
            {filtered.map(task => {
              const service = getService(task.serviceId)
              const project = getProject(task.projectId)
              const assignee = getUser(task.assignedTo)
              const cost = ((task.loggedTime || 0) / 3600) * hourlyRate
              const billed = billing[task.id] || 0
              const profit = billed - cost
              const isEditing = editingId === task.id

              return (
                <div key={task.id} className={`p-3 rounded-xl border transition-all ${
                  isEditing ? 'border-[#78dcc6] bg-[#e8faf7]' : 'border-gray-100 bg-gray-50 hover:border-gray-200'
                }`}>
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{task.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {service && <span className="text-xs" style={{ color: service.color }}>{service.icon} {service.name}</span>}
                        {project && <span className="text-xs text-gray-400">{project.name}</span>}
                        {task.loggedTime > 0 && (
                          <span className="text-xs text-gray-400">⏱ {formatHours(task.loggedTime)}</span>
                        )}
                        {assignee && (
                          <div className="flex items-center gap-1 ml-1">
                            <div className="w-4 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold"
                              style={{ backgroundColor: assignee.color }}>{assignee.name[0]}</div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Numbers */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {task.loggedTime > 0 && (
                        <div className="text-right hidden sm:block">
                          <p className="text-xs text-gray-400">Coste</p>
                          <p className="text-sm font-medium text-amber-600">{cost.toFixed(0)}€</p>
                        </div>
                      )}

                      {isEditing ? (
                        <div className="flex items-center gap-1.5">
                          <div className="relative">
                            <input autoFocus value={editValue}
                              onChange={e => setEditValue(e.target.value)}
                              onKeyDown={e => { if (e.key === 'Enter') confirmEdit(task.id); if (e.key === 'Escape') setEditingId(null) }}
                              placeholder="0"
                              className="w-24 border border-[#78dcc6] rounded-lg pl-3 pr-5 py-1.5 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#78dcc6] text-right" />
                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">€</span>
                          </div>
                          <button onClick={() => confirmEdit(task.id)}
                            className="p-1.5 bg-[#00263d] text-white rounded-lg hover:bg-[#003a5c] transition-colors">
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setEditingId(null)}
                            className="p-1.5 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="text-right">
                            <p className="text-xs text-gray-400">Facturado</p>
                            <p className={`text-sm font-bold ${billed > 0 ? 'text-[#00263d]' : 'text-gray-300'}`}>
                              {billed > 0 ? `${billed.toFixed(0)}€` : '—'}
                            </p>
                          </div>
                          {billed > 0 && (
                            <div className="text-right hidden sm:block">
                              <p className="text-xs text-gray-400">Beneficio</p>
                              <p className={`text-sm font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                {profit >= 0 ? '+' : ''}{profit.toFixed(0)}€
                              </p>
                            </div>
                          )}
                          <button onClick={() => startEdit(task)}
                            className="p-1.5 text-gray-400 hover:text-[#00263d] hover:bg-[#e8faf7] rounded-lg transition-colors">
                            {billed > 0 ? <Edit2 className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: By project summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Resumen por proyecto</h2>
            {byProject.length === 0 && <p className="text-xs text-gray-400">Sin datos</p>}
            <div className="space-y-4">
              {byProject.map(({ project, tasks: pTasks, billed, cost, profit }) => (
                <div key={project.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: project.color }} />
                    <p className="text-sm font-medium text-gray-900 truncate">{project.name}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div className="bg-[#e8faf7] rounded-lg p-2">
                      <p className="text-xs text-gray-500">Facturado</p>
                      <p className="text-sm font-bold text-[#00263d]">{billed.toFixed(0)}€</p>
                    </div>
                    <div className="bg-amber-50 rounded-lg p-2">
                      <p className="text-xs text-gray-500">Coste</p>
                      <p className="text-sm font-bold text-amber-600">{cost.toFixed(0)}€</p>
                    </div>
                    <div className={`rounded-lg p-2 ${profit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                      <p className="text-xs text-gray-500">Beneficio</p>
                      <p className={`text-sm font-bold ${profit >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                        {profit >= 0 ? '+' : ''}{profit.toFixed(0)}€
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* By service */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Facturado por servicio</h2>
            <div className="space-y-3">
              {services.map(service => {
                const sTasks = filtered.filter(t => t.serviceId === service.id)
                const billed = sTasks.reduce((s, t) => s + (billing[t.id] || 0), 0)
                if (billed === 0) return null
                const maxBilled = Math.max(...services.map(sv =>
                  filtered.filter(t => t.serviceId === sv.id).reduce((s, t) => s + (billing[t.id] || 0), 0)
                ), 1)
                return (
                  <div key={service.id}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-700">{service.icon} {service.name}</span>
                      <span className="text-xs font-bold text-gray-900">{billed.toFixed(0)}€</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full"
                        style={{ width: `${(billed / maxBilled) * 100}%`, backgroundColor: service.color }} />
                    </div>
                  </div>
                )
              })}
              {filtered.every(t => !billing[t.id]) && <p className="text-xs text-gray-400">Añade importes a las tareas para ver datos</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function KPICard({ label, value, icon: Icon, color, sub }) {
  const colors = {
    indigo: 'bg-[#e8faf7] text-[#00263d]',
    amber: 'bg-amber-50 text-amber-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    purple: 'bg-purple-50 text-purple-600',
  }
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${colors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  )
}
