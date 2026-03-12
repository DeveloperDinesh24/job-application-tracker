import { Briefcase, CheckCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

import type { JobApp } from '../types/job.types'

interface StatsOverviewProps {
  data?: JobApp[]
}

export default function StatsOverview({ data }: StatsOverviewProps) {
  const stats = [
    {
      label: 'Total Apps',
      val: data?.length || 0,
      icon: Briefcase,
      color: 'text-blue-500 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      label: 'Interviews',
      val: data?.filter((d) => d.status === 'Interviewing').length || 0,
      icon: Clock,
      color: 'text-amber-500 dark:text-amber-400',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    },
    {
      label: 'Offers',
      val: data?.filter((d) => d.status === 'Offer').length || 0,
      icon: CheckCircle,
      color: 'text-emerald-500 dark:text-emerald-400',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
  ]

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
      {stats.map((stat, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          key={stat.label}
          className='p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800'
        >
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-slate-500 dark:text-slate-400 text-sm font-semibold uppercase tracking-tight'>
                {stat.label}
              </p>
              <h3 className='text-3xl font-extrabold mt-1 text-slate-900 dark:text-white'>
                {stat.val}
              </h3>
            </div>

            {/* Added a subtle background ring around the icon for better visual weight */}
            <div className={`p-3 rounded-2xl ${stat.bgColor}`}>
              <stat.icon size={28} className={stat.color} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
