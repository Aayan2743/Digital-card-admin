// import { useState } from "react";
// import { X, CreditCard, Calendar } from "lucide-react";

// const CARD_PRICE = 49;

// export default function AddCardsDrawer({ onClose, onSave }) {
//   const [cards, setCards] = useState(10);
//   const [days, setDays] = useState(30);

//   const amount = cards * CARD_PRICE;

//   const save = () => {
//     onSave({
//       id: Date.now(),
//       date: new Date().toISOString().split("T")[0],
//       cards,
//       days,
//       amount,
//       expiry: new Date(Date.now() + days * 24 * 60 * 60 * 1000)
//         .toISOString()
//         .split("T")[0],
//       status: "Active",
//     });
//     onClose();
//   };

//   return (
//     <>
//       {/* BACKDROP */}
//       <div
//         className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
//         onClick={onClose}
//       />

//       {/* DRAWER */}
//       <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col">
//         {/* HEADER */}
//         <div className="flex items-center justify-between px-6 py-4 border-b">
//           <h3 className="text-lg font-semibold">Add Cards</h3>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-gray-100"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
//           {/* CARDS INPUT */}
//           <div className="space-y-1">
//             <label className="text-sm font-medium text-gray-600">
//               Number of Cards
//             </label>
//             <div className="relative">
//               <CreditCard
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="number"
//                 min={1}
//                 value={cards}
//                 onChange={(e) => setCards(+e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter card quantity"
//               />
//             </div>
//           </div>

//           {/* DAYS INPUT */}
//           <div className="space-y-1">
//             <label className="text-sm font-medium text-gray-600">
//               Validity (Days)
//             </label>
//             <div className="relative">
//               <Calendar
//                 size={18}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               />
//               <input
//                 type="number"
//                 min={1}
//                 value={days}
//                 onChange={(e) => setDays(+e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Enter validity days"
//               />
//             </div>
//           </div>

//           {/* PRICE SUMMARY */}
//           <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-5 space-y-3">
//             <div className="flex justify-between text-sm text-gray-600">
//               <span>Price per card</span>
//               <span>₹{CARD_PRICE}</span>
//             </div>

//             <div className="flex justify-between text-sm text-gray-600">
//               <span>Total cards</span>
//               <span>{cards}</span>
//             </div>

//             <div className="border-t pt-3 flex justify-between items-center">
//               <span className="font-semibold text-gray-800">Total Amount</span>
//               <span className="text-2xl font-bold text-indigo-600">
//                 ₹{amount}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* FOOTER */}
//         <div className="px-6 py-4 border-t flex gap-3">
//           <button
//             onClick={onClose}
//             className="w-1/2 py-3 rounded-xl border text-gray-700 hover:bg-gray-50"
//           >
//             Cancel
//           </button>

//           <button
//             onClick={save}
//             className="w-1/2 py-3 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
//           >
//             Save Cards
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

import { useState } from "react";
import { X, CreditCard, Calendar } from "lucide-react";
import api from "../../services/api";
import { successAlert, errorAlert } from "../../utils/alert";

const CARD_PRICE = 49;

export default function AddCardsDrawer({
  organizationId, // REQUIRED
  onClose,
  onSuccess, // OPTIONAL: refresh parent data
}) {
  const [cards, setCards] = useState(10);
  const [days, setDays] = useState(30); // UI only for now
  const [loading, setLoading] = useState(false);

  const amount = cards * CARD_PRICE;

  const save = async () => {
    if (!organizationId) {
      errorAlert("Error", "Organization not selected");
      return;
    }

    if (cards < 1) {
      errorAlert("Invalid", "Number of cards must be at least 1");
      return;
    }

    try {
      setLoading(true);

      // 🔗 BACKEND API CALL
      await api.post(`/organizations/${organizationId}/add-cards`, {
        total_cards: cards,
        price: amount,
      });

      successAlert("Success", "Cards added successfully");

      // Optional refresh in parent
      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (error) {
      errorAlert(
        "Failed",
        error.response?.data?.message || "Unable to add cards",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">Add Cards</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* NUMBER OF CARDS */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Number of Cards
            </label>
            <div className="relative">
              <CreditCard
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="number"
                min={1}
                value={cards}
                onChange={(e) => setCards(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border rounded-xl
                           focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter card quantity"
              />
            </div>
          </div>

          {/* VALIDITY DAYS (UI ONLY) */}
          <div className="space-y-1 opacity-60">
            <label className="text-sm font-medium text-gray-600">
              Validity (Days)
            </label>
            <div className="relative">
              <Calendar
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="number"
                value={days}
                disabled
                className="w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-100"
              />
            </div>
          </div>

          {/* PRICE SUMMARY */}
          <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Price per card</span>
              <span>₹{CARD_PRICE}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Total cards</span>
              <span>{cards}</span>
            </div>

            <div className="border-t pt-3 flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total Amount</span>
              <span className="text-2xl font-bold text-indigo-600">
                ₹{amount}
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex gap-3">
          <button
            onClick={onClose}
            className="w-1/2 py-3 rounded-xl border text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={loading}
            className={`w-1/2 py-3 rounded-xl text-white shadow-lg
              ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
          >
            {loading ? "Saving..." : "Save Cards"}
          </button>
        </div>
      </div>
    </>
  );
}
