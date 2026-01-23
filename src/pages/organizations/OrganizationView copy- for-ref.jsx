import { useState, useMemo } from "react";
import { ArrowLeft, Download, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";

/* ---------------- STATIC DATA ---------------- */

const organization = {
  id: 1,
  name: "Demo Organization",
  email: "demo@org.com",
  phone: "+91 99999 88888",
  logo: "/assets/logo-placeholder.png",
  cover: "/assets/cover-placeholder.png",
  total_cards: 100,
  active_cards: 45,
  inactive_cards: 55,
};

const transactionsData = [
  {
    id: 1,
    date: "2024-01-10",
    cards: 50,
    used: 2,
    expiry: "2024-02-10",
    status: "Active",
    amount: 2450,
    employees: [
      {
        id: 1,
        card_id: "CARD-001",
        name: "Rahul Sharma",
        email: "rahul@company.com",
        phone: "9876543210",
      },
      {
        id: 2,
        card_id: "CARD-002",
        name: "Anita Verma",
        email: "anita@company.com",
        phone: "9123456789",
      },
    ],
  },
  {
    id: 2,
    date: "2023-12-01",
    cards: 50,
    used: 0,
    expiry: "2023-12-31",
    status: "Expired",
    amount: 2450,
    employees: [],
  },
];

export default function OrganizationView() {
  const navigate = useNavigate();

  const [transactions] = useState(transactionsData);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  /* ---------------- SEARCH & FILTER ---------------- */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.date.includes(search) ||
        tx.amount.toString().includes(search) ||
        tx.status.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "all" || tx.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [transactions, search, statusFilter]);

  return (
    <AdminLayout>
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 mb-4 hover:text-indigo-600"
      >
        <ArrowLeft size={18} />
        Back to Organizations
      </button>

      {/* HERO */}
      <div className="relative mb-20">
        <img
          src={organization.cover}
          className="w-full h-56 object-cover rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
        <div className="absolute left-6 -bottom-16 bg-white rounded-2xl shadow-xl p-4 flex gap-4">
          <img
            src={organization.logo}
            className="w-20 h-20 rounded-xl border"
          />
          <div>
            <h2 className="text-2xl font-bold">{organization.name}</h2>
            <p className="text-sm text-gray-500">{organization.email}</p>
            <p className="text-sm text-gray-500">{organization.phone}</p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard label="Total Cards" value={organization.total_cards} />
        <StatCard
          label="Active Cards"
          value={organization.active_cards}
          green
        />
        <StatCard
          label="Inactive Cards"
          value={organization.inactive_cards}
          red
        />
      </div>

      {/* ACTION BAR */}
      <div className="flex flex-wrap gap-3 justify-between items-center mb-4">
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() =>
              navigate(
                `/admin/organizations/${organization.id}/access-settings`,
              )
            }
            className="flex items-center gap-2 border px-5 py-2 rounded-xl text-sm"
          >
            <Settings size={16} /> Access Settings
          </button>
          <button className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Cards</th>
              <th className="px-6 py-3 text-left">Expiry</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Amount</th>
              <th className="px-6 py-3 text-left">View Cards</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="border-t">
                <td className="px-6 py-4">{tx.date}</td>
                <td className="px-6 py-4">{tx.cards}</td>
                <td className="px-6 py-4">{tx.expiry}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      tx.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="px-6 py-4">₹{tx.amount}</td>
                <td className="px-6 py-4">
                  {tx.used > 0 ? (
                    <button
                      onClick={() => navigate(`/organizations/cards/${tx.id}`)}
                      className="text-indigo-600 text-sm font-medium hover:underline"
                    >
                      View Cards ({tx.used})
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">No Cards</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW CARDS MODAL */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowModal(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden">
              <div className="flex justify-between items-center px-6 py-4 border-b">
                <h3 className="text-lg font-semibold">
                  Assigned Employee Cards
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <table className="w-full text-sm">
                  <thead className="text-gray-500 border-b">
                    <tr>
                      <th className="text-left py-2">Card ID</th>
                      <th className="text-left py-2">Employee</th>
                      <th className="text-left py-2">Email</th>
                      <th className="text-left py-2">Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedEmployees.map((emp) => (
                      <tr key={emp.id} className="border-b last:border-0">
                        <td className="py-2 font-medium">{emp.card_id}</td>
                        <td className="py-2">{emp.name}</td>
                        <td className="py-2">{emp.email}</td>
                        <td className="py-2">{emp.phone}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t text-right">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2 rounded-xl border hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

/* ---------------- STAT CARD ---------------- */
function StatCard({ label, value, green, red }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      a<p className="text-gray-500 text-sm">{label}</p>
      <h3
        className={`text-3xl font-bold mt-2 ${
          green ? "text-green-600" : red ? "text-red-500" : ""
        }`}
      >
        {value}
      </h3>
    </div>
  );
}
