export interface JobApplication {
  id: number
  created_at: string
  company: string
  role: string
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'
  salary?: number
  notes?: string
}
