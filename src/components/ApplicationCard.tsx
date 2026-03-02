import type { JobApplication } from '../types';

interface CardProps {
  application: JobApplication;
  onClick: () => void;
  isDragging?: boolean;
}

const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  applied: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  interview: { bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  offer: { bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  rejected: { bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
};

export function ApplicationCard({
  application,
  onClick,
  isDragging = false,
}: CardProps) {
  const colors = statusColors[application.status];

  return (
    <div
      onClick={onClick}
      className={`
        bg-white border border-gray-200 rounded-lg p-4 cursor-pointer
        hover:shadow-md transition-all hover:border-gray-300
        ${isDragging ? 'opacity-50' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
            {application.position}
          </h3>
          <p className="text-gray-600 text-xs mt-1">{application.company}</p>
        </div>
      </div>

      <div className="space-y-2">
        {application.salary_range && (
          <p className="text-xs text-gray-500">💰 {application.salary_range}</p>
        )}

        {application.interview_date && (
          <p className="text-xs text-gray-500">📅 {application.interview_date}</p>
        )}

        {application.notes && (
          <p className="text-xs text-gray-600 line-clamp-2 mt-2 italic">
            "{application.notes}"
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${colors.dot}`}></div>
          <span className="text-xs font-medium text-gray-600">
            {new Date(application.applied_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>
        {application.contact_name && (
          <span className="text-xs text-blue-600">👤 Contact</span>
        )}
      </div>
    </div>
  );
}
