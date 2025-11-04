export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Headline */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          Welcome back, Alex!
        </h1>
        <p className="text-slate-500 mt-2">
          Here&apos;s a summary of your platform&apos;s activity today.
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-500">New Bookings</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">12</p>
          <p className="text-sm font-medium text-emerald-500">
            +10% from yesterday
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-500">
            Pending Requests
          </p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">5</p>
          <p className="text-sm font-medium text-emerald-500">
            +2% from yesterday
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-500">Active Clients</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">
            234
          </p>
          <p className="text-sm font-medium text-emerald-500">
            +1% from last week
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col gap-2">
          <p className="text-sm font-medium text-slate-500">Total Services</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">
            48
          </p>
          <p className="text-sm font-medium text-slate-500">No change</p>
        </div>
      </div>

      {/* Chart + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking Trends */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Booking Trends
            </h2>
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 text-sm">
              <button className="px-3 py-1 rounded-md bg-white text-blue-600 font-medium">
                Weekly
              </button>
              <button className="px-3 py-1 rounded-md text-slate-500">
                Monthly
              </button>
            </div>
          </div>
          <div className="w-full h-80 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
            Chart data would be displayed here.
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Recent Activity
          </h2>
          <div className="flex flex-col gap-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center size-10 rounded-full bg-blue-50 text-blue-600">
                <span className="material-symbols-outlined text-xl">
                  calendar_add_on
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  New Booking: &quot;Deep Tissue Massage&quot;
                </p>
                <p className="text-xs text-slate-500">
                  by Sarah Jenkins · 2 min ago
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center size-10 rounded-full bg-blue-50 text-blue-600">
                <span className="material-symbols-outlined text-xl">
                  person_add
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  New Client: &quot;Mike Ross&quot;
                </p>
                <p className="text-xs text-slate-500">
                  Signed up · 15 min ago
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center size-10 rounded-full bg-blue-50 text-blue-600">
                <span className="material-symbols-outlined text-xl">
                  calendar_add_on
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  New Booking: &quot;Yoga Session&quot;
                </p>
                <p className="text-xs text-slate-500">
                  by Emily Carter · 1 hour ago
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center size-10 rounded-full bg-blue-50 text-blue-600">
                <span className="material-symbols-outlined text-xl">
                  star
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900">
                  Review Received: 5 Stars
                </p>
                <p className="text-xs text-slate-500">
                  for &quot;Hot Stone Massage&quot; · 3 hours ago
                </p>
              </div>
            </div>

            <button className="mt-2 text-sm font-medium text-blue-600 hover:underline self-start">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
