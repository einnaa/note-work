export type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected';

export interface JobApplication {
  id: string;
  user_id: string;
  company: string;
  position: string;
  status: JobStatus;
  applied_date: string;
  notes: string;
  salary_range?: string;
  job_link?: string;
  contact_email?: string;
  contact_name?: string;
  interview_date?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface TimelineData {
  date: string;
  applied: number;
  interview: number;
  offer: number;
  rejected: number;
}

export interface AnalyticsData {
  totalApplications: number;
  byStatus: Record<JobStatus, number>;
  successRate: number;
  avgTimeToOffer?: number;
}
