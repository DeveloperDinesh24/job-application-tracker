import './App.css'
import { useEffect } from 'react'
import api from './api/axios'

function App() {
  useEffect(() => {
    const testConnection = async () => {
      try {
        // IMPORTANT: Replace 'applications' with your actual table name
        const response = await api.get('/applications?select=*')
        console.log('🚀 Connection Success! Data:', response.data)
      } catch (error) {
        console.error('❌ Connection Failed:', error)
      }
    }

    testConnection()
  }, [])

  return (
    <div className='p-10'>
      <h1 className='text-2xl font-bold'>Supabase Connection Test</h1>
      <p>Check the browser console (F12) to see your data!</p>
    </div>
  )
}

export default App
