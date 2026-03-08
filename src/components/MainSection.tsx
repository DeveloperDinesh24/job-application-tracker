import { useApplications } from '../hooks/useApplications'
import AddJobModal from './features/AddJobModal'
import DeleteConfirmModal from './features/DeleteConfirmModal'
import JobAppsSection from './JobAppsSection'
import StatsOverview from './StatsOverview'

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
