// import { useState } from "react";
// const PRICE = 49;

// export default function CardManager({ onAdd }) {
//   const [cards, setCards] = useState(10);
//   const [days, setDays] = useState(30);

//   const add = () => {
//     onAdd({
//       id: Date.now(),
//       cards,
//       days,
//       amount: cards * PRICE,
//       date: new Date().toDateString(),
//     });
//   };

//   return (
//     <div className="mb-4">
//       <input
//         className="border w-full p-2 mb-2"
//         type="number"
//         value={cards}
//         onChange={(e) => setCards(+e.target.value)}
//       />
//       <input
//         className="border w-full p-2 mb-2"
//         type="number"
//         value={days}
//         onChange={(e) => setDays(+e.target.value)}
//       />
//       <div className="bg-gray-100 p-2 mb-2">Amount: ₹{cards * PRICE}</div>
//       <button className="bg-indigo-600 text-white w-full py-2" onClick={add}>
//         Add Cards
//       </button>
//     </div>
//   );
// }

import { useState } from "react";
import api from "../../../services/api";
import { errorAlert, successAlert } from "../../../utils/alert";


const PRICE = 49;

export default function CardManager({
  organizationId, // REQUIRED
  onSuccess, // OPTIONAL: refresh org data
}) {
  const [cards, setCards] = useState(10);
  const [days, setDays] = useState(30); // UI only
  const [loading, setLoading] = useState(false);

  const amount = cards * PRICE;

  const add = async () => {
    if (!organizationId) {
      errorAlert("Error", "Organization not selected");
      return;
    }

    if (cards < 1) {
      errorAlert("Invalid", "Card count must be at least 1");
      return;
    }

    try {
      setLoading(true);

      await api.post(`/organizations/${organizationId}/add-cards`, {
        total_cards: cards,
        price: amount,
      });

      successAlert("Success", "Cards added successfully");

      // reset (optional)
      setCards(10);
      setDays(30);

      // refresh parent data
      if (onSuccess) {
        onSuccess();
      }
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
    <div className="mb-4 bg-white rounded-xl border p-4 space-y-3">
      {/* Number of Cards */}
      <input
        className="border w-full p-2 rounded"
        type="number"
        min={1}
        value={cards}
        onChange={(e) => setCards(Number(e.target.value))}
        placeholder="Number of cards"
      />

      {/* Validity Days (UI only) */}
      <input
        className="border w-full p-2 rounded bg-gray-100"
        type="number"
        value={days}
        disabled
        placeholder="Validity (days)"
      />

      {/* Amount */}
      <div className="bg-gray-100 p-2 rounded text-sm">
        Amount: <strong>₹{amount}</strong>
      </div>

      {/* Submit */}
      <button
        onClick={add}
        disabled={loading}
        className={`w-full py-2 rounded text-white font-medium
          ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
      >
        {loading ? "Adding..." : "Add Cards"}
      </button>
    </div>
  );
}
