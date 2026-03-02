# Notework - Smart Job Application Tracker

A beautiful, modern Notion-style application for tracking job applications with Kanban board, timeline visualization, and analytics.

## 🚀 Features

### Core Features
- **Kanban Board View**: Drag-and-drop job applications across 4 stages (Applied → Interview → Offer → Rejected)
- **Timeline View**: Visualize your job search progress with interactive charts
- **Application Management**: Create, edit, and delete job applications with rich details
- **Analytics Dashboard**: Track success rates, application trends, and offer statistics
- **Smooth Micro-interactions**: Beautiful animations and transitions throughout the app

### Application Details
Track comprehensive information for each job application:
- Company name and position
- Application date and interview date
- Salary range expectations
- Contact information (name, email)
- Job listing link
- Custom notes and observations
- Status tracking (Applied, Interview, Offer, Rejected)

## 🛠 Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icon library
- **dnd-kit** - Drag-and-drop functionality (future enhancement)

### State Management
- **React Context API** - Global state (Kanban, Auth)
- **TanStack React Query** - Server state management (ready for API integration)

### Styling
- **Tailwind CSS** - Modern utility-first CSS
- **Headless UI** - Unstyled, accessible components
- **Custom animations** - Smooth transitions and micro-interactions

### Backend Ready
- **Supabase** - PostgreSQL database with auth
- **Row-level security** - Secure data isolation per user
- **API-first design** - RESTful endpoints

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm lint
```

The app will be available at `http://localhost:5175` (or the next available port).

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── KanbanBoard.tsx  # Main Kanban board view
│   ├── TimelineView.tsx # Timeline and analytics view
│   ├── ApplicationCard.tsx # Individual application card
│   ├── ApplicationModal.tsx # Create/edit application form
│   └── ui/              # Reusable UI components
├── contexts/            # React Context providers
│   ├── KanbanContext.tsx # Application state management
│   └── AuthContext.tsx   # Authentication state
├── types/               # TypeScript type definitions
├── services/            # API service layer
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── pages/               # Page components
├── App.tsx              # Main app component
└── index.css            # Global styles
```

## 🎨 UI Components

### Header
- Logo and branding
- Navigation between Board and Timeline views
- Search functionality
- Add new application button
- User menu with settings and logout

### Kanban Board
- Four status columns: Applied, Interview, Offer, Rejected
- Drag-and-drop cards between columns
- Application count per status
- Color-coded status indicators
- Quick view of key information per application

### Application Card
- Company and position
- Salary range display
- Interview date if scheduled
- Truncated notes preview
- Application date
- Contact indicator

### Application Modal
- Comprehensive form with validation
- Company and position fields
- Date pickers for application and interview dates
- Contact information fields
- Salary range input
- Rich notes textarea
- Save and cancel actions

### Timeline View
- **Status Distribution Chart**: Bar chart showing applications by status
- **Applications Over Time**: Line chart tracking applications by date
- **Analytics Cards**:
  - Total applications count
  - In-progress interviews
  - Offers received
  - Success rate percentage

## 🔄 State Management

### KanbanContext
Manages application data and board state:
- `applications`: Array of all job applications
- `addApplication()`: Add new application
- `updateApplication()`: Update existing application
- `deleteApplication()`: Remove application
- `moveApplication()`: Move between statuses
- `selectedApp`: Currently selected application

### AuthContext
Manages authentication state:
- `user`: Current user info
- `login()`: User login
- `signup()`: User registration
- `logout()`: User logout

## 🎯 Key Features Explained

### Drag & Drop
Applications can be dragged between status columns. The drag-and-drop is powered by native HTML5 drag-and-drop API, with `dnd-kit` ready for more advanced scenarios.

### Data Visualization
Recharts provides interactive, responsive charts:
- Bar chart for status distribution
- Line chart for timeline trends
- Tooltip on hover for detailed data

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Adapts from 1 column (mobile) to 4 columns (desktop)
- Touch-friendly interactions

### Animations
- Smooth transitions between states
- Modal slide-up animation
- Fade-in effects for new content
- Micro-interactions on hover

## 🔐 Security Considerations

### Frontend Security
- No sensitive data stored in localStorage (except auth tokens)
- CORS-protected API calls
- XSS protection through React's built-in escaping

### Backend Security (Ready for Implementation)
- Row-level security in Supabase
- User ID validation on all endpoints
- JWT token authentication
- HTTPS enforcement

## 🚀 API Integration

The app is ready to integrate with a backend. Key endpoints:

```
POST   /api/auth/signup          # Register
POST   /api/auth/login           # Login
GET    /api/applications         # Fetch all applications
POST   /api/applications         # Create application
PATCH  /api/applications/:id     # Update application
DELETE /api/applications/:id     # Delete application
PATCH  /api/applications/bulk-update  # Bulk status update
GET    /api/analytics            # Get analytics data
GET    /api/analytics/timeline   # Get timeline data
```

## 📱 Data Structure

### JobApplication
```typescript
interface JobApplication {
  id: string;
  user_id: string;
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected';
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
```

## 🎓 Demo Data

The app includes sample job applications to demonstrate functionality:
- Google: Senior React Developer (Interview stage)
- Microsoft: Frontend Engineer (Applied)
- Apple: iOS Developer (Offer received)
- Amazon: SDE (Rejected)

## 🔮 Future Enhancements

- [ ] Advanced dnd-kit integration for enhanced drag-and-drop
- [ ] Email notifications for upcoming interviews
- [ ] Resume upload and link management
- [ ] Interview preparation materials
- [ ] Salary negotiation tracker
- [ ] Job market research integration
- [ ] Export applications to PDF
- [ ] Dark mode support
- [ ] Collaborative boards (share with friends)
- [ ] Mobile app with React Native
- [ ] Browser extensions for easy application saving
- [ ] AI-powered interview coaching
- [ ] Salary benchmarking

## 🤝 Contributing

This is a personal project, but feel free to fork and customize!

## 📄 License

MIT

## 🎉 Getting Started

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open http://localhost:5175 in your browser
5. Start adding your job applications!

---

**Built with ❤️ for job seekers everywhere.**
