// // import { useState, useMemo } from "react";
// // import { Search, ArrowLeft, FileText, Download, X } from "lucide-react";
// // import AdminLayout from "../../components/layout/AdminLayout";
// // import { useNavigate } from "react-router-dom";

// // export default function PaymentTransactions() {
// //   const navigate = useNavigate();

// //   /* ---------------- BRAND / ORG ---------------- */
// //   const brand = {
// //     name: "ABC Corporation",
// //     logo: "https://via.placeholder.com/100x100",
// //     email: "support@abccorp.com",
// //     phone: "+91 98765 43210",
// //   };

// //   /* ---------------- PAYMENT DATA ---------------- */
// //   const [payments] = useState([
// //     {
// //       id: 1,
// //       order_id: "ORD-1001",
// //       org: "ABC Corporation",
// //       email: "billing@abccorp.com",
// //       amount: 10878,
// //       method: "UPI",
// //       status: "Success",
// //       date: "2026-01-15",
// //       txn_id: "TXN998877",
// //     },
// //     {
// //       id: 2,
// //       order_id: "ORD-1002",
// //       org: "ABC Corporation",
// //       email: "billing@abccorp.com",
// //       amount: 490,
// //       method: "Card",
// //       status: "Success",
// //       date: "2026-01-15",
// //       txn_id: "TXN112233",
// //     },
// //     {
// //       id: 3,
// //       order_id: "ORD-1003",
// //       org: "XYZ Pvt Ltd",
// //       email: "accounts@xyz.com",
// //       amount: 245,
// //       method: "NetBanking",
// //       status: "Pending",
// //       date: "2026-01-14",
// //       txn_id: "TXN445566",
// //     },
// //   ]);

// //   /* ---------------- UI STATE ---------------- */
// //   const [search, setSearch] = useState("");
// //   const [status, setStatus] = useState("all");
// //   const [method, setMethod] = useState("all");
// //   const [page, setPage] = useState(1);
// //   const [receipt, setReceipt] = useState(null);

// //   const ITEMS_PER_PAGE = 5;

// //   /* ---------------- FILTERING ---------------- */
// //   const filteredPayments = useMemo(() => {
// //     return payments.filter((p) => {
// //       const matchSearch =
// //         p.order_id.toLowerCase().includes(search.toLowerCase()) ||
// //         p.email.toLowerCase().includes(search.toLowerCase()) ||
// //         p.org.toLowerCase().includes(search.toLowerCase());

// //       const matchStatus = status === "all" || p.status === status;
// //       const matchMethod = method === "all" || p.method === method;

// //       return matchSearch && matchStatus && matchMethod;
// //     });
// //   }, [payments, search, status, method]);

// //   const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);
// //   const paginatedPayments = filteredPayments.slice(
// //     (page - 1) * ITEMS_PER_PAGE,
// //     page * ITEMS_PER_PAGE
// //   );

// //   /* ---------------- EXPORT CSV ---------------- */
// //   const exportCSV = () => {
// //     const headers = [
// //       "Order ID",
// //       "Organization",
// //       "Email",
// //       "Amount",
// //       "Method",
// //       "Status",
// //       "Date",
// //       "Transaction ID",
// //     ];

// //     const rows = filteredPayments.map((p) => [
// //       p.order_id,
// //       p.org,
// //       p.email,
// //       p.amount,
// //       p.method,
// //       p.status,
// //       p.date,
// //       p.txn_id,
// //     ]);

// //     const csv =
// //       "data:text/csv;charset=utf-8," +
// //       [headers, ...rows].map((e) => e.join(",")).join("\n");

// //     const link = document.createElement("a");
// //     link.href = encodeURI(csv);
// //     link.download = "payment_transactions.csv";
// //     link.click();
// //   };

// //   /* ---------------- EXPORT EXCEL ---------------- */
// //   const exportExcel = () => {
// //     let table = `<table><tr>
// //       <th>Order ID</th><th>Organization</th><th>Email</th>
// //       <th>Amount</th><th>Method</th><th>Status</th>
// //       <th>Date</th><th>Transaction ID</th>
// //     </tr>`;

// //     filteredPayments.forEach((p) => {
// //       table += `<tr>
// //         <td>${p.order_id}</td>
// //         <td>${p.org}</td>
// //         <td>${p.email}</td>
// //         <td>${p.amount}</td>
// //         <td>${p.method}</td>
// //         <td>${p.status}</td>
// //         <td>${p.date}</td>
// //         <td>${p.txn_id}</td>
// //       </tr>`;
// //     });

// //     table += "</table>";

