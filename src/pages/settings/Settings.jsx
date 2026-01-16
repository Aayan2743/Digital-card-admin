import { useState } from "react";
import { User, Palette, IndianRupee } from "lucide-react";
import AdminLayout from "../../components/layout/AdminLayout";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [logoPreview, setLogoPreview] = useState(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const tabs = [
    { key: "profile", label: "Profile", icon: User },
    { key: "branding", label: "Branding", icon: Palette },
    { key: "pricing", label: "Card Pricing", icon: IndianRupee },
  ];

  return (
    <AdminLayout>
      {/* PAGE HEADER */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-slate-800">Settings</h2>
        <p className="text-slate-500">
          Manage your account and application preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SIDEBAR */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2
                  text-sm font-medium transition
                  ${
                    activeTab === tab.key
                      ? "bg-indigo-600 text-white shadow"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* CONTENT */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm p-8">
          {/* PROFILE */}
          {activeTab === "profile" && (
            <section>
              <h3 className="text-lg font-semibold mb-1">Profile Settings</h3>
              <p className="text-sm text-slate-500 mb-6">
                Update your personal details and password
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Admin Name" placeholder="Your name" />
                <Input label="Email Address" placeholder="you@email.com" />
                <Input
                  label="New Password"
                  type="password"
                  placeholder="••••••••"
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                />
              </div>

              <PrimaryButton className="mt-8">Save Profile</PrimaryButton>
            </section>
          )}

          {/* BRANDING */}
          {activeTab === "branding" && (
            <section>
              <h3 className="text-lg font-semibold mb-1">Branding</h3>
              <p className="text-sm text-slate-500 mb-6">
                Customize your organization branding
              </p>

              <div className="flex items-center gap-6">
                <div
                  className="h-24 w-24 rounded-xl border bg-slate-50
                                flex items-center justify-center overflow-hidden"
                >
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo Preview"
                      className="h-full object-contain"
                    />
                  ) : (
                    <span className="text-slate-400 text-xs">No Logo</span>
                  )}
                </div>

                <label
                  className="cursor-pointer px-5 py-2.5 rounded-xl
                                  bg-slate-900 text-white text-sm font-medium
                                  hover:bg-slate-800 transition"
                >
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="text-sm text-slate-500 mt-4">
                Recommended: 200×200 PNG or SVG
              </p>

              <PrimaryButton className="mt-8">Save Branding</PrimaryButton>
            </section>
          )}

          {/* PRICING */}
          {activeTab === "pricing" && (
            <section>
              <h3 className="text-lg font-semibold mb-1">Card Pricing</h3>
              <p className="text-sm text-slate-500 mb-6">
                Configure pricing per digital card
              </p>

              <div className="max-w-sm space-y-4">
                <Input
                  label="Price per card (₹)"
                  type="number"
                  placeholder="49"
                />
                <Input label="Minimum cards" type="number" placeholder="10" />
              </div>

              <PrimaryButton className="mt-8">Save Pricing</PrimaryButton>
            </section>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

/* =====================
   REUSABLE UI PARTS
===================== */

function Input({ label, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-2.5
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>
  );
}

function PrimaryButton({ children, className = "" }) {
  return (
    <button
      className={`inline-flex items-center justify-center
                  px-6 py-2.5 rounded-xl
                  bg-indigo-600 text-white text-sm font-semibold
                  hover:bg-indigo-700 transition shadow
                  ${className}`}
    >
      {children}
    </button>
  );
}
