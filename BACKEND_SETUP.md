# Notework Backend Setup Guide

This guide walks you through setting up a real backend for Notework using Supabase.

## 🎯 Overview

The frontend is ready to connect to a backend. This guide covers:
1. Setting up Supabase (PostgreSQL + Auth)
2. Creating database tables
3. Setting up Row-Level Security (RLS)
4. Connecting the frontend to the backend

## 🚀 Step 1: Set Up Supabase

### 1.1 Create a Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up with email or GitHub
3. Create a new project

### 1.2 Get Your Credentials
In your Supabase project:
1. Go to **Settings** → **API**
2. Copy your:
   - Project URL
   - Anon Key
   - Service Role Key (keep secret!)

## 🗄️ Step 2: Create Database Tables

### 2.1 Create `users` Table
In Supabase SQL Editor, run:

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create users table (extends auth.users)
create table public.users (
  id uuid references auth.users(id) on delete cascade not null primary key,
  email text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- RLS Policy: Users can view their own data
create policy "Users can view own user data" 
  on public.users for select 
  using (auth.uid() = id);

-- RLS Policy: Users can update their own data
create policy "Users can update own user data" 
  on public.users for update 
  using (auth.uid() = id);
```

### 2.2 Create `job_applications` Table
```sql
create table public.job_applications (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid not null references public.users(id) on delete cascade,
  company text not null,
  position text not null,
  status text not null check (status in ('applied', 'interview', 'offer', 'rejected')),
  applied_date date not null,
  notes text,
  salary_range text,
  job_link text,
  contact_email text,
  contact_name text,
  interview_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index on user_id for faster queries
create index idx_job_applications_user_id 
  on public.job_applications(user_id);

-- Enable RLS
alter table public.job_applications enable row level security;

-- RLS Policy: Users can view only their own applications
create policy "Users can view own applications" 
  on public.job_applications for select 
  using (auth.uid() = user_id);

-- RLS Policy: Users can insert their own applications
create policy "Users can insert own applications" 
  on public.job_applications for insert 
  with check (auth.uid() = user_id);

-- RLS Policy: Users can update their own applications
create policy "Users can update own applications" 
  on public.job_applications for update 
  using (auth.uid() = user_id);

-- RLS Policy: Users can delete their own applications
create policy "Users can delete own applications" 
  on public.job_applications for delete 
  using (auth.uid() = user_id);
```

## 🔐 Step 3: Set Up Authentication

### 3.1 Configure Email Auth
1. Go to **Auth** → **Providers**
2. Make sure **Email** is enabled
3. Go to **Auth** → **URL Configuration**
4. Add your app URLs:
   - Site URL: `http://localhost:5175` (development)
   - Redirect URLs: `http://localhost:5175/auth/callback`

### 3.2 Enable Email Confirmations (Optional)
1. Go to **Auth** → **Email Templates**
2. Customize confirmation emails if desired

## 🔌 Step 4: Connect Frontend to Backend

### 4.1 Install Supabase Client
```bash
npm install @supabase/supabase-js
```

### 4.2 Update Environment Variables
Create `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4.3 Create Supabase Service
Create `src/services/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getApplications(userId: string) {
  const { data, error } = await supabase
    .from('job_applications')
    .select('*')
    .eq('user_id', userId)
    .order('applied_date', { ascending: false })
  return { data, error }
}

export async function createApplication(application: any) {
  const { data, error } = await supabase
    .from('job_applications')
    .insert([application])
    .select()
  return { data, error }
}

export async function updateApplication(id: string, updates: any) {
  const { data, error } = await supabase
    .from('job_applications')
    .update(updates)
    .eq('id', id)
    .select()
  return { data, error }
}

export async function deleteApplication(id: string) {
  const { error } = await supabase
    .from('job_applications')
    .delete()
    .eq('id', id)
  return { error }
}
```

### 4.4 Update AuthContext
Connect the AuthContext to Supabase authentication:

```typescript
import { signUp, signIn, signOut } from '../services/supabase'

// In AuthContext...
const login = async (email: string, password: string) => {
  setIsLoading(true)
  try {
    const { data, error } = await signIn(email, password)
    if (error) throw error
    setUser({ id: data.user.id, email: data.user.email || '' })
  } finally {
    setIsLoading(false)
  }
}

const signup = async (email: string, password: string) => {
  setIsLoading(true)
  try {
    const { data, error } = await signUp(email, password)
    if (error) throw error
    setUser({ id: data.user.id, email: data.user.email || '' })
  } finally {
    setIsLoading(false)
  }
}

const logout = async () => {
  await signOut()
  setUser(null)
}
```

### 4.5 Update KanbanContext
Load applications from database:

```typescript
import { useEffect } from 'react'
import { getApplications } from '../services/supabase'
import { useAuth } from './AuthContext'

// In KanbanProvider...
useEffect(() => {
  if (user) {
    const loadApplications = async () => {
      const { data, error } = await getApplications(user.id)
      if (error) console.error(error)
      else setApplications(data || [])
    }
    loadApplications()
  }
}, [user])
```

## 📊 Step 5: Create Analytics View (Optional)

For better performance with analytics queries, create a view:

```sql
create view public.application_stats as
select
  user_id,
  status,
  count(*) as count,
  count(*) filter (where interview_date is not null) as with_interview
from public.job_applications
group by user_id, status;

-- Grant access
grant select on public.application_stats to anon;
grant select on public.application_stats to authenticated;
```

## 🧪 Testing

### 1. Test Sign Up
```bash
npm run dev
```

1. Open the app
2. You should see a login page
3. Sign up with a test email
4. Check your email for confirmation link (in Supabase, sign-ups are auto-confirmed in dev mode)

### 2. Test Data Operations
1. Add a new application
2. Verify it appears in the Kanban board
3. Edit and delete to test updates

### 3. Check Supabase Console
Go to your Supabase project:
1. Check the `job_applications` table
2. Verify data is being saved
3. Check logs for any errors

## 🔒 Security Best Practices

### Frontend
- ✅ Never commit `.env.local`
- ✅ Always validate user input
- ✅ Use HTTPS in production
- ✅ Store auth tokens securely (Supabase handles this)

### Backend
- ✅ Row-Level Security is enabled
- ✅ Use service role key only on server
- ✅ Never expose service role key in frontend
- ✅ Validate all inputs on backend

### Database
- ✅ Foreign keys enforce data integrity
- ✅ Indexes improve query performance
- ✅ Check constraints validate data types

## 🚀 Production Deployment

### 1. Update URLs
In `.env.production`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 2. Update Supabase URLs
In Supabase **Auth** → **URL Configuration**:
- Site URL: `https://your-domain.com`
- Redirect URLs: `https://your-domain.com/auth/callback`

### 3. Enable Additional Security
- Enable 2FA
- Set up SMTP for email
- Configure banned passwords
- Set session duration

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Auth](https://supabase.com/docs/guides/auth)

## 🆘 Troubleshooting

### RLS Policy Errors
Make sure you're:
- Calling with authenticated user
- User ID matches the policy
- Policy is created correctly

### Connection Errors
- Check environment variables
- Verify Supabase project is running
- Check CORS settings

### Auth Issues
- Clear browser localStorage
- Check email confirmation status
- Verify auth provider configuration

---

Your Notework backend is now ready! 🎉
