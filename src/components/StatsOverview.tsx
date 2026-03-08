import { Briefcase, CheckCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

import type { JobApplication } from '../types/JobApplication'

interface StatsOverviewProps {
  data?: JobApplication[]
}

export default function StatsOverview({ data }: StatsOverviewProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
      {[
        {
          label: 'Total Apps',
          val: data?.length || 0,
          icon: Briefcase,
          color: 'text-blue-500',
        },
        {
          label: 'Interviews',
          val: data?.filter((d) => d.status === 'Interviewing').length || 0,
          icon: Clock,
          color: 'text-amber-500',
        },
        {
          label: 'Offers',
          val: data?.filter((d) => d.status === 'Offer').length || 0,
          icon: CheckCircle,
          color: 'text-emerald-500',
        },
      ].map((stat, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          key={stat.label}
          className='p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800'
        >
          <div className='flex justify-between items-center'>
            <div>
              <p className='text-slate-500 dark:text-slate-400 text-sm font-medium'>
                {stat.label}
              </p>
              <h3 className='text-3xl font-bold mt-1'>{stat.val}</h3>
            </div>
            <stat.icon size={32} className={stat.color} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
