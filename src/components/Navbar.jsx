import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const links = [
    { id: "/",        label: "Home" },
    { id: "/jobs",    label: "Jobs" },
    { id: "/advisor", label: "AI Advisor" },
    { id: "/learn",   label: "Learn" },
    { id: "/safety",  label: "Safety" },
  ];

  return (
    <nav className="bg-gray-900 sticky top-0 z-40 flex items-center justify-between px-6 h-16 shadow-xl">
      <span className="font-display text-2xl font-bold text-white tracking-tight select-none cursor-pointer" onClick={() => navigate("/")}>
        Aarambh<span className="text-pink-300">Her</span>
      </span>
      <ul className="flex items-center gap-1 list-none m-0 p-0">
        {links.map(l => (
          <li key={l.id}>
            <NavLink to={l.id}
              className={({ isActive }) => `text-sm font-medium px-3 py-2 rounded-lg transition-all border-0 cursor-pointer ${isActive ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/10 bg-transparent"}`}>
              {l.label}
            </NavLink>
          </li>
        ))}
        <li>
          {user ? (
            <div className="flex items-center gap-3 ml-4 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-xs font-bold text-white uppercase">{user.name.charAt(0)}</div>
              <span className="text-xs text-white/80 font-medium hidden md:block">{user.name}</span>
              <button 
                onClick={() => { setUser(null); navigate("/"); }}
                className="text-[10px] font-bold uppercase text-white/40 hover:text-white ml-2 bg-transparent border-0 cursor-pointer transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={() => navigate("/login")}
              className="ml-2 bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold px-5 py-2 rounded-full transition-all border-0 cursor-pointer">
              Login
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
}
