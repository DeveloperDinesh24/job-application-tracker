export interface JobApp {
  id: number
  created_at: string
  company: string
  role: string
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'
  location?: string
  salary?: number
  notes?: string
}

export interface JobAppData {
  company: string
  role: string
  status: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'
  salary: number
  location?: string
  notes?: string
  created_at?: string
}

export interface JobAppUpdateData {
  company?: string
  role?: string
  status?: 'Applied' | 'Interviewing' | 'Offer' | 'Rejected'
  salary?: number
  location?: string
  notes?: string
}
