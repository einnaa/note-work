# 🎯 Notework - Smart Job Application Tracker

A beautiful, modern Notion-style application for tracking job applications with Kanban board, timeline visualization, and analytics. Built with React, TypeScript, and Tailwind CSS.

![Notework Demo](https://img.shields.io/badge/Status-Active%20Development-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4)

## ✨ Features

### 📋 Core Features
- **Kanban Board**: Drag-and-drop applications across 4 stages (Applied → Interview → Offer → Rejected)
- **Timeline View**: Interactive charts showing your job search progress
- **Analytics Dashboard**: Track success rates and application trends
- **Rich Application Details**: Company, position, salary, contacts, links, and notes
- **Smooth Animations**: Beautiful micro-interactions throughout the app
- **Responsive Design**: Works on mobile, tablet, and desktop

### 🎨 UI/UX Features
- Notion-inspired design with clean, modern interface
- Color-coded status indicators
- Drag-and-drop with visual feedback
- Modal forms with validation
- User menu and settings
- Search functionality (ready for implementation)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone and install
git clone <repo-url>
cd notework
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:5175
```

The app will open with demo data (Google, Microsoft, Apple, Amazon sample applications).

## 📊 What You Get

### Kanban Board View
- **4 Status Columns**: Applied, Interview, Offer, Rejected
- **Drag & Drop**: Move applications between columns
- **Card Details**: Quick overview of key information
- **Status Counts**: See how many applications in each stage

### Timeline View
- **Status Distribution Chart**: Bar chart of applications by stage
- **Applications Over Time**: Track your progress over time
- **Key Metrics**: 
  - Total applications
  - Active interviews
  - Offers received
  - Success rate percentage

### Application Management
Create and edit applications with:
- Company and position
- Applied and interview dates
- Contact information
- Job listing link
- Salary range expectations
- Custom notes

## 📁 Project Structure

```
notework/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx       # Navigation
│   │   ├── KanbanBoard.tsx  # Main board
│   │   ├── TimelineView.tsx # Analytics
│   │   ├── ApplicationCard.tsx # Card component
│   │   ├── ApplicationModal.tsx # Form
│   │   └── ui/              # UI components
│   ├── contexts/            # State management
│   │   ├── KanbanContext.tsx
│   │   └── AuthContext.tsx
│   ├── services/            # API services
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main app
│   └── index.css            # Styles
├── public/
├── package.json
└── vite.config.ts
```

## 🛠 Tech Stack

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Charts
- **Lucide React** - Icons

### State Management
- **React Context API** - Global state
- **TanStack React Query** - Server state (ready for backend)

### Styling
- **Tailwind CSS** - Utility classes
- **Headless UI** - Accessibility components

## 🔌 Backend Integration Ready

The app is designed to work with:
- **Supabase** - PostgreSQL + Auth
- **Custom REST API** - Your own backend

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for implementation guide.

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 3 minutes
- **[DETAILED_README.md](./DETAILED_README.md)** - Comprehensive feature guide
- **[BACKEND_SETUP.md](./BACKEND_SETUP.md)** - Backend integration with Supabase
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture & design

## 🎮 Usage

### Add an Application
1. Click **"New"** button
2. Fill in company, position, and date
3. Add optional details (salary, contact, notes)
4. Click **"Save Application"**

### Move Application
Drag a card between columns to change status.

### View Analytics
Click **"Timeline"** button to see charts and metrics.

### Edit/Delete
Click on any card to open edit form (delete coming soon).

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      'primary': '#your-color',
    }
  }
}
```

### Add Custom Columns
Edit `src/components/KanbanBoard.tsx`:
```typescript
const STATUSES = [
  { id: 'applied', label: 'Applied', color: 'blue' },
  // Add more statuses
]
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run preview
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag & drop dist/ folder to Netlify
```

## 🔄 Demo Data

The app includes 4 sample applications to demonstrate features:
- **Google** - Senior React Developer (Interview stage)
- **Microsoft** - Frontend Engineer (Applied)
- **Apple** - iOS Developer (Offer received)
- **Amazon** - SDE (Rejected)

Feel free to delete these and add your own!

## 🔐 Privacy & Security

- **No backend by default** - All data stored locally in browser
- **Demo mode** - Uses localStorage for state
- **Supabase ready** - Secure backend with Row-Level Security
- **Open source** - Full transparency and control

## 🐛 Known Limitations

- ✅ Works great for 100-1000 applications
- ⚠️ No persistence between sessions (without backend)
- ⚠️ No real-time sync yet
- ⚠️ No mobile app yet

See [Roadmap](#roadmap) for upcoming features.

## 🎓 Learning Resources

This project is great for learning:
- React 19 Hooks
- TypeScript
- Tailwind CSS
- State Management with Context
- Drag & Drop implementation
- Chart visualization
- Form handling
- API integration patterns

## 🔮 Roadmap

### Short Term
- [ ] Delete applications from UI
- [ ] Search functionality
- [ ] Filter by status/company
- [ ] Sort applications
- [ ] Bulk actions

### Medium Term
- [ ] Supabase backend integration
- [ ] User authentication
- [ ] Data persistence
- [ ] Dark mode
- [ ] Interview preparation materials

### Long Term
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] AI interview coach
- [ ] Salary benchmarking
- [ ] Job market research
- [ ] Export to PDF
- [ ] Collaborative boards

## 🤝 Contributing

Feel free to fork, customize, and build on this!

## 📄 License

MIT - Feel free to use for personal or commercial projects

## 🎉 Getting Started

1. **Clone the repo**
   ```bash
   git clone <repo-url> && cd notework
   ```

2. **Install and run**
   ```bash
   npm install && npm run dev
   ```

3. **Start tracking!**
   Click "New" to add your first job application

## 💡 Tips for Success

1. **Be comprehensive** - Add all details when applying
2. **Update regularly** - Keep statuses current
3. **Add notes** - Remember important details
4. **Track offers** - Compare salary and benefits
5. **Stay persistent** - Job search takes time!

## 🎯 Why Notework?

- **Beautiful Design** - Modern, clean interface
- **Developer Friendly** - Open source, customizable
- **Privacy First** - Your data, your control
- **Easy to Use** - Intuitive drag-and-drop
- **Powerful** - Analytics and insights
- **Free** - No subscriptions or paywalls

## 📞 Support

For issues or questions:
1. Check the documentation files
2. Review component code comments
3. Open an issue on GitHub

## 🙏 Acknowledgments

Built with ❤️ for job seekers everywhere. Inspired by Notion, Trello, and modern SaaS design.

---

**Ready to get organized? Start tracking your job applications now! 🚀**

### Next Steps
- 📖 Read [QUICK_START.md](./QUICK_START.md)
- 🎨 Check out [DETAILED_README.md](./DETAILED_README.md)
- 🔌 Integrate with [BACKEND_SETUP.md](./BACKEND_SETUP.md)
- 🏗️ Explore [ARCHITECTURE.md](./ARCHITECTURE.md)
