export default function JobCard({ job, onApply }) {
  return (
    <div className="bg-white rounded-2xl border border-pink-100 p-5 flex gap-4 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-50 transition-all cursor-pointer group">
      <div className={`${job.bg} w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 relative`}>
        {job.icon}
        {job.live && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" title="Live Recruitment"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900 text-lg mb-0">{job.title}</p>
            {job.live && <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest animate-pulse">Live Now</span>}
          </div>
          <span className="text-sm font-bold text-pink-700 bg-pink-50 px-3 py-1 rounded-full font-numeric">{job.salary}</span>
        </div>
        <p className="text-sm text-gray-500 mb-3">{job.company} · <span className="text-teal-600 font-medium">{job.location}</span></p>
        
        <div className="flex items-center gap-3 mb-4">
           <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 flex items-center gap-1">
             👩‍💼 {job.women_count} women applied
           </span>
           {job.appliedRecent && (
             <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full flex items-center gap-1 animate-bounce">
               🔥 {job.appliedRecent} applied recently
             </span>
           )}
           {job.activeViewers && (
             <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center gap-1">
               👥 {job.activeViewers} viewing
             </span>
           )}
           <span className="text-xs text-gray-400 ml-auto">⏱ {job.type}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag, ti) => (
            <span key={ti} className={`text-xs font-medium px-2.5 py-1 rounded-full ${job.tColors[ti]}`}>{tag}</span>
          ))}
        </div>

        {job.reviews && job.reviews.length > 0 && (
          <div className="mt-4 pt-3 border-t border-pink-50">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Reviews Written by Women</p>
            <div className="flex flex-col gap-2">
              {job.reviews.map((rev, ri) => (
                <div key={ri} className="flex gap-2 items-start">
                  <span className="text-pink-400 text-lg leading-none font-serif">"</span>
                  <p className="text-xs text-gray-600 italic leading-relaxed">{rev}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col justify-end flex-shrink-0">
        <button
          onClick={(e) => { e.stopPropagation(); onApply(job); }}
          className="bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all border-0 cursor-pointer shadow-lg shadow-pink-900/20 active:scale-95">
          Apply Now
        </button>
      </div>
    </div>
  );
}
