import { useState } from 'react';
import VideoCard from '../components/VideoCard';
import { videoData } from '../data/mockData';

export default function Learn({ toast }) {
  const [topic, setTopic] = useState("All Topics");
  const topics = ["All Topics","Tech Skills","Business","Design","Healthcare","Soft Skills","Finance","Stitching","Cooking","Vocational"];
  const filtered = topic === "All Topics" ? videoData : videoData.filter(v => v.cat === topic);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 fade-in">
      <div className="mb-5">
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-1">Learning Hub</h2>
        <p className="text-gray-500 text-sm">AI-curated courses to accelerate your career growth</p>
      </div>
      <div className="flex flex-wrap gap-2 mb-8">
        {topics.map(t => (
          <button key={t} onClick={() => setTopic(t)}
            className={`text-sm font-medium px-4 py-1.5 rounded-full border cursor-pointer transition-all ${topic === t ? "bg-pink-700 text-white border-pink-700" : "bg-white text-gray-600 border-pink-100 hover:border-pink-300"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-5">
        {(filtered.length ? filtered : videoData).map((v, i) => (
          <VideoCard key={i} video={v} onPlay={(title) => toast(`Opening: ${title}`)} />
        ))}
      </div>
    </div>
  );
}
