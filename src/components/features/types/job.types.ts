export interface JobApplication {
  id: number
  created_at: string
  company: string
  role: string
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'
  salary?: number
  notes?: string
}

export interface JobApplicationData {
  company: string
  role: string
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'
  salary: number
  location?: string
  notes?: string
  created_at?: string
}
