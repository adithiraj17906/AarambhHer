export default function Toast({ msg, show }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-gray-900 text-white text-sm px-5 py-3 rounded-2xl shadow-2xl max-w-xs transition-all duration-300 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"}`}>
      {msg}
    </div>
  );
}
