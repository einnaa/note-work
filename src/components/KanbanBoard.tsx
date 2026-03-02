import { useKanban } from '../contexts/KanbanContext';
import { ApplicationCard } from './ApplicationCard';
import type { JobStatus } from '../types';

const STATUSES: { id: JobStatus; label: string; color: string }[] = [
  { id: 'applied', label: 'Applied', color: 'blue' },
  { id: 'interview', label: 'Interview', color: 'yellow' },
  { id: 'offer', label: 'Offer', color: 'green' },
  { id: 'rejected', label: 'Rejected', color: 'red' },
];

interface KanbanBoardProps {
  onCardClick: (id: string) => void;
}

export function KanbanBoard({ onCardClick }: KanbanBoardProps) {
  const { applications, moveApplication } = useKanban();

  const getApplicationsByStatus = (status: JobStatus) => {
    return applications.filter((app) => app.status === status);
  };

  const handleDragStart = (e: React.DragEvent, appId: string) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('appId', appId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, status: JobStatus) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData('appId');
    moveApplication(appId, status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {STATUSES.map((statusConfig) => {
        const apps = getApplicationsByStatus(statusConfig.id);
        const colorMap = {
          blue: 'border-blue-200 bg-blue-50',
          yellow: 'border-yellow-200 bg-yellow-50',
          green: 'border-green-200 bg-green-50',
          red: 'border-red-200 bg-red-50',
        };

        return (
          <div
            key={statusConfig.id}
            className="flex flex-col bg-white rounded-xl border-2 border-gray-200 overflow-hidden"
          >
            <div className={`p-4 border-b-2 ${colorMap[statusConfig.color as keyof typeof colorMap]}`}>
              <h2 className="font-semibold text-gray-900">{statusConfig.label}</h2>
              <p className="text-sm text-gray-600 mt-1">
                {apps.length} {apps.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            <div
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, statusConfig.id)}
              className="flex-1 p-4 space-y-3 overflow-y-auto min-h-[400px]"
            >
              {apps.length === 0 ? (
                <div className="h-32 flex items-center justify-center text-gray-400 text-sm text-center">
                  <p>No applications yet</p>
                </div>
              ) : (
                apps.map((app) => (
                  <div
                    key={app.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, app.id)}
                    onClick={() => onCardClick(app.id)}
                  >
                    <ApplicationCard application={app} onClick={() => onCardClick(app.id)} />
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
