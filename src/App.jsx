import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Projects from './pages/Projects'
import TimeTracking from './pages/TimeTracking'
import Services from './pages/Services'
import Admin from './pages/Admin'
import Billing from './pages/Billing'

function AppInner() {
  const { state } = useApp()
  const [page, setPage] = useState('dashboard')

  if (!state.currentUser) return <Login />

  const pages = { dashboard: Dashboard, tasks: Tasks, projects: Projects, time: TimeTracking, services: Services, billing: Billing, admin: Admin }
  const Page = pages[page] || Dashboard

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar page={page} setPage={setPage} />
      <main className="flex-1 overflow-auto">
        <Page />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  )
}
