export default function Loader({ show, text = "Loading..." }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Logo */}
        <div className="h-20 w-20 rounded-full bg-white shadow-xl flex items-center justify-center animate-pulse">
          <img
            src="/logo.jpeg"
            alt="Loading"
            className="h-12 w-12 object-contain animate-spin-slow"
          />
        </div>

        {/* Text */}
        <p className="mt-4 text-white text-sm tracking-wide animate-fade">
          {text}
        </p>
      </div>
    </div>
  );
}
