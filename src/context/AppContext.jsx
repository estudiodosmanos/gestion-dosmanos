import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import {
  INITIAL_USERS, INITIAL_TASKS, INITIAL_PROJECTS, SERVICE_TYPES,
  loadFromStorage, saveToStorage
} from '../utils/data'

const AppContext = createContext(null)

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER': return { ...state, currentUser: action.payload }
    case 'LOGOUT': return { ...state, currentUser: null }

    case 'ADD_TASK': {
      const tasks = [...state.tasks, action.payload]
      saveToStorage('tasks', tasks)
      return { ...state, tasks }
    }
    case 'UPDATE_TASK': {
      const tasks = state.tasks.map(t => t.id === action.payload.id ? action.payload : t)
      saveToStorage('tasks', tasks)
      return { ...state, tasks }
    }
    case 'DELETE_TASK': {
      const tasks = state.tasks.filter(t => t.id !== action.payload)
      saveToStorage('tasks', tasks)
      return { ...state, tasks }
    }

    case 'ADD_PROJECT': {
      const projects = [...state.projects, action.payload]
      saveToStorage('projects', projects)
      return { ...state, projects }
    }
    case 'UPDATE_PROJECT': {
      const projects = state.projects.map(p => p.id === action.payload.id ? action.payload : p)
      saveToStorage('projects', projects)
      return { ...state, projects }
    }
    case 'DELETE_PROJECT': {
      const projects = state.projects.filter(p => p.id !== action.payload)
      saveToStorage('projects', projects)
      return { ...state, projects }
    }

    case 'ADD_TIME_ENTRY': {
      const entries = [...state.timeEntries, action.payload]
      saveToStorage('timeEntries', entries)
      // Update task loggedTime
      const tasks = state.tasks.map(t =>
        t.id === action.payload.taskId
          ? { ...t, loggedTime: (t.loggedTime || 0) + action.payload.duration }
          : t
      )
      saveToStorage('tasks', tasks)
      return { ...state, timeEntries: entries, tasks }
    }

    case 'ADD_USER': {
      const users = [...state.users, action.payload]
      saveToStorage('users', users)
      return { ...state, users }
    }
    case 'UPDATE_USER': {
      const users = state.users.map(u => u.id === action.payload.id ? action.payload : u)
      saveToStorage('users', users)
      const currentUser = state.currentUser?.id === action.payload.id ? action.payload : state.currentUser
      return { ...state, users, currentUser }
    }

    default: return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    currentUser: null,
    users: loadFromStorage('users', INITIAL_USERS),
    tasks: loadFromStorage('tasks', INITIAL_TASKS).map(t => ({
      ...t,
      assignedTo: Array.isArray(t.assignedTo) ? t.assignedTo : t.assignedTo ? [t.assignedTo] : []
    })),
    projects: loadFromStorage('projects', INITIAL_PROJECTS),
    timeEntries: loadFromStorage('timeEntries', []),
    services: SERVICE_TYPES,
  })

  const [activeTimer, setActiveTimer] = useState(
    loadFromStorage('activeTimer', null)
  )
  const [timerSeconds, setTimerSeconds] = useState(0)

  useEffect(() => {
    if (!activeTimer) return
    const start = activeTimer.startedAt
    const update = () => setTimerSeconds(Math.floor((Date.now() - start) / 1000))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [activeTimer])

  function startTimer(taskId) {
    const timer = { taskId, startedAt: Date.now() }
    setActiveTimer(timer)
    saveToStorage('activeTimer', timer)
  }

  function stopTimer() {
    if (!activeTimer) return
    const duration = Math.floor((Date.now() - activeTimer.startedAt) / 1000)
    dispatch({
      type: 'ADD_TIME_ENTRY',
      payload: {
        id: 'te_' + Date.now(),
        taskId: activeTimer.taskId,
        userId: state.currentUser?.id,
        duration,
        startedAt: activeTimer.startedAt,
        stoppedAt: Date.now(),
      }
    })
    setActiveTimer(null)
    setTimerSeconds(0)
    saveToStorage('activeTimer', null)
  }

  function login(email, password) {
    const user = state.users.find(u => u.email === email && u.password === password)
    if (user) { dispatch({ type: 'SET_USER', payload: user }); return true }
    return false
  }

  return (
    <AppContext.Provider value={{ state, dispatch, login, activeTimer, timerSeconds, startTimer, stopTimer }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
