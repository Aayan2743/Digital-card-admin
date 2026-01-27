import { useState, useMemo, useEffect } from "react";
import { ArrowLeft, Download, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { errorAlert } from "../../utils/alert";

import AddCardsDrawer from "./AddCardsDrawer";

/* ---------------- STATIC DATA ---------------- */

export default function OrganizationView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAddCards, setShowAddCards] = useState(false);

  const [organization, setOrganization] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [orgLoading, setOrgLoading] = useState(true);
  const [txLoading, setTxLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const fetchOrganization = async () => {
    try {
      setOrgLoading(true);
      const res = await api.get(`/organizations/${id}`);
      setOrganization(res.data.data);
    } catch {
      errorAlert("Error", "Failed to load organization");
    } finally {
      setOrgLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      setTxLoading(true);
      const res = await api.get(`/organizations/${id}/subscription`);
      setTransactions(Array.isArray(res.data.data) ? res.data.data : []);
    } catch {
      errorAlert("Error", "Failed to load transactions");
    } finally {
      setTxLoading(false);
    }
  };

  useEffect(() => {
    fetchOrganization();
    fetchTransactions();
  }, [id]);

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

  if (orgLoading || !organization) {
    return (
      <AdminLayout>
        <div className="p-10 text-center text-gray-500">
          Loading organization...
        </div>
      </AdminLayout>
    );
  }

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
        {/* <img
          src={organization.cover || "/assets/coverPic.jpg"}
          onError={(e) => (e.currentTarget.src = "/assets/coverPic.jpg")}
          className="w-full h-56 object-cover rounded-2xl"
        /> */}

        <img
          src={organization.branding?.cover_page || "/assets/coverPic.jpg"}
          onError={(e) => (e.currentTarget.src = "/assets/coverPic.jpg")}
          className="w-full h-56 object-cover rounded-2xl"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
        <div className="absolute left-6 -bottom-16 bg-white rounded-2xl shadow-xl p-4 flex gap-4">
          {/* <img
            src={organization.logo || logo.jpg}
            className="w-20 h-20 rounded-xl border"
          /> */}

          {/* <img
            src={organization.logo || "/assets/logo.jpeg"}
            onError={(e) => (e.currentTarget.src = "/assets/logo.jpeg")}
            className="w-20 h-20 rounded-xl border"
          /> */}

          <img
            src={organization.branding?.logo || "/assets/logo.jpeg"}
            onError={(e) => (e.currentTarget.src = "/assets/logo.jpeg")}
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
            onClick={() => setShowAddCards(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow"
          >
            + Add Cards
          </button>

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
      {showAddCards && (
        <AddCardsDrawer
          organizationId={organization.id}
          onClose={() => setShowAddCards(false)}
          onSuccess={() => {
            fetchOrganization();
            fetchTransactions();
          }}
        />
      )}
    </AdminLayout>
  );
}

/* ---------------- STAT CARD ---------------- */
function StatCard({ label, value, green, red }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <p className="text-gray-500 text-sm">{label}</p>
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