// //     const uri =
// //       "data:application/vnd.ms-excel;charset=utf-8," +
// //       encodeURIComponent(table);

// //     const link = document.createElement("a");
// //     link.href = uri;
// //     link.download = "payment_transactions.xls";
// //     link.click();
// //   };

// //   return (
// //     <AdminLayout>
// //       {/* HEADER */}
// //       <div className="flex items-center gap-3 mb-6">
// //         <button
// //           onClick={() => navigate(-1)}
// //           className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
// //         >
// //           <ArrowLeft size={18} />
// //           Back
// //         </button>
// //         <h2 className="text-xl font-semibold">Payment Transactions</h2>
// //       </div>

// //       {/* FILTER BAR */}
// //       <div className="flex flex-wrap gap-4 justify-between mb-4">
// //         <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white shadow-sm">
// //           <Search size={16} className="text-gray-400" />
// //           <input
// //             placeholder="Search order, org, email..."
// //             value={search}
// //             onChange={(e) => {
// //               setSearch(e.target.value);
// //               setPage(1);
// //             }}
// //             className="outline-none text-sm w-64"
// //           />
// //         </div>

// //         <div className="flex gap-3">
// //           <select
// //             value={status}
// //             onChange={(e) => {
// //               setStatus(e.target.value);
// //               setPage(1);
// //             }}
// //             className="border rounded-xl px-4 py-2 text-sm bg-white shadow-sm"
// //           >
// //             <option value="all">All Status</option>
// //             <option value="Success">Success</option>
// //             <option value="Pending">Pending</option>
// //             <option value="Failed">Failed</option>
// //           </select>

// //           <select
// //             value={method}
// //             onChange={(e) => {
// //               setMethod(e.target.value);
// //               setPage(1);
// //             }}
// //             className="border rounded-xl px-4 py-2 text-sm bg-white shadow-sm"
// //           >
// //             <option value="all">All Methods</option>
// //             <option value="UPI">UPI</option>
// //             <option value="Card">Card</option>
// //             <option value="NetBanking">NetBanking</option>
// //           </select>

// //           <button
// //             onClick={exportCSV}
// //             className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm hover:bg-gray-50"
// //           >
// //             <Download size={16} /> CSV
// //           </button>

// //           <button
// //             onClick={exportExcel}
// //             className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm hover:bg-gray-50"
// //           >
// //             <Download size={16} /> Excel
// //           </button>
// //         </div>
// //       </div>

// //       {/* TABLE */}
// //       <div className="bg-white rounded-2xl shadow overflow-hidden">
// //         <table className="min-w-full text-sm">
// //           <thead className="bg-gray-50 text-gray-600">
// //             <tr>
// //               <th className="p-4 text-left">Order ID</th>
// //               <th className="p-4 text-left">Organization</th>
// //               <th className="p-4 text-center">Amount</th>
// //               <th className="p-4 text-center">Method</th>
// //               <th className="p-4 text-center">Status</th>
// //               <th className="p-4 text-center">Date</th>
// //               <th className="p-4 text-center">Receipt</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {paginatedPayments.map((p) => (
// //               <tr key={p.id} className="border-t hover:bg-gray-50">
// //                 <td className="p-4 font-medium">{p.order_id}</td>
// //                 <td className="p-4">{p.org}</td>
// //                 <td className="p-4 text-center font-semibold">₹{p.amount}</td>
// //                 <td className="p-4 text-center">{p.method}</td>
// //                 <td className="p-4 text-center">
// //                   <span
// //                     className={`px-3 py-1 rounded-full text-xs font-medium ${
// //                       p.status === "Success"
// //                         ? "bg-green-100 text-green-600"
// //                         : p.status === "Pending"
// //                         ? "bg-yellow-100 text-yellow-600"
// //                         : "bg-red-100 text-red-600"
// //                     }`}
// //                   >
// //                     {p.status}
// //                   </span>
// //                 </td>
// //                 <td className="p-4 text-center">{p.date}</td>
// //                 <td className="p-4 text-center">
// //                   <button
// //                     onClick={() => setReceipt(p)}
// //                     className="text-indigo-600 hover:underline"
// //                   >
// //                     <FileText size={18} />
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* RECEIPT MODAL (MODERN) */}
// //       {receipt && (
// //         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
// //           <div className="bg-white rounded-3xl shadow-2xl w-[420px] overflow-hidden">
// //             {/* HEADER */}
// //             <div className="bg-indigo-600 p-5 text-white relative">
// //               <button
// //                 onClick={() => setReceipt(null)}
// //                 className="absolute right-4 top-4 opacity-80 hover:opacity-100"
// //               >
// //                 <X size={18} />
// //               </button>

