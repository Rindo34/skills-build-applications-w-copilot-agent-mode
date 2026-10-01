import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const navigation = [
    { label: 'Panoramica', path: '/users' },
    { label: 'Attività', path: '/activities' },
    { label: 'Classifica', path: '/leaderboard' },
    { label: 'Squadre', path: '/teams' },
    { label: 'Allenamenti', path: '/workouts' },
  ]

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="container-fluid app-container">
          <NavLink className="brand" to="/users" aria-label="OctoFit, panoramica">
            <span className="brand-mark" aria-hidden="true">O</span>
            <span>OctoFit</span>
          </NavLink>
          <nav className="app-nav" aria-label="Navigazione principale">
            {navigation.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container-fluid app-container app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
