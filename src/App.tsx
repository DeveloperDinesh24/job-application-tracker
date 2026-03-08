import './App.css'
import Navbar from './components/Navbar'
import { useApplications } from './hooks/useApplications'

function App() {
  const { data, isLoading, error } = useApplications()

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500'>
      <Navbar />
    </div>
  )
}

export default App
