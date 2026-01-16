import AdminLayout from "../../components/layout/AdminLayout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const stats = [
  {
    title: "Total Organizations",
    value: 124,
    color: "from-indigo-500 to-indigo-600",
  },
  { title: "Active Plans", value: 5, color: "from-emerald-500 to-emerald-600" },
  { title: "Total Users", value: 2380, color: "from-purple-500 to-purple-600" },
  { title: "Revenue", value: "₹1.2L", color: "from-pink-500 to-pink-600" },
];

const chartData = [
  { month: "Jan", users: 400, revenue: 2400 },
  { month: "Feb", users: 800, revenue: 1398 },
  { month: "Mar", users: 1500, revenue: 9800 },
  { month: "Apr", users: 2000, revenue: 3908 },
  { month: "May", users: 2600, revenue: 4800 },
  { month: "Jun", users: 3200, revenue: 6200 },
];

export default function Dashboard() {
  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
          <p className="text-slate-500">Overview of your platform</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <input type="date" className="border rounded-lg px-3 py-2 text-sm" />
          <input type="date" className="border rounded-lg px-3 py-2 text-sm" />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm">
            Apply
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((item) => (
          <div
            key={item.title}
            className={`bg-gradient-to-r ${item.color} rounded-2xl p-5 text-white shadow-lg`}
          >
            <p className="text-sm opacity-80">{item.title}</p>
            <h3 className="text-3xl font-bold mt-2">{item.value}</h3>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl p-5 shadow">
          <h3 className="font-semibold mb-4">Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
