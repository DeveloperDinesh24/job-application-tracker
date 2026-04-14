import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, GitFork, Globe, Lock, Mail } from 'lucide-react'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleAuth = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (isLogin) {
        // LOGIN LOGIC
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
      } else {
        // SIGNUP LOGIC
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        alert('Check your email for the confirmation link!')
      }

      // If successful, the onAuthStateChange in App.tsx will
      // update the store, and we can move to dashboard
      navigate('/dashboard')
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      })
      if (error) throw error
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Social login failed')
    }
  }

  return (
    <div className='min-h-screen bg-black flex flex-col justify-center items-center px-6 selection:bg-indigo-500/30'>
      {/* Background Decor */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-600/10 blur-[120px] rounded-full' />
      </div>

      <div className='relative z-10 w-full max-w-md'>
        {/* Logo / Header */}
        <div className='text-center mb-10'>
          <h2 className='text-3xl font-bold text-white tracking-tighter'>
            {isLogin ? 'Welcome Back' : 'Join the Pipeline'}
          </h2>
          <p className='text-slate-400 mt-2'>
            {isLogin
              ? 'Enter your credentials to access DevTrack'
              : 'Start tracking your career growth today'}
          </p>
        </div>

        {/* Auth Card */}
        <div className='bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl'>
          <form className='space-y-5' onSubmit={handleAuth}>
            <div>
              <label className='block text-sm font-medium text-slate-300 mb-2'>
                Email Address
              </label>
              <div className='relative group'>
                <Mail className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500' />
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='w-full bg-black/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-slate-300 mb-2'>
                Password
              </label>
              <div className='relative group'>
                <Lock className='absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500' />
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='w-full bg-black/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-white focus:ring-2 focus:ring-indigo-500/50 outline-none'
                />
              </div>
            </div>

            <button
              disabled={isSubmitting}
              className='w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer'
            >
              {isSubmitting
                ? 'Processing...'
                : isLogin
                  ? 'Sign In'
                  : 'Create Account'}
              <ArrowRight className='w-4 h-4' />
            </button>
          </form>

          {/* Divider */}
          <div className='relative my-8'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-slate-800'></div>
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-slate-900/0 px-2 text-slate-500 backdrop-blur-sm'>
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Logins */}
          <div className='grid grid-cols-2 gap-4'>
            <button
              onClick={() => handleSocialLogin('google')}
              className='flex items-center justify-center gap-2 bg-black/40 border border-slate-800 hover:bg-slate-800 py-2.5 rounded-xl text-sm font-medium text-slate-300 transition-all cursor-pointer'
            >
              <Globe className='w-4 h-4' /> Google
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              className='flex items-center justify-center gap-2 bg-black/40 border border-slate-800 hover:bg-slate-800 py-2.5 rounded-xl text-sm font-medium text-slate-300 transition-all cursor-pointer'
            >
              <GitFork className='w-4 h-4' /> Github
            </button>
          </div>
        </div>

        {/* Toggle link */}
        <p className='text-center mt-8 text-slate-500 text-sm'>
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className='text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-4 transition-colors cursor-pointer'
          >
            {isLogin ? 'Sign up for free' : 'Log in here'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
