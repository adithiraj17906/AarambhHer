import ResumeUpload from '../components/ResumeUpload';

export default function Resume({ toast }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 fade-in">
      <div className="mb-7">
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-1">Resume Analyzer</h2>
        <p className="text-gray-500 text-sm">Upload your resume for instant AI feedback and improvement suggestions</p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* Upload component */}
        <ResumeUpload onUpload={() => toast("Resume uploaded! AI analysis complete ✓")} />

        {/* Analysis result */}
        <div className="bg-white rounded-2xl border border-pink-100 p-7">
          {/* Score circle */}
          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto mb-4">
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{transform:"rotate(-90deg)"}}>
                <circle cx="50" cy="50" r="42" fill="none" stroke="#FCE4EC" strokeWidth="9" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#C2185B" strokeWidth="9"
                  strokeDasharray={`${(75/100)*263.9} 263.9`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-4xl font-bold text-pink-700 leading-none">75</span>
                <span className="text-xs text-gray-400 mt-0.5">/ 100</span>
              </div>
            </div>
            <h3 className="font-display text-lg font-semibold text-gray-900">Good Resume — Room to Grow</h3>
            <p className="text-xs text-gray-400 mt-1">Sample analysis · Upload yours for personalized results</p>
          </div>

          <div className="mb-5">
            <h4 className="font-semibold text-sm text-gray-900 mb-2">✅ Strengths</h4>
            {["Clear work experience timeline with relevant job titles","Education section is well-formatted and easy to read","Contact information is complete and professional"].map((s, i) => (
              <div key={i} className="flex gap-2 py-2.5 border-b border-pink-50 last:border-0 text-sm text-gray-600 leading-snug">
                <span className="flex-shrink-0">🟢</span>{s}
              </div>
            ))}
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-900 mb-2">⚡ Improvements Needed</h4>
            {[["🔴","Add 3–5 quantifiable achievements (e.g., increased sales by 30%)"],["🟡","Include more industry-specific keywords for ATS optimization"],["🟡","Skills section needs expansion — add technical tools you have used"],["🔴","Professional summary is missing — add a 2–3 line objective statement"]].map(([dot,text], i) => (
              <div key={i} className="flex gap-2 py-2.5 border-b border-pink-50 last:border-0 text-sm text-gray-600 leading-snug">
                <span className="flex-shrink-0">{dot}</span>{text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
