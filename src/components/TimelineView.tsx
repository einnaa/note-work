import { useKanban } from '../contexts/KanbanContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

export function TimelineView() {
  const { applications } = useKanban();

  // Generate timeline data - applications by date
  const timelineData = applications.reduce(
    (acc, app) => {
      const date = new Date(app.applied_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing[app.status as keyof typeof existing]++;
      } else {
        acc.push({
          date,
          applied: app.status === 'applied' ? 1 : 0,
          interview: app.status === 'interview' ? 1 : 0,
          offer: app.status === 'offer' ? 1 : 0,
          rejected: app.status === 'rejected' ? 1 : 0,
        });
      }
      return acc;
    },
    [] as Array<{
      date: string;
      applied: number;
      interview: number;
      offer: number;
      rejected: number;
    }>
  );

  // Status distribution data
  const statusData = [
    {
      name: 'Applied',
      value: applications.filter((a) => a.status === 'applied').length,
      fill: '#3b82f6',
    },
    {
      name: 'Interview',
      value: applications.filter((a) => a.status === 'interview').length,
      fill: '#f59e0b',
    },
    {
      name: 'Offer',
      value: applications.filter((a) => a.status === 'offer').length,
      fill: '#10b981',
    },
    {
      name: 'Rejected',
      value: applications.filter((a) => a.status === 'rejected').length,
      fill: '#ef4444',
    },
  ];

  const successRate =
    applications.length > 0
      ? Math.round(
          (applications.filter((a) => a.status === 'offer').length /
            applications.length) *
            100
        )
      : 0;

  return (
    <div className="p-6 space-y-8">
      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-2">Total Applications</p>
          <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-2">In Progress</p>
          <p className="text-3xl font-bold text-yellow-600">
            {applications.filter((a) => a.status === 'interview').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-2">Offers</p>
          <p className="text-3xl font-bold text-green-600">
            {applications.filter((a) => a.status === 'offer').length}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-sm text-gray-600 mb-2">Success Rate</p>
          <p className="text-3xl font-bold text-blue-600">{successRate}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Timeline Chart */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications Over Time</h3>
          {timelineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="applied"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="interview"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="offer"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="rejected"
                  stroke="#ef4444"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-72 flex items-center justify-center text-gray-400">
              <p>No data yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
