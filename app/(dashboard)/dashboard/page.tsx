export default function DashboardPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Your Tax Overview</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-2 text-lg font-semibold">Upcoming Deadlines</h3>
          <p className="text-gray-600">No upcoming deadlines found.</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-2 text-lg font-semibold">Estimated Tax</h3>
          <p className="text-3xl font-bold text-blue-600">€0.00</p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <h3 className="mb-2 text-lg font-semibold">Recent AI Insights</h3>
          <p className="text-gray-600">Start a chat with our AI to get personalized tax advice.</p>
        </div>
      </div>
    </div>
  );
}
