import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { JobApplication, JobStatus } from '../types';

interface KanbanContextType {
  applications: JobApplication[];
  setApplications: (apps: JobApplication[]) => void;
  addApplication: (app: JobApplication) => void;
  updateApplication: (id: string, updates: Partial<JobApplication>) => void;
  deleteApplication: (id: string) => void;
  moveApplication: (id: string, newStatus: JobStatus) => void;
  selectedApp: JobApplication | null;
  setSelectedApp: (app: JobApplication | null) => void;
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export function KanbanProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  const addApplication = useCallback((app: JobApplication) => {
    setApplications((prev) => [...prev, app]);
  }, []);

  const updateApplication = useCallback((id: string, updates: Partial<JobApplication>) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updates } : app))
    );
    if (selectedApp?.id === id) {
      setSelectedApp({ ...selectedApp, ...updates });
    }
  }, [selectedApp]);

  const deleteApplication = useCallback((id: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    if (selectedApp?.id === id) {
      setSelectedApp(null);
    }
  }, [selectedApp]);

  const moveApplication = useCallback((id: string, newStatus: JobStatus) => {
    updateApplication(id, { status: newStatus });
  }, [updateApplication]);

  return (
    <KanbanContext.Provider
      value={{
        applications,
        setApplications,
        addApplication,
        updateApplication,
        deleteApplication,
        moveApplication,
        selectedApp,
        setSelectedApp,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error('useKanban must be used within KanbanProvider');
  }
  return context;
}
