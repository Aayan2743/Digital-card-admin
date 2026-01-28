import { useState, useEffect, useMemo } from "react";
import { Search, ArrowLeft, FileText, Download, X } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { errorAlert } from "../../utils/alert";
import Loader from "../../components/Loader";

export default function PaymentTransactions() {
  const navigate = useNavigate();

  /* ---------------- STATE ---------------- */
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [receipt, setReceipt] = useState(null);

  const ITEMS_PER_PAGE = 8;

  /* ---------------- FETCH API ---------------- */
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await api.get("/public/organizations/transactions"); // 👈 your API
      setPayments(Array.isArray(res.data.data) ? res.data.data : []);
    } catch {
      errorAlert("Error", "Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  /* ---------------- SEARCH FILTER ---------------- */
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      return (
        p.organization?.toLowerCase().includes(search.toLowerCase()) ||
        String(p.id).includes(search) ||
        String(p.price).includes(search)
      );
    });
  }, [payments, search]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);

  const paginatedPayments = filteredPayments.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  /* ---------------- EXPORT CSV ---------------- */
  const exportCSV = () => {
    const headers = [
      "Order ID",
      "Organization",
      "Amount",
      "Payment Type",
      "Payment Method",
      "Status",
      "Start Date",
      "End Date",
    ];

    const rows = filteredPayments.map((p) => [
      `ORD-${p.id}`,
      p.organization,
      p.price,
      p.payment_type,
      p.payment_method,
      p.status,
      p.starts_at,
      p.ends_at,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <AdminLayout>
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <Loader show={loading} text="Loading....." />
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
        >
          <ArrowLeft size={18} /> Back
        </button>
        <h2 className="text-xl font-semibold">Payment Transactions</h2>
      </div>

      {/* SEARCH + EXPORT */}
      <div className="flex justify-between items-center mb-4 gap-3">
        <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search order, org, amount..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="outline-none text-sm w-64"
          />
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-left">Order ID</th>
              <th className="p-4 text-left">Organization</th>
              <th className="p-4 text-left">Cards</th>
              <th className="p-4 text-center">Amount</th>
              <th className="p-4 text-center">Method</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Receipt</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500"></td>
              </tr>
            ) : paginatedPayments.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            ) : (
              paginatedPayments.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium">ORD-{p.id}</td>
                  <td className="p-4">{p.organization}</td>

                  <td className="p-4">{p.cards}</td>

                  <td className="p-4 text-center font-semibold">
                    ₹{Number(p.price).toFixed(2)}
                  </td>

                  <td className="p-4 text-center">{p.payment_method || "—"}</td>

                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        p.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4 text-center">{p.created_at}</td>

                  <td className="p-4 text-center">
                    {p.proof ? (
                      <button
                        onClick={() => setReceipt(p)}
                        className="text-indigo-600 hover:underline"
                      >
                        <FileText size={18} />
                      </button>
                    ) : (
                      <span className="text-gray-400 text-xs">N/A</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-lg border text-sm ${
                page === i + 1 ? "bg-indigo-600 text-white" : "hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* RECEIPT MODAL */}
      {receipt && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-[420px] overflow-hidden shadow-2xl">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Payment Proof</h3>
              <button onClick={() => setReceipt(null)}>
                <X size={18} />
              </button>
            </div>

            <div className="p-4">
              <img
                src={receipt.proof}
                alt="Payment Proof"
                className="w-full rounded-lg border"
              />
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