// //               <div className="flex items-center gap-4">
// //                 <img
// //                   src={brand.logo}
// //                   className="w-14 h-14 rounded-xl bg-white p-1"
// //                 />
// //                 <div>
// //                   <h3 className="text-lg font-semibold">{brand.name}</h3>
// //                   <p className="text-sm opacity-90">Payment Receipt</p>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* BODY */}
// //             <div className="p-6 space-y-4 text-sm">
// //               <div className="flex justify-between">
// //                 <span className="text-gray-500">Order ID</span>
// //                 <span className="font-medium">{receipt.order_id}</span>
// //               </div>

// //               <div className="flex justify-between">
// //                 <span className="text-gray-500">Transaction ID</span>
// //                 <span className="font-medium">{receipt.txn_id}</span>
// //               </div>

// //               <div className="flex justify-between">
// //                 <span className="text-gray-500">Payment Method</span>
// //                 <span className="font-medium">{receipt.method}</span>
// //               </div>

// //               <div className="flex justify-between">
// //                 <span className="text-gray-500">Status</span>
// //                 <span
// //                   className={`px-3 py-1 rounded-full text-xs ${
// //                     receipt.status === "Success"
// //                       ? "bg-green-100 text-green-600"
// //                       : receipt.status === "Pending"
// //                       ? "bg-yellow-100 text-yellow-600"
// //                       : "bg-red-100 text-red-600"
// //                   }`}
// //                 >
// //                   {receipt.status}
// //                 </span>
// //               </div>

// //               <div className="border-t pt-4 flex justify-between items-center">
// //                 <span className="text-gray-600">Total Paid</span>
// //                 <span className="text-2xl font-bold text-indigo-600">
// //                   ₹{receipt.amount}
// //                 </span>
// //               </div>
// //             </div>

// //             {/* FOOTER */}
// //             <div className="bg-gray-50 px-6 py-4 text-xs text-gray-500 text-center">
// //               {brand.email} · {brand.phone}
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </AdminLayout>
// //   );
// // }

// import { useState, useMemo, useEffect } from "react";
// import { Search, ArrowLeft, FileText, Download, X } from "lucide-react";
// import AdminLayout from "../../components/layout/AdminLayout";
// import { useNavigate } from "react-router-dom";
// import api from "../../services/api";
// import { errorAlert } from "../../utils/alert";

// export default function PaymentTransactions() {
//   const navigate = useNavigate();

//   const brand = {
//     name: "Digital Card",
//     logo: "/assets/logo.jpeg",
//     email: "support@digitalcard.com",
//     phone: "+91 98765 43210",
//   };

//   /* ---------------- API DATA ---------------- */
//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ---------------- UI STATE ---------------- */
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("all");
//   const [method, setMethod] = useState("all");
//   const [page, setPage] = useState(1);
//   const [receipt, setReceipt] = useState(null);

//   const ITEMS_PER_PAGE = 5;

//   /* ---------------- FETCH PAYMENTS ---------------- */
//   const fetchPayments = async () => {
//     try {
//       const res = await api.get("/public/organizations/transactions");
//       setPayments(res.data.data || []);
//     } catch {
//       errorAlert("Error", "Failed to load transactions");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPayments();
//   }, []);

//   /* ---------------- FILTERING ---------------- */
//   const filteredPayments = useMemo(() => {
//     return payments.filter((p) => {
//       const matchSearch =
//         p.order_id?.toLowerCase().includes(search.toLowerCase()) ||
//         p.email?.toLowerCase().includes(search.toLowerCase()) ||
//         p.organization?.toLowerCase().includes(search.toLowerCase());

//       const matchStatus = status === "all" || p.status === status;
//       const matchMethod = method === "all" || p.payment_method === method;

//       return matchSearch && matchStatus && matchMethod;
//     });
//   }, [payments, search, status, method]);

//   const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);
//   const paginatedPayments = filteredPayments.slice(
//     (page - 1) * ITEMS_PER_PAGE,
//     page * ITEMS_PER_PAGE,
//   );

//   if (loading) {
//     return (
//       <AdminLayout>
//         <div className="p-10 text-center text-gray-500">
//           Loading transactions...
//         </div>
//       </AdminLayout>
//     );
//   }

//   /* ---------------- EXPORT CSV ---------------- */
//   const exportCSV = () => {
//     const headers = [
//       "Order ID",
//       "Organization",
//       "Email",
//       "Amount",
//       "Method",
//       "Status",
//       "Date",
//       "Transaction ID",
//     ];

