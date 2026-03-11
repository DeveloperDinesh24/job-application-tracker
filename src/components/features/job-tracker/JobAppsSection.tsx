import type { JobApp } from '../types/job.types'
import JobAppCard from './JobAppCard'

interface JobAppProps {
  data?: JobApp[]
}

export default function JobAppsSection({ data }: JobAppProps) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'>
      <JobAppCard data={data} />
    </div>
  )
}
