import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Download, Settings } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import AddCardsDrawer from "./AddCardsDrawer";

import api from "../../services/api";
import { errorAlert } from "../../utils/alert";

export default function OrganizationView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showDrawer, setShowDrawer] = useState(false);
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ORG ---------------- */
  const fetchOrganizationDetails = () => {
    setLoading(true);
    api
      .get(`/organizations/${id}`)
      .then((res) => {
        setOrganization(res.data.data);
      })
      .catch(() => {
        errorAlert("Error", "Failed to load organization");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrganizationDetails();
  }, [id]);

  /* ---------------- TRANSACTIONS (UI ONLY) ---------------- */
  const [transactions, setTransactions] = useState([]);

  /* ---------------- SEARCH & FILTER ---------------- */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const daysLeft = (expiry) => {
    const diff = new Date(expiry) - new Date();
    return Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchSearch =
        tx.date?.includes(search) ||
        tx.amount?.toString().includes(search) ||
        tx.status?.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "all" || tx.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [transactions, search, statusFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  /* ---------------- EXPORT CSV ---------------- */
  const exportCSV = () => {
    const headers = ["Date", "Cards", "Expiry", "Status", "Amount"];
    const rows = filteredTransactions.map((t) => [
      t.date,
      t.cards,
      t.expiry,
      t.status,
      t.amount,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "transactions.csv";
    link.click();
  };

  /* ---------------- LOADING GUARD ---------------- */
  if (loading || !organization) {
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
        <img
          src={organization.cover || "/assets/cover-placeholder.png"}
          className="w-full h-56 object-cover rounded-2xl"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />

        <div className="absolute left-6 -bottom-16 bg-white rounded-2xl shadow-xl p-4 flex gap-4">
          <img
            src={organization.logo || "/assets/logo-placeholder.png"}
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
        <StatCard label="Total Cards" value={organization.total_cards || 0} />
        <StatCard
          label="Active Cards"
          value={organization.active_cards || 0}
          green
        />
        <StatCard
          label="Inactive Cards"
          value={organization.inactive_cards || 0}
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
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
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
            className="flex items-center gap-2 border px-5 py-2 rounded-xl text-sm hover:bg-gray-50"
          >
            <Settings size={16} />
            Access Settings
          </button>

          <button
            onClick={exportCSV}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
          >
            <Download size={16} /> Export CSV
          </button>

          <button
            onClick={() => setShowDrawer(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl shadow"
          >
            + Add Cards
          </button>
        </div>
      </div>

      {showDrawer && (
        <AddCardsDrawer
          organizationId={organization.id}
          onClose={() => setShowDrawer(false)}
          onSuccess={fetchOrganizationDetails}
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
