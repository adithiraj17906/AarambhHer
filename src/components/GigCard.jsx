export default function GigCard({ gig, onAccept }) {
  return (
    <div
      className="bg-white rounded-2xl border border-pink-100 p-5 flex gap-4 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-50 transition-all cursor-pointer group">
      <div className={`${gig.bg} w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 relative`}>
        {gig.icon}
        {gig.live && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" title="Active Gig"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900 text-lg mb-0">{gig.title}</p>
            {gig.live && <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest animate-pulse">Active Now</span>}
          </div>
          <span className="text-sm font-bold text-pink-700 bg-pink-50 px-3 py-1 rounded-full font-numeric">{gig.pay}</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">{gig.location} · <span className="text-teal-600 font-medium font-numeric">⏱ {gig.time}</span></p>
        
        <div className="flex items-center gap-3 mb-4">
           <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 flex items-center gap-1 font-numeric">
             👩‍🔧 {gig.women_count} women did this
           </span>
           {gig.appliedRecent && (
             <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full flex items-center gap-1 animate-bounce">
               🔥 {gig.appliedRecent} accepted today
             </span>
           )}
           {gig.activeViewers && (
             <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center gap-1">
               👥 {gig.activeViewers} viewing near you
             </span>
           )}
           <span className="text-xs text-gray-400 font-numeric ml-auto">📍 {gig.dist} away</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {gig.tags.map((tag, ti) => (
            <span key={ti} className={`text-xs font-medium px-2.5 py-1 rounded-full ${gig.tColors[ti]}`}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-end flex-shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onAccept(gig.title); }}
          className="bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all border-0 cursor-pointer shadow-lg shadow-pink-900/20 active:scale-95">
          Quick Accept
        </button>
      </div>
    </div>
  );
}
