import { useApplications } from './features/hooks/useApplications'
import AddJobModal from './features/job-tracker/AddJobModal'
import DeleteConfirmModal from './features/job-tracker/DeleteConfirmModal'
import JobAppsSection from './features/job-tracker/JobAppsSection'
import StatsOverview from './features/job-tracker/StatsOverview'

export default function MainSection() {
  const { data } = useApplications()

  return (
    <main className='max-w-7xl mx-auto p-6'>
      <StatsOverview data={data} />
      <JobAppsSection data={data} />
      <AddJobModal />
      <DeleteConfirmModal />
    </main>
  )
}
