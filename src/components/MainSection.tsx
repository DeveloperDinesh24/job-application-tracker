import { useApplications } from './features/hooks/useJobs'
import AddJobModal from './features/job-tracker/AddJobModal'
import DeleteConfirmModal from './features/job-tracker/DeleteConfirmModal'
import JobAppsSection from './features/job-tracker/JobAppsSection'
import StatsOverview from './features/job-tracker/StatsOverview'

export default function MainSection() {
  const { data } = useApplications()

  return (
    // Removed max-w-7xl here because it's now handled in DashboardUI.tsx
    // Keep 'p-6' or 'py-6' for spacing between elements
    <section className='py-6'>
      <StatsOverview data={data} />
      <JobAppsSection data={data} />

      {/* Modals are portaled or absolute, so their placement here is fine */}
      <AddJobModal />
      <DeleteConfirmModal />
    </section>
  )
}
