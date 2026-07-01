import './App.css'
import { Sidebar } from './components/layout/Sidebar'
import { HomePage } from './features/dashboard/HomePage'

function App() {
  return (
    <main className="nexus-shell">
      <Sidebar />
      <HomePage />
    </main>
  )
}

export default App
