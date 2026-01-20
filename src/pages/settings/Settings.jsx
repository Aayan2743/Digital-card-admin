import { User, Palette, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import api from "../../services/api";
import { successAlert, errorAlert } from "../../utils/alert";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  // Profile state
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Branding (future use)
  const [logoPreview, setLogoPreview] = useState(null);
  const [brandName, setBrandName] = useState("");

  const tabs = [
    { key: "profile", label: "Profile", icon: User },
    { key: "branding", label: "Branding", icon: Palette },
    { key: "pricing", label: "Card Pricing", icon: IndianRupee },
  ];

  /* ======================
     FETCH PROFILE
  ====================== */
  useEffect(() => {
    setProfileLoading(true);

    api
      .get("/profile")
      .then((res) => {
        setName(res.data.user.name);
        setEmail(res.data.user.email);
      })
      .catch(() => {
        errorAlert("Error", "Failed to load profile");
      })
      .finally(() => {
        setProfileLoading(false);
      });
  }, []);

  /* ======================
     SAVE PROFILE
  ====================== */
  const handleProfileSave = async () => {
    if (password && password !== confirmPassword) {
      errorAlert("Validation Error", "Passwords do not match");
      return;
    }

    setSaving(true);

    try {
      await api.post("/settings/profile", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      successAlert("Profile Updated", "Profile updated successfully");
      setPassword("");
      setConfirmPassword("");
    } catch (e) {
      errorAlert(
        "Update Failed",
        e.response?.data?.message || "Something went wrong",
      );
    } finally {
      setSaving(false);
    }
  };

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
              {profileLoading ? (
                <ProfileSkeleton />
              ) : (
                <>
                  <h3 className="text-lg font-semibold mb-1">
                    Profile Settings
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Update your personal details and password
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Admin Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                      label="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                      label="New Password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      label="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <PrimaryButton
                    className="mt-8"
                    onClick={handleProfileSave}
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Profile"}
                  </PrimaryButton>
                </>
              )}
            </section>
          )}

          {/* BRANDING (UI only for now) */}
          {activeTab === "branding" && (
            <section>
              <h3 className="text-lg font-semibold mb-1">Branding</h3>
              <p className="text-sm text-slate-500 mb-6">
                Customize your organization branding
              </p>

              <Input
                label="Brand Name"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </section>
          )}

          {/* PRICING (UI only for now) */}
          {activeTab === "pricing" && (
            <section>
              <h3 className="text-lg font-semibold mb-1">Card Pricing</h3>
              <p className="text-sm text-slate-500 mb-6">
                Configure pricing per digital card
              </p>

              <Input label="Price per card (₹)" type="number" />
              <Input label="Minimum cards" type="number" />
            </section>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

/* ======================
   REUSABLE COMPONENTS
====================== */

function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-300 px-4 py-2.5
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center
        px-6 py-2.5 rounded-xl
        bg-indigo-600 text-white text-sm font-semibold
        hover:bg-indigo-700 transition shadow
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function ProfileSkeleton() {
  return (
    <>
      <div className="h-6 w-48 bg-slate-200 rounded mb-2 animate-pulse" />
      <div className="h-4 w-72 bg-slate-200 rounded mb-6 animate-pulse" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <div className="h-4 w-24 bg-slate-200 rounded mb-2 animate-pulse" />
            <div className="h-11 bg-slate-200 rounded-xl animate-pulse" />
          </div>
        ))}
      </div>

      <div className="h-10 w-36 bg-slate-200 rounded-xl mt-8 animate-pulse" />
    </>
  );
}
