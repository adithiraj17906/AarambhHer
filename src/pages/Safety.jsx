import { useState } from 'react';

export default function Safety({ toast }) {
  const [form, setForm] = useState({ name:"", company:"", type:"", desc:"" });

  const resources = [
    { icon:"⚖️", bg:"bg-pink-50",   title:"Know Your Legal Rights",    desc:"POSH Act, Maternity Benefits, Equal Pay Act — laws that protect you" },
    { icon:"💬", bg:"bg-teal-50",   title:"Free Counseling Support",    desc:"Connect with certified counselors specialising in workplace trauma" },
    { icon:"🏛️", bg:"bg-blue-50",  title:"Government Schemes",         desc:"PM Rojgar Yojana, Mahila Shakti Kendra — find schemes you qualify for" },
    { icon:"🤝", bg:"bg-violet-50", title:"Local Support Network",      desc:"Find women's self-help groups, NGOs, and networks near you" },
    { icon:"📋", bg:"bg-amber-50",  title:"Workplace Safety Checklist", desc:"Evaluate your workplace with our comprehensive safety assessment tool" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 fade-in">
      <div className="mb-7">
        <h2 className="font-display text-3xl font-bold text-gray-900 mb-1">Safety Center</h2>
        <p className="text-gray-500 text-sm">Your safety is our priority — report, access resources, and stay protected</p>
      </div>

      {/* Emergency banner */}
      <div className="bg-gradient-to-r from-pink-900 to-rose-800 rounded-2xl p-5 flex items-center gap-4 mb-7">
        <span className="text-4xl flex-shrink-0">🚨</span>
        <div className="flex-1">
          <h3 className="font-display text-lg font-bold text-white mb-0.5">Emergency Helpline</h3>
          <p className="text-white/75 text-sm">If you are in immediate danger or facing workplace harassment, contact support now</p>
        </div>
        <button onClick={() => toast("Connecting to Women Helpline: 1091…")}
          className="bg-white text-pink-900 font-bold text-sm px-6 py-3 rounded-full hover:bg-pink-50 transition-all flex-shrink-0 border-0 cursor-pointer shadow-lg">
          Call 1091 Now
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Report form */}
        <div className="bg-white rounded-2xl border border-pink-100 p-7">
          <h3 className="font-display text-xl font-semibold text-gray-900 mb-5">🚩 Report Unsafe Workplace</h3>

          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Your Name (optional)</label>
          <input value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Remains confidential"
            className="w-full border border-pink-100 rounded-xl px-4 py-2.5 text-sm bg-rose-50/40 text-gray-800 outline-none focus:border-pink-400 transition-all mb-4 placeholder-gray-300" />

          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Company / Employer Name</label>
          <input value={form.company} onChange={e => setForm({...form, company:e.target.value})} placeholder="Name of company or employer"
            className="w-full border border-pink-100 rounded-xl px-4 py-2.5 text-sm bg-rose-50/40 text-gray-800 outline-none focus:border-pink-400 transition-all mb-4 placeholder-gray-300" />

          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Type of Concern</label>
          <select value={form.type} onChange={e => setForm({...form, type:e.target.value})}
            className="w-full border border-pink-100 rounded-xl px-4 py-2.5 text-sm bg-rose-50/40 text-gray-800 outline-none focus:border-pink-400 transition-all mb-4">
            <option value="">Select incident type</option>
            <option>Harassment or discrimination</option>
            <option>Unsafe working conditions</option>
            <option>Wage theft or non-payment</option>
            <option>Forced overtime</option>
            <option>Other</option>
          </select>

          <label className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1.5">Describe the Situation</label>
          <textarea value={form.desc} onChange={e => setForm({...form, desc:e.target.value})} rows={4}
            placeholder="Tell us what happened. Your report is confidential and helps protect other women."
            className="w-full border border-pink-100 rounded-xl px-4 py-2.5 text-sm bg-rose-50/40 text-gray-800 outline-none focus:border-pink-400 transition-all mb-5 resize-none placeholder-gray-300" />

          <button
            onClick={() => { toast("Report submitted securely. A counselor will reach out within 24 hours 🔒"); setForm({name:"",company:"",type:"",desc:""}); }}
            className="w-full bg-pink-700 hover:bg-pink-800 text-white font-semibold py-3 rounded-full text-sm transition-all border-0 cursor-pointer">
            Submit Report Securely 🔒
          </button>
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-3">
          {resources.map((r, i) => (
            <div key={i} className="bg-white rounded-xl border border-pink-100 p-4 flex gap-3 cursor-pointer hover:border-pink-300 hover:shadow-lg hover:shadow-pink-50 transition-all">
              <div className={`${r.bg} w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0`}>{r.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-900 text-sm mb-0.5">{r.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
