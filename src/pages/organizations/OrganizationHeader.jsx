import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function OrganizationHeader({ organization }) {
  const navigate = useNavigate();

  return (
    <>
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

        {/* ORG CARD */}
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
    </>
  );
}
