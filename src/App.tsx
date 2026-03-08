import './App.css'
import MainSection from './components/MainSection'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500'>
      <Navbar />
      <MainSection />
    </div>
  )
}

export default App
