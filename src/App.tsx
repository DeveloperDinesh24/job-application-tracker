import './App.css'
import { useApplications } from './hooks/useApplications'

function App() {
  const { data, isLoading, error } = useApplications()

  if (isLoading) return <div className='p-10'>Loading your dream jobs...</div>
  if (error)
    return <div className='p-10 text-red-500'>Error: {error.message}</div>

  return (
    <div className='p-10'>
      <h1 className='text-3xl font-bold mb-6'>Job Tracker 🚀</h1>
      <div className='grid gap-4'>
        {data?.map((app) => (
          <div
            key={app.id}
            className='p-4 border rounded-lg shadow-sm bg-white'
          >
            <h2 className='text-xl font-semibold'>{app.company}</h2>
            <p className='text-gray-600'>{app.role}</p>
            <span className='mt-2 inline-block px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded'>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
