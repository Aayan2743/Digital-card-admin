import { useState } from "react";
import {
  X,
  CreditCard,
  Calendar,
  Upload,
  Wallet,
  Smartphone,
} from "lucide-react";
import api from "../../services/api";
import { successAlert, errorAlert } from "../../utils/alert";

const CARD_PRICE = 49;

export default function AddCardsDrawer({ organizationId, onClose, onSuccess }) {
  const [cards, setCards] = useState(10);
  const [days] = useState(30);
  const [paymentType, setPaymentType] = useState("online");
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);

  const amount = cards * CARD_PRICE;

  const save = async () => {
    if (!organizationId)
      return errorAlert("Error", "Organization not selected");
    if (cards < 1)
      return errorAlert("Invalid", "Number of cards must be at least 1");
    if (!proof) return errorAlert("Required", "Upload payment acknowledgement");

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("total_cards", cards);
      fd.append("price", amount);
      fd.append("valid_days", days);
      fd.append("payment_type", paymentType);
      fd.append(
        "payment_method",
        paymentType === "online" ? paymentMethod : "cash",
      );
      fd.append("payment_proof", proof);

      await api.post(
        `/organizations/${organizationId}/add-cards`,
        fd,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      successAlert("Success", "Cards added successfully");
      onSuccess?.();
      onClose();
    } catch (e) {
      errorAlert("Failed", e.response?.data?.message || "Unable to add cards");
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
      <div className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-white z-50 shadow-2xl flex flex-col">
        {/* HEADER */}
        <div className="px-6 py-5 border-b flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold">Add Cards</h3>
            <p className="text-sm text-gray-500">
              Purchase cards for organization
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* STEP 1 */}
          <Section title="Card Quantity">
            <InputWithIcon
              icon={<CreditCard size={18} />}
              type="number"
              value={cards}
              min={1}
              onChange={(e) => setCards(+e.target.value)}
              placeholder="Number of cards"
            />
          </Section>

          {/* STEP 2 */}
          <Section title="Validity">
            <InputWithIcon
              icon={<Calendar size={18} />}
              value={`${days} days`}
              disabled
            />
          </Section>

          {/* STEP 3 */}
          <Section title="Payment Type">
            <div className="grid grid-cols-2 gap-4">
              <RadioCard
                active={paymentType === "online"}
                onClick={() => setPaymentType("online")}
                icon={<Smartphone />}
                title="Online"
                desc="UPI / Card"
              />
              <RadioCard
                active={paymentType === "cash"}
                onClick={() => setPaymentType("cash")}
                icon={<Wallet />}
                title="Cash"
                desc="Offline payment"
              />
            </div>
          </Section>

          {/* STEP 4 */}
          {paymentType === "online" && (
            <Section title="Online Method">
              <div className="flex gap-3">
                <Pill
                  active={paymentMethod === "upi"}
                  onClick={() => setPaymentMethod("upi")}
                >
                  UPI
                </Pill>
                <Pill
                  active={paymentMethod === "card"}
                  onClick={() => setPaymentMethod("card")}
                >
                  Card
                </Pill>
              </div>
            </Section>
          )}

          {/* STEP 5 */}
          <Section title="Payment Proof">
            <label className="block border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:border-indigo-500 transition">
              <Upload className="mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">
                {proof ? proof.name : "Upload payment acknowledgement image"}
              </p>
              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];

                  if (!file) return;

                  if (!file.type.startsWith("image/")) {
                    errorAlert("Invalid file", "Only image files are allowed");
                    return;
                  }

                  if (file.size > 2 * 1024 * 1024) {
                    errorAlert("Too large", "Image must be under 2MB");
                    return;
                  }

                  setProof(file);
                }}
              />
            </label>
          </Section>

          {/* SUMMARY */}
          <div className="bg-gradient-to-br from-indigo-50 to-white border rounded-2xl p-5">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Price per card</span>
              <span>₹{CARD_PRICE}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span className="font-semibold">Total Amount</span>
              <span className="text-2xl font-bold text-indigo-600">
                ₹{amount}
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t flex gap-3">
          <button onClick={onClose} className="w-1/2 py-3 rounded-xl border">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={loading}
            className={`w-1/2 py-3 rounded-xl text-white
            ${loading ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {loading ? "Processing..." : "Confirm Payment"}
          </button>
        </div>
      </div>
    </>
  );
}

/* ---------------- UI HELPERS ---------------- */

function Section({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-3">{title}</h4>
      {children}
    </div>
  );
}

function InputWithIcon({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        {icon}
      </div>
      <input
        {...props}
        className="w-full pl-10 pr-4 py-3 border rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

function RadioCard({ active, icon, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 rounded-xl border transition
      ${
        active
          ? "border-indigo-500 bg-indigo-50 shadow"
          : "border-gray-200 hover:border-indigo-300"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg ${
            active ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-500"
          }`}
        >
          {icon}
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm border
      ${
        active
          ? "bg-indigo-600 text-white border-indigo-600"
          : "bg-white hover:bg-gray-50"
      }`}
    >
      {children}
    </button>
  );
}
