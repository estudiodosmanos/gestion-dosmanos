import { LayoutDashboard, CheckSquare, Clock, BarChart2, FolderOpen, Users, LogOut, Timer, Euro } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatTime } from '../utils/data'
import Logo from '../assets/logo.svg?react'

const NAV = [
  { id: 'dashboard', label: 'Dashboard',    icon: LayoutDashboard },
  { id: 'tasks',     label: 'Tareas',        icon: CheckSquare },
  { id: 'projects',  label: 'Proyectos',     icon: FolderOpen },
  { id: 'time',      label: 'Tiempos',       icon: Clock },
  { id: 'services',  label: 'Por Servicio',  icon: BarChart2 },
]

export default function Sidebar({ page, setPage }) {
  const { state, dispatch, activeTimer, timerSeconds, stopTimer } = useApp()
  const { currentUser, tasks } = state

  const activeTask = activeTimer ? tasks.find(t => t.id === activeTimer.taskId) : null

  return (
    <aside className="w-60 flex flex-col h-screen sticky top-0 border-r border-white/10"
      style={{ backgroundColor: 'var(--brand-navy)' }}>

      {/* Logo */}
      <div className="p-5 pb-4 border-b border-white/10">
        <Logo className="w-full max-w-[180px] [&_.cls-2]:fill-white/70" />
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setPage(id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
            style={page === id
              ? { backgroundColor: 'var(--brand-teal)', color: 'var(--brand-navy)' }
              : { color: 'rgba(255,255,255,0.55)' }}
            onMouseEnter={e => { if (page !== id) e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { if (page !== id) e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}>
            <Icon className="w-4 h-4 flex-shrink-0" />
            {label}
          </button>
        ))}

        {/* Separador admin */}
        {currentUser?.role === 'admin' && (
          <>
            <div className="my-2 border-t border-white/10" />
            <button onClick={() => setPage('billing')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={page === 'billing'
                ? { backgroundColor: 'var(--brand-teal)', color: 'var(--brand-navy)' }
                : { color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={e => { if (page !== 'billing') e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { if (page !== 'billing') e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}>
              <Euro className="w-4 h-4 flex-shrink-0" />
              Facturación
            </button>
            <button onClick={() => setPage('admin')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={page === 'admin'
                ? { backgroundColor: 'var(--brand-teal)', color: 'var(--brand-navy)' }
                : { color: 'rgba(255,255,255,0.55)' }}
              onMouseEnter={e => { if (page !== 'admin') e.currentTarget.style.color = 'white' }}
              onMouseLeave={e => { if (page !== 'admin') e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}>
              <Users className="w-4 h-4 flex-shrink-0" />
              Equipo
            </button>
          </>
        )}
      </nav>

      {/* Timer activo */}
      {activeTimer && activeTask && (
        <div className="mx-3 mb-3 rounded-xl p-3 border"
          style={{ backgroundColor: 'rgba(120,220,198,0.12)', borderColor: 'rgba(120,220,198,0.35)' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Timer className="w-3 h-3 animate-pulse" style={{ color: 'var(--brand-teal)' }} />
            <span className="text-xs font-semibold" style={{ color: 'var(--brand-teal)' }}>Fichando</span>
          </div>
          <p className="text-xs text-white font-medium truncate">{activeTask.title}</p>
          <p className="text-lg font-mono font-bold mt-0.5" style={{ color: 'var(--brand-teal)' }}>
            {formatTime(timerSeconds)}
          </p>
          <button onClick={stopTimer}
            className="w-full mt-2 text-xs font-semibold py-1.5 rounded-lg transition-all hover:opacity-80"
            style={{ backgroundColor: '#ef4444', color: 'white' }}>
            Parar
          </button>
        </div>
      )}

      {/* User */}
      <div className="p-3 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl mb-1">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: currentUser?.color }}>
            {currentUser?.name?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{currentUser?.name}</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {currentUser?.role === 'admin' ? 'Administrador' : 'Miembro'}
            </p>
          </div>
        </div>
        <button onClick={() => dispatch({ type: 'LOGOUT' })}
          className="w-full flex items-center justify-center gap-2 text-xs py-2 rounded-xl transition-all hover:bg-white/10"
          style={{ color: 'rgba(255,255,255,0.4)' }}>
          <LogOut className="w-3.5 h-3.5" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}
