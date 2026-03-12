import { supabase } from '../../../lib/supabase'
import type { JobApp, JobAppData } from '../types/job.types'

export const jobApi = {
  getAll: async () => {
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  create: async ({ data, userId }: { data: JobAppData; userId: string }) => {
    const { error } = await supabase
      .from('applications')
      .insert([{ ...data, user_id: userId }])
    if (error) throw error
  },

  update: async (id: number, payload: Partial<JobApp>) => {
    const { error } = await supabase
      .from('applications')
      .update(payload)
      .eq('id', id)
    if (error) throw error
  },

  delete: async (id: number) => {
    const { error } = await supabase.from('applications').delete().eq('id', id)
    if (error) throw error
  },
}
