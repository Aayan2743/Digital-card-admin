import { useEffect, useState } from "react";

export default function Loader({ show, text = "Loading..." }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (show) {
      // show loader only if loading takes > 300ms
      timer = setTimeout(() => setVisible(true), 300);
    } else {
      setVisible(false);
    }

    return () => clearTimeout(timer);
  }, [show]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 rounded-full bg-white shadow-lg flex items-center justify-center">
          <img
            src="/logo.jpeg"
            alt="Loading"
            className="h-10 w-10 object-contain animate-spin"
          />
        </div>

        <p className="mt-3 text-white text-sm tracking-wide">{text}</p>
      </div>
    </div>
  );
}
