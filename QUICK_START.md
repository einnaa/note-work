# Notework - Quick Start Guide

## 🚀 Get Started in 3 Minutes

### Prerequisites
- Node.js 18 or higher
- npm or yarn

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will open automatically at `http://localhost:5175`

### Step 3: Start Using Notework
- Click the **"New"** button to add your first job application
- Fill in the company, position, and other details
- Drag cards between columns to update status
- Switch to Timeline view to see analytics and charts

## 📊 Features at a Glance

### Kanban Board
- **Applied**: Initial stage for all new applications
- **Interview**: Track companies you're interviewing with
- **Offer**: Offers you've received
- **Rejected**: Closed applications

Each card shows:
- Position and company name
- Salary range (if provided)
- Interview date (if scheduled)
- Application date
- Contact indicator (if you have contact info)

### Timeline View
See your progress with:
- **Status Distribution**: Bar chart of applications by stage
- **Applications Over Time**: Track your application activity
- **Quick Stats**: Total applications, interviews, offers, success rate

### Application Details
Add comprehensive information when creating/editing:
- Company and position
- Applied and interview dates
- Contact name and email
- Job listing link
- Expected salary range
- Custom notes and observations

## 🎮 Usage

### Adding an Application
1. Click the **"New"** button in the header
2. Fill in required fields (company, position, status, date)
3. Add optional details (salary, contact, notes)
4. Click **"Save Application"**

### Moving Applications
Simply drag a card from one column to another. The status updates immediately.

### Editing an Application
Click on any application card to open the edit form.

### Deleting an Application
Currently delete from the edit modal (coming soon: context menu delete).

### Viewing Analytics
Click the **"Timeline"** button in the header to see:
- How many applications you've submitted
- Distribution across stages
- Trends over time

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      'primary': '#your-color',
      'secondary': '#your-color',
      // ... more colors
    }
  }
}
```

### Add Custom Status Columns
Edit the `STATUSES` array in `src/components/KanbanBoard.tsx`:

```typescript
const STATUSES: { id: JobStatus; label: string; color: string }[] = [
  { id: 'applied', label: 'Applied', color: 'blue' },
  // ... add more statuses
];
```

## 🔐 Demo Mode

The app includes demo data with 4 sample applications. These are loaded when you first open the app. Feel free to delete them and add your own!

## 🐛 Troubleshooting

### Port Already in Use
If port 5175 is already in use, Vite will automatically try the next available port. Check the terminal output for the correct URL.

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Styles not appearing
Make sure `src/index.css` is imported in `src/main.tsx`:
```typescript
import './index.css'
```

## 📦 Build for Production

```bash
npm run build
```

This creates a `dist/` folder ready for deployment.

## 🚀 Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Then drag & drop the dist/ folder to Netlify
```

### GitHub Pages
Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/notework/',
  // ... rest of config
})
```

Then deploy the `dist/` folder.

## 🔗 Next Steps

1. **Add Backend Integration**: Connect to Supabase or your own backend
2. **Add Authentication**: Implement sign-up and login
3. **Add Persistence**: Save data to a database
4. **Customize Branding**: Change colors and logo
5. **Deploy**: Push to production
6. **Share**: Tell your friends about your new job tracker!

## 📞 Support

For issues or questions:
1. Check the [Detailed README](./DETAILED_README.md)
2. Review the code comments
3. Check component prop interfaces for available options

---

**Happy job hunting! 🎯**
