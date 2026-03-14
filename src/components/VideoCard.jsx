export default function VideoCard({ video, onPlay }) {
  return (
    <div onClick={() => onPlay(video.title)}
      className="bg-white rounded-2xl border border-pink-100 overflow-hidden cursor-pointer hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-pink-50 transition-all duration-200 group">
      <div className={`${video.bg} h-44 flex items-center justify-center text-5xl relative`}>
        {video.icon}
        {video.live && (
          <div className="absolute top-3 left-3 bg-red-600 text-[10px] font-bold text-white px-2 py-0.5 rounded-sm animate-pulse">LIVE</div>
        )}
        <div className="absolute bottom-3 right-3 w-11 h-11 bg-white/90 rounded-full flex items-center justify-center text-sm shadow-md group-hover:scale-110 transition-all">▶</div>
      </div>
      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-pink-600 mb-1.5">{video.cat}</p>
        <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2">{video.title}</h3>
        <p className="text-xs text-gray-400">{video.meta}</p>
      </div>
    </div>
  );
}
