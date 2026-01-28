import { User, Palette, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import api from "../../services/api";
import { successAlert, errorAlert } from "../../utils/alert";
import { useAuth } from "../../context/AuthContext";

import Loader from "../../components/Loader";
import { setFavicon, resetFavicon } from "../../utils/favicon";

export default function Settings() {
  const { user, branding, cardPricing } = useAuth();

  const [activeTab, setActiveTab] = useState("profile");

  const [loading, setLoading] = useState(false);

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
  const [faviconPreview, setFaviconPreview] = useState(null);

  const [logoFile, setLogoFile] = useState(null);
  const [faviconFile, setFaviconFile] = useState(null);

  const [cardAmount, setCardAmount] = useState("");
  const [minCard, setMinCard] = useState("");

  const tabs = [
    { key: "profile", label: "Profile", icon: User },
    { key: "branding", label: "Branding", icon: Palette },
    { key: "pricing", label: "Card Pricing", icon: IndianRupee },
  ];

  /* ======================
     FETCH PROFILE
  ====================== */
  useEffect(() => {
    if (!user) return;

    setName(user.name || "");
    setEmail(user.email || "");
    setProfileLoading(false);
  }, [user]);

  useEffect(() => {
    if (!branding) return;

    setBrandName(branding.brand_name || "");
    setLogoPreview(branding.logo || null);
    setFaviconPreview(branding.favicon || null);

    if (branding.favicon) {
      setFavicon(branding.favicon);
    }
  }, [branding]);

  useEffect(() => {
    if (!cardPricing) return;

    setCardAmount(cardPricing.card_amount || "");
    setMinCard(cardPricing.min_card || "");
  }, [cardPricing]);

  /* ======================
     SAVE PROFILE
  ====================== */
  const handleProfileSave = async () => {
    if (password && password !== confirmPassword) {
      errorAlert("Validation Error", "Passwords do not match");
      return;
    }
    setLoading(true);

    setSaving(true);

    try {
      await api.post("/settings/profile", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      successAlert("Profile Updated", "Profile updated successfully");

      const updatedUser = { ...user, name, email };
      localStorage.setItem("admin_user", JSON.stringify(updatedUser));
      setPassword("");
      setConfirmPassword("");
    } catch (e) {
      errorAlert(
        "Update Failed",
        e.response?.data?.message || "Something went wrong",
      );
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  const handleSaveBranding = async () => {
    try {
      setSaving(true);
      setLoading(true);

      const formData = new FormData();
      formData.append("brand_name", brandName);

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      if (faviconFile) {
        formData.append("favicon", faviconFile);
      }

      await api.post("/settings/brand", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      successAlert("Saved", "Branding updated successfully");

      // 🔄 Refresh branding after save
      // fetchBranding();

      const res = await api.get("/public/settings/brand");
      localStorage.setItem("branding", JSON.stringify(res.data.data));

      setBrandName(res.data.data.brand_name || "");
      setLogoPreview(res.data.data.logo || null);
      setFaviconPreview(res.data.data.favicon || null);

      if (res.data.data.favicon) {
        setFavicon(res.data.data.favicon);
      }
    } catch (error) {
      errorAlert(
        "Failed",
        error.response?.data?.message || "Unable to save branding",
      );
    } finally {
      setSaving(false);
      setLoading(false);
    }
  };

  const fetchBranding = async () => {
    try {
      // setLoading(true);

      const res = await api.get("/settings/brand");

      const data = res.data.data;

      setBrandName(data?.brand_name || "");
      setLogoPreview(data?.logo || null);
      setFaviconPreview(data?.favicon || null);

      if (data?.favicon) {
        setFavicon(data.favicon);
      }
    } catch (error) {
      errorAlert("Error", "Failed to load branding");
    } finally {
      // setLoading(false);
    }
  };

  // const fetchCardPricing = async () => {
  //   try {
  //     // setLoading(true);

  //     const res = await api.get("/settings/card-pricing");

  //     if (res.data.data) {
  //       setCardAmount(res.data.data.card_amount || "");
  //       setMinCard(res.data.data.min_card || "");
  //     }
  //   } catch (error) {
  //     errorAlert("Error", "Failed to load card pricing");
  //   } finally {
  //     // setLoading(false);
  //   }
  // };

  const handleSavePricing = async () => {
    try {
      setSaving(true);

      await api.post("/settings/card-pricing", {
        card_amount: cardAmount,
        min_card: minCard,
      });

      successAlert("Saved", "Card pricing updated successfully");
      const updatedPricing = {
        card_amount: cardAmount,
        min_card: minCard,
      };

      localStorage.setItem("card_pricing", JSON.stringify(updatedPricing));
    } catch (error) {
      errorAlert(
        "Failed",
        error.response?.data?.message || "Unable to save pricing",
      );
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!faviconPreview) return;

    let link =
      document.querySelector("link[rel~='icon']") ||
      document.createElement("link");

    link.rel = "icon";
    link.href = faviconPreview;
    document.head.appendChild(link);
  }, [faviconPreview]);

  // useEffect(() => {
  //   if (activeTab === "branding") {
  //     fetchBranding();
  //   }
  // }, [activeTab]);

  // useEffect(() => {
  //   if (activeTab === "pricing") {
  //     fetchCardPricing();
  //   }
  // }, [activeTab]);

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
          <Loader show={loading} text="Profile Loading..." />

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
            <section className="space-y-8">
              {/* Header */}
              <div>
                <h3 className="text-lg font-semibold">Branding</h3>
                <p className="text-sm text-slate-500">
                  Customize your organization branding
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* -------- Brand Logo Card -------- */}
                <div className="rounded-xl border bg-white p-5">
                  <h4 className="font-medium mb-4">Brand Logo</h4>

                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-lg border border-dashed flex items-center justify-center overflow-hidden bg-slate-50">
                      {logoPreview ? (
                        <img
                          src={logoPreview}
                          alt="Brand Logo"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-slate-400">No Logo</span>
                      )}
                    </div>

                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setLogoFile(file);
                          setLogoPreview(URL.createObjectURL(file));
                        }}
                      />
                      <span className="px-4 py-2 text-sm rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white">
                        Upload Logo
                      </span>
                    </label>
                  </div>
                </div>

                {/* -------- Favicon Card -------- */}
                <div className="rounded-xl border bg-white p-5">
                  <h4 className="font-medium mb-4">Favicon</h4>

                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded border border-dashed flex items-center justify-center overflow-hidden bg-slate-50">
                      {faviconPreview ? (
                        <img
                          src={faviconPreview}
                          alt="Favicon"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-[10px] text-slate-400">
                          Default
                        </span>
                      )}
                    </div>

                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".ico,image/png,image/svg+xml"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (!file) return;
                          setFaviconFile(file);
                          setFaviconPreview(URL.createObjectURL(file));
                        }}
                      />
                      <span className="px-4 py-2 text-sm rounded-lg bg-slate-800 hover:bg-slate-900 text-white">
                        Upload Favicon
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        resetFavicon();
                        setFaviconPreview(null);
                        setFaviconFile(null);
                      }}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Restore default
                    </button>

                    <span className="text-xs text-slate-400">
                      32×32 PNG or ICO
                    </span>
                  </div>
                </div>
              </div>

              {/* -------- Brand Name -------- */}
              <div className="max-w-xl">
                <Input
                  label="Brand Name"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                />
              </div>

              {/* -------- Save Action -------- */}
              <div className="flex justify-end border-t pt-6">
                <button
                  type="button"
                  onClick={handleSaveBranding}
                  disabled={saving}
                  className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2
          ${
            saving
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white`}
                >
                  {saving && (
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {saving ? "Saving..." : "Save Branding"}
                </button>
              </div>
            </section>
          )}

          {/* PRICING (UI only for now) */}
          {activeTab === "pricing" && (
            <section className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">Card Pricing</h3>
                <p className="text-sm text-slate-500">
                  Configure pricing per digital card
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                <Input
                  label="Price per card (₹)"
                  type="number"
                  value={cardAmount}
                  onChange={(e) => setCardAmount(e.target.value)}
                />

                <Input
                  label="Minimum cards"
                  type="number"
                  value={minCard}
                  onChange={(e) => setMinCard(e.target.value)}
                />
              </div>

              <div className="flex justify-end border-t pt-6">
                <button
                  type="button"
                  onClick={handleSavePricing}
                  disabled={saving}
                  className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2
          ${
            saving
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          } text-white`}
                >
                  {saving && (
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {saving ? "Saving..." : "Save Pricing"}
                </button>
              </div>
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