//     const rows = filteredPayments.map((p) => [
//       p.order_id,
//       p.organization,
//       p.email,
//       p.amount,
//       p.payment_method,
//       p.status,
//       p.date,
//       p.txn_id,
//     ]);

//     const csv =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map((e) => e.join(",")).join("\n");

//     const link = document.createElement("a");
//     link.href = encodeURI(csv);
//     link.download = "payment_transactions.csv";
//     link.click();
//   };

//   return (
//     <AdminLayout>
//       {/* HEADER */}
//       <div className="flex items-center gap-3 mb-6">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-gray-600 hover:text-indigo-600"
//         >
//           <ArrowLeft size={18} />
//           Back
//         </button>
//         <h2 className="text-xl font-semibold">Payment Transactions</h2>
//       </div>

//       {/* FILTER BAR */}
//       <div className="flex flex-wrap gap-4 justify-between mb-4">
//         <div className="flex items-center gap-2 border rounded-xl px-3 py-2 bg-white shadow-sm">
//           <Search size={16} className="text-gray-400" />
//           <input
//             placeholder="Search order, org, email..."
//             value={search}
//             onChange={(e) => {
//               setSearch(e.target.value);
//               setPage(1);
//             }}
//             className="outline-none text-sm w-64"
//           />
//         </div>

//         <div className="flex gap-3">
//           <select
//             value={status}
//             onChange={(e) => setStatus(e.target.value)}
//             className="border rounded-xl px-4 py-2 text-sm"
//           >
//             <option value="all">All Status</option>
//             <option value="Success">Success</option>
//             <option value="Pending">Pending</option>
//             <option value="Failed">Failed</option>
//           </select>

//           <select
//             value={method}
//             onChange={(e) => setMethod(e.target.value)}
//             className="border rounded-xl px-4 py-2 text-sm"
//           >
//             <option value="all">All Methods</option>
//             <option value="UPI">UPI</option>
//             <option value="Card">Card</option>
//             <option value="Cash">Cash</option>
//           </select>

//           <button
//             onClick={exportCSV}
//             className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm"
//           >
//             <Download size={16} /> CSV
//           </button>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="p-4 text-left">Order ID</th>
//               <th className="p-4 text-left">Organization</th>
//               <th className="p-4 text-center">Amount</th>
//               <th className="p-4 text-center">Method</th>
//               <th className="p-4 text-center">Status</th>
//               <th className="p-4 text-center">Date</th>
//               <th className="p-4 text-center">Receipt</th>
//             </tr>
//           </thead>

//           <tbody>
//             {paginatedPayments.map((p) => (
//               <tr key={p.id} className="border-t hover:bg-gray-50">
//                 <td className="p-4 font-medium">{p.order_id}</td>
//                 <td className="p-4">{p.organization}</td>
//                 <td className="p-4 text-center font-semibold">₹{p.amount}</td>
//                 <td className="p-4 text-center">{p.payment_method}</td>
//                 <td className="p-4 text-center">
//                   <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
//                     {p.status}
//                   </span>
//                 </td>
//                 <td className="p-4 text-center">{p.date}</td>
//                 <td className="p-4 text-center">
//                   <button
//                     onClick={() => setReceipt(p)}
//                     className="text-indigo-600"
//                   >
//                     <FileText size={18} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* RECEIPT MODAL */}
//       {receipt && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-2xl w-[420px] overflow-hidden">
//             <div className="bg-indigo-600 p-5 text-white relative">
//               <button
//                 onClick={() => setReceipt(null)}
//                 className="absolute right-4 top-4"
//               >
//                 <X size={18} />
//               </button>
//               <h3 className="text-lg font-semibold">Payment Receipt</h3>
//             </div>

//             <div className="p-6 space-y-3 text-sm">
//               <p>
//                 <b>Order:</b> {receipt.order_id}
//               </p>
//               <p>
//                 <b>Transaction:</b> {receipt.txn_id}
//               </p>
//               <p>
//                 <b>Method:</b> {receipt.payment_method}
//               </p>
//               <p>
//                 <b>Amount:</b> ₹{receipt.amount}
//               </p>

//               {receipt.payment_proof && (
//                 <img
//                   src={receipt.payment_proof}
//                   className="rounded-xl mt-4 border"
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </AdminLayout>
//   );
// }

import { useState, useEffect, useMemo } from "react";
import { Search, ArrowLeft, FileText, Download, X } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { errorAlert } from "../../utils/alert";

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
                <td colSpan="7" className="p-6 text-center text-gray-500">
                  Loading...
                </td>
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
