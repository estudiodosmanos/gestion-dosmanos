import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Lock, Mail } from 'lucide-react'
import Logo from '../assets/logo.svg?react'

export default function Login() {
  const { login } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!login(email, password)) setError('Email o contraseña incorrectos')
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel – brand */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12"
        style={{ backgroundColor: 'var(--brand-navy)' }}>
        <Logo className="w-56 [&_.cls-2]:fill-white/70" />
        <div />
        <p className="text-white/25 text-sm">© {new Date().getFullYear()} Estudio Dos Manos</p>
      </div>

      {/* Right panel – form */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-sm">
          {/* Logo mobile */}
          <div className="lg:hidden mb-8">
            <Logo className="w-40 mx-auto" />
          </div>

          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--brand-navy)' }}>
            Acceder
          </h1>
          <p className="text-gray-500 text-sm mb-8">Introduce tus credenciales para entrar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email" value={email}
                  onChange={e => { setEmail(e.target.value); setError('') }}
                  placeholder="tu@estudiodosmanos.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl outline-none text-sm transition-all"
                  style={{ '--tw-ring-color': 'var(--brand-teal)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--brand-teal)'}
                  onBlur={e => e.target.style.borderColor = ''}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="password" value={password}
                  onChange={e => { setPassword(e.target.value); setError('') }}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl outline-none text-sm"
                  onFocus={e => e.target.style.borderColor = 'var(--brand-teal)'}
                  onBlur={e => e.target.style.borderColor = ''}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button type="submit"
              className="w-full font-semibold py-2.5 rounded-xl text-sm transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ backgroundColor: 'var(--brand-navy)', color: 'white' }}>
              Entrar
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center mb-3">Cuentas de acceso rápido</p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { email: 'hola@estudiodosmanos.com',          name: 'Admin',    role: 'Admin' },
                { email: 'meseguer.blanca@gmail.com',         name: 'Blanca',   role: 'Miembro' },
                { email: 'virginia.illu@gmail.com',           name: 'Virginia', role: 'Miembro' },
                { email: 'marketing@estudiodosmanos.com',     name: 'Andrea',   role: 'Miembro' },
                { email: 'clientesestudiodosmanos@gmail.com', name: 'Nacho',    role: 'Miembro' },
              ].map(u => (
                <button key={u.email}
                  onClick={() => { setEmail(u.email); setPassword('') }}
                  className="text-left p-2 rounded-xl border border-gray-200 hover:border-[#78dcc6] hover:bg-[#e8faf7] transition-all">
                  <p className="text-xs font-semibold text-gray-700">{u.name}</p>
                  <p className="text-xs text-gray-400">{u.role}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
