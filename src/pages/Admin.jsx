import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { Plus, Edit2 } from 'lucide-react'

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316']

export default function Admin() {
  const { state, dispatch } = useApp()
  const { users, tasks } = state
  const [showForm, setShowForm] = useState(false)
  const [editUser, setEditUser] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member', color: '#6366f1' })

  function openNew() {
    setForm({ name: '', email: '', password: '', role: 'member', color: '#6366f1' })
    setEditUser(null); setShowForm(true)
  }
  function openEdit(u) {
    setForm({ name: u.name, email: u.email, password: u.password, role: u.role, color: u.color })
    setEditUser(u); setShowForm(true)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) return
    if (editUser) {
      dispatch({ type: 'UPDATE_USER', payload: { ...editUser, ...form } })
    } else {
      dispatch({ type: 'ADD_USER', payload: { ...form, id: 'u_' + Date.now() } })
    }
    setShowForm(false)
  }

  const members = users.filter(u => u.role !== 'admin')

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gestión del equipo</h1>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-[#00263d] hover:bg-[#003a5c] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          Añadir persona
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-2xl border border-[#b8f0e6] shadow-sm p-5 mb-5">
          <h3 className="font-semibold text-gray-900 mb-4">{editUser ? 'Editar usuario' : 'Nuevo usuario'}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nombre</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Nombre completo"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="email@estudio.com"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Contraseña</label>
              <input type="text" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                placeholder="Contraseña"
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Rol</label>
              <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#78dcc6]">
                <option value="member">Miembro</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-gray-600 mb-2">Color de avatar</label>
              <div className="flex gap-2">
                {COLORS.map(c => (
                  <button type="button" key={c} onClick={() => setForm(f => ({ ...f, color: c }))}
                    className={`w-7 h-7 rounded-full transition-all ${form.color === c ? 'ring-2 ring-offset-2 ring-gray-600 scale-110' : ''}`}
                    style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
            <div className="col-span-2 flex justify-end gap-2">
              <button type="button" onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">Cancelar</button>
              <button type="submit"
                className="px-4 py-2 text-sm font-semibold bg-[#00263d] hover:bg-[#003a5c] text-white rounded-xl">
                {editUser ? 'Guardar' : 'Crear'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map(user => {
          const userTasks = tasks.filter(t => Array.isArray(t.assignedTo) ? t.assignedTo.includes(user.id) : t.assignedTo === user.id)
          const active = userTasks.filter(t => t.status !== 'done').length
          const done = userTasks.filter(t => t.status === 'done').length
          return (
            <div key={user.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: user.color }}>
                  {user.name[0]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${
                    user.role === 'admin' ? 'bg-indigo-100 text-[#00263d]' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {user.role === 'admin' ? 'Admin' : 'Miembro'}
                  </span>
                </div>
                <button onClick={() => openEdit(user)}
                  className="p-2 text-gray-400 hover:text-[#00263d] hover:bg-[#e8faf7] rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-gray-100">
                <div>
                  <p className="text-lg font-bold text-gray-900">{userTasks.length}</p>
                  <p className="text-xs text-gray-400">Total</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-[#00263d]">{active}</p>
                  <p className="text-xs text-gray-400">Activas</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-green-600">{done}</p>
                  <p className="text-xs text-gray-400">Completadas</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
