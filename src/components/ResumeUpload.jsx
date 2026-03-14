import { useState, useRef } from 'react';

export default function ResumeUpload({ onUpload }) {
  const [uploaded, setUploaded] = useState(false);
  const fileRef = useRef(null);

  const handleUpload = () => {
    setUploaded(true);
    if (onUpload) {
      onUpload();
    }
  };

  return (
    <div>
      <div onClick={() => fileRef.current.click()}
        className="border-2 border-dashed border-pink-200 hover:border-pink-500 bg-white hover:bg-pink-50/30 rounded-2xl p-14 text-center cursor-pointer transition-all group">
        <div className="text-6xl mb-4">{uploaded ? "✅" : "📄"}</div>
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">{uploaded ? "Resume Uploaded!" : "Drop your resume here"}</h3>
        <p className="text-sm text-gray-400 leading-relaxed mb-7">PDF or DOCX · Max 5MB<br />Our AI analyzes your resume in seconds and gives personalized suggestions.</p>
        <span className="inline-block bg-pink-700 group-hover:bg-pink-800 text-white font-semibold px-7 py-2.5 rounded-full text-sm transition-all">
          {uploaded ? "Upload Another" : "Choose File"}
        </span>
      </div>
      <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUpload} />

      <div className="mt-4 bg-white rounded-2xl border border-pink-100 p-5">
        <h4 className="font-semibold text-gray-900 text-sm mb-3">💡 What we analyze</h4>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {["ATS compatibility","Action verbs used","Quantifiable results","Skills relevance","Formatting clarity","Length optimization"].map(item => (
            <span key={item} className="text-xs text-gray-500 flex items-center gap-1">✓ {item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
