import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { branding } = useAuth();

  return (
    <p className="text-center text-xs text-white/70 mt-6">
      © {new Date().getFullYear()}{" "}
      {branding?.brand_name || "Brand Crest Digital"}. All rights reserved.
    </p>
  );
}
