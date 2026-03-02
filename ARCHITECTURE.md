# Notework Architecture & Design Document

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Notework App                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │         React Components Layer                   │  │
│  │  ┌──────────┬──────────┬──────────┬──────────┐  │  │
│  │  │ Header   │ Kanban   │ Timeline │ Modal    │  │  │
│  │  │          │ Board    │ View     │ Forms    │  │  │
│  │  └──────────┴──────────┴──────────┴──────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                         ▲                               │
│                         │                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │      State Management Layer (Context)            │  │
│  │  ┌─────────────────┬──────────────────────────┐ │  │
│  │  │ KanbanContext   │ AuthContext             │ │  │
│  │  │ - applications  │ - user                  │ │  │
│  │  │ - CRUD ops      │ - login/signup/logout  │ │  │
│  │  └─────────────────┴──────────────────────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
│                         ▲                               │
│                         │                               │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Services Layer (API)                    │  │
│  │  ┌──────────────────────────────────────────┐  │  │
│  │  │ api.ts - Fetch-based HTTP calls          │  │  │
│  │  │ supabase.ts - Supabase integration       │  │  │
│  │  └──────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                         ▲                               │
│                         │ HTTP/JSON                     │
└─────────────────────────┼───────────────────────────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
         ┌────▼──────┐        ┌──────▼────┐
         │ Supabase  │        │  Custom   │
         │ PostgreSQL│        │ Backend   │
         └───────────┘        └───────────┘
```

## 🏗️ Component Hierarchy

```
App
├── AuthProvider
│   └── AppContent
│       ├── Header
│       │   ├── Search Bar
│       │   ├── Nav Buttons
│       │   └── User Menu
│       ├── KanbanBoard (or TimelineView)
│       │   └── Column[]
│       │       └── ApplicationCard[]
│       └── ApplicationModal
│           ├── Form Fields
│           └── Buttons
└── KanbanProvider (context)
```

## 📊 Data Flow

### Creating an Application
```
User Input (Modal) 
    ↓
handleSaveApplication 
    ↓
addApplication() 
    ↓
KanbanContext.setApplications() 
    ↓
UI Re-renders
    ↓
API Call (if backend connected)
```

### Drag & Drop Flow
```
User Drags Card
    ↓
handleDragStart() - Stores app ID
    ↓
handleDrop() - Calls moveApplication()
    ↓
KanbanContext.updateApplication()
    ↓
UI Re-renders with new status
    ↓
API Call (if backend connected)
```

### Authentication Flow
```
User Submits Login Form
    ↓
login() in AuthContext
    ↓
API Call to /auth/login
    ↓
Store Token in localStorage
    ↓
setUser() 
    ↓
Auto-load Applications
    ↓
Redirect to Board
```

## 🎯 TypeScript Types

### Core Types
```typescript
// Job Application Status
type JobStatus = 'applied' | 'interview' | 'offer' | 'rejected'

// Main application object
interface JobApplication {
  id: string
  user_id: string
  company: string
  position: string
  status: JobStatus
  applied_date: string
  notes: string
  salary_range?: string
  job_link?: string
  contact_email?: string
  contact_name?: string
  interview_date?: string
  created_at: string
  updated_at: string
}

// User object
interface User {
  id: string
  email: string
  created_at: string
}

// Analytics data
interface AnalyticsData {
  totalApplications: number
  byStatus: Record<JobStatus, number>
  successRate: number
}
```

## 🎨 Styling Architecture

### Tailwind CSS Organization
- **Colors**: Custom palette in `tailwind.config.js`
- **Typography**: System font stack
- **Spacing**: 4px-based scale
- **Animations**: Custom keyframes for micro-interactions
- **Responsive**: Mobile-first breakpoints

### Component Styling Patterns
```tsx
// Utility-first approach
<div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all">

