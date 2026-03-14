import Chatbot from '../components/Chatbot';

export default function Advisor() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 fade-in">
      <div className="mb-7">
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-1">AI Skill Advisor</h2>
        <p className="text-gray-500 text-sm">Your personal career guide — ask anything about skills, careers, or opportunities</p>
      </div>
      <div className="flex gap-6 items-start">
        {/* Chat window */}
        <Chatbot />

        {/* Side panel */}
        <div className="w-80 flex-shrink-0 flex flex-col gap-4">
          {/* Skill bars */}
          <div className="bg-white rounded-2xl border border-pink-100 p-5">
            <h4 className="font-semibold text-gray-900 text-sm mb-4">Your Skill Match Score</h4>
            {[["Communication",82],["Digital Literacy",65],["Problem Solving",74],["Leadership",58]].map(([name,val]) => (
              <div key={name} className="mb-3 last:mb-0">
                <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                  <span>{name}</span><span className="font-semibold">{val}%</span>
                </div>
                <div className="h-1.5 bg-pink-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-300 to-pink-700 rounded-full transition-all" style={{width:`${val}%`}} />
                </div>
              </div>
            ))}
          </div>
          {/* Career matches */}
          <div className="bg-white rounded-2xl border border-pink-100 p-5">
            <h4 className="font-semibold text-gray-900 text-sm mb-3">🎯 Top Career Matches</h4>
            {[["UX Researcher","94% match","bg-pink-100 text-pink-800"],["Content Strategist","88% match","bg-teal-100 text-teal-800"],["Product Manager","81% match","bg-amber-100 text-amber-700"]].map(([role,match,cls]) => (
              <div key={role} className="flex justify-between items-center py-2.5 border-b border-pink-50 last:border-0">
                <span className="text-sm text-gray-700">{role}</span>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${cls}`}>{match}</span>
              </div>
            ))}
          </div>
          {/* Next steps */}
          <div className="bg-white rounded-2xl border border-pink-100 p-5">
            <h4 className="font-semibold text-gray-900 text-sm mb-3">📈 Recommended Next Steps</h4>
            {["🎓 Complete Google UX Design Certificate","💼 Add portfolio projects to resume","🤝 Join Women in Tech Hyderabad"].map((s, i) => (
              <div key={i} className="text-xs text-gray-700 px-3 py-2.5 bg-rose-50 rounded-xl mb-2 last:mb-0">{s}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
