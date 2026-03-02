import { useState, useEffect } from 'react';
import { KanbanProvider } from './contexts/KanbanContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { KanbanBoard } from './components/KanbanBoard';
import { TimelineView } from './components/TimelineView';
import { ApplicationModal } from './components/ApplicationModal';
import { useKanban } from './contexts/KanbanContext';
import type { JobApplication } from './types';
import './index.css';

function AppContent() {
  const [view, setView] = useState<'kanban' | 'timeline'>('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const { applications, addApplication, updateApplication } = useKanban();
  const { user } = useAuth();

  // Demo data - in production, this would come from API
  useEffect(() => {
    if (applications.length === 0 && user) {
      const demoData: JobApplication[] = [
        {
          id: '1',
          user_id: user.id,
          company: 'Google',
          position: 'Senior React Developer',
          status: 'interview',
          applied_date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          notes: 'Great initial conversation, scheduling second round',
          salary_range: '$150k - $200k',
          job_link: 'https://careers.google.com',
          contact_name: 'Sarah Chen',
          contact_email: 'sarah@google.com',
          interview_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          user_id: user.id,
          company: 'Microsoft',
          position: 'Frontend Engineer',
          status: 'applied',
          applied_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          notes: 'Applied through LinkedIn',
          salary_range: '$140k - $180k',
          job_link: 'https://careers.microsoft.com',
          contact_name: '',
          contact_email: '',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '3',
          user_id: user.id,
          company: 'Apple',
          position: 'iOS Developer',
          status: 'offer',
          applied_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          notes: 'Accepted offer! Starting in 2 weeks',
          salary_range: '$130k - $160k',
          job_link: 'https://careers.apple.com',
          contact_name: 'Mike Johnson',
          contact_email: 'mike@apple.com',
          interview_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '4',
          user_id: user.id,
          company: 'Amazon',
          position: 'Software Development Engineer',
          status: 'rejected',
          applied_date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          notes: 'Didn\'t pass final round',
          salary_range: '$120k - $150k',
          job_link: 'https://careers.amazon.com',
          contact_name: 'Emily Brown',
          contact_email: 'emily@amazon.com',
          interview_date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      demoData.forEach((app) => addApplication(app));
    }
  }, [applications.length, user, addApplication]);

  const selectedApp = applications.find((app) => app.id === selectedAppId);

  const handleSaveApplication = (
    data: Omit<JobApplication, 'id' | 'created_at' | 'updated_at' | 'user_id'>
  ) => {
    if (selectedApp) {
      updateApplication(selectedApp.id, data);
    } else {
      const newApp: JobApplication = {
        id: Math.random().toString(36).substr(2, 9),
        user_id: user?.id || '',
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      addApplication(newApp);
    }
    setIsModalOpen(false);
    setSelectedAppId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onAddClick={() => {
          setSelectedAppId(null);
          setIsModalOpen(true);
        }}
        onViewChange={setView}
        currentView={view}
      />

      {view === 'kanban' ? (
        <KanbanBoard onCardClick={setSelectedAppId} />
      ) : (
        <TimelineView />
      )}

      <ApplicationModal
        isOpen={isModalOpen}
        application={selectedApp}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAppId(null);
        }}
        onSave={handleSaveApplication}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <KanbanProvider>
        <AppContent />
      </KanbanProvider>
    </AuthProvider>
  );
}

export default App;