// Conditional classes
className={`px-4 py-2 ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}

// Complex states
className={`
  bg-white border rounded-lg
  hover:shadow-md transition-all
  ${isDragging ? 'opacity-50' : ''}
  ${isSelected ? 'ring-2 ring-blue-500' : ''}
`}
```

## 🔐 Security Model

### Authentication
- Supabase Auth handles password hashing and JWT tokens
- Tokens stored in `localStorage` (Supabase client manages)
- All API calls include Authorization header

### Authorization
- Row-Level Security (RLS) at database level
- User ID validated on every API call
- Users can only see/modify their own data

### Data Protection
- Input validation on form submission
- SQL injection prevented by parameterized queries
- XSS prevention through React's automatic escaping

## ⚡ Performance Considerations

### Optimization Strategies
1. **React.memo** - Prevent unnecessary re-renders
2. **useCallback** - Memoize event handlers
3. **Code Splitting** - Lazy load components (future)
4. **Pagination** - Load applications in batches (future)
5. **Caching** - TanStack Query manages server state (ready)

### Bundle Size
- Tree-shaking removes unused code
- Tailwind CSS purges unused styles
- Icons from lucide-react (very lightweight)

### Runtime Performance
- Native HTML5 drag-and-drop (fast)
- Recharts optimized for responsive rendering
- Context API for local state (no over-engineering)

## 🧪 Testing Strategy

### Unit Tests (Ready to Implement)
- Component props and state
- Utility functions
- Service methods

### Integration Tests (Ready to Implement)
- Context provider behavior
- API integration
- Form submissions

### E2E Tests (Ready to Implement)
- User workflows
- Drag and drop
- Navigation flows

## 🚀 Deployment Architecture

### Frontend Deployment
```
Source Code
    ↓
npm run build
    ↓
dist/ folder
    ↓
CDN (Vercel, Netlify, etc.)
    ↓
Static HTML/JS/CSS served
```

### Backend Deployment
- Supabase handles PostgreSQL hosting
- Row-Level Security enforces access control
- Real-time subscriptions available

### Environment Configuration
```
Development  → localhost:5175 → localhost:3000 API
Staging      → staging domain → staging API
Production   → domain.com → production API
```

## 📈 Scalability

### Current Limits
- Handles 1000s of applications per user
- Real-time sync not yet implemented
- No pagination (load all applications)

### Scaling Options
1. **Pagination** - Load applications in batches
2. **Virtual Scrolling** - Render only visible items
3. **Real-time Sync** - Supabase realtime subscriptions
4. **Database Indexing** - On user_id, status, created_at
5. **Caching** - TanStack Query caching

## 🔄 Extension Points

### Adding New Features
1. **Status Columns** - Edit `STATUSES` in KanbanBoard
2. **Custom Fields** - Update `JobApplication` type
3. **Workflows** - Add to `KanbanContext`
4. **Analytics** - Extend `TimelineView`
5. **Integrations** - Add services

### Plugin Architecture (Future)
```typescript
interface Plugin {
  name: string
  install(app: App): void
  activate(): void
  deactivate(): void
}
```

## 🐛 Error Handling

### Client-Side
- Try-catch blocks in async functions
- Form validation before submission
- User-friendly error messages

### API Errors
```typescript
try {
  await api.createApplication(data)
} catch (error) {
  // Show user-friendly message
  // Log to monitoring service
  // Optionally retry
}
```

### Database Errors
- Constraints prevent invalid data
- RLS policies prevent unauthorized access
- Transactions ensure data consistency

## 📊 Monitoring & Analytics (Future)

### Metrics to Track
- App load time
- Time to interactive
- Error rates
- User engagement
- Feature usage

### Tools to Integrate
- Sentry for error tracking
- LogRocket for session replay
- Amplitude for analytics
- Supabase logs for backend

## 🎓 Design Patterns Used

### Patterns
- **Context API** - Global state management
- **Provider Pattern** - Wrap app with providers
- **Hook Pattern** - Custom hooks for logic
- **Composition** - Compose components together
- **Uncontrolled to Controlled** - Form input management

### Anti-Patterns Avoided
- ❌ Prop drilling
- ❌ Callback hell
- ❌ Global variables
- ❌ Mixing concerns
- ❌ Tight coupling

---

**Architecture designed for clarity, extensibility, and maintainability.**
