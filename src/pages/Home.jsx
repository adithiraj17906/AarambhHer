import { useNavigate } from 'react-router-dom';
import imgHero from '../assets/home-empowered-woman.jpg';

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🔍", gradient: "from-pink-500 to-rose-600",
      page: "/jobs", title: "AI-Matched Jobs",
      desc: "Our AI finds roles that match your skills, location, and experience — no scrolling needed.",
      stat: "5,200+ Live Jobs", statColor: "text-rose-600",
      cta: "Browse Jobs →"
    },
    {
      icon: "🤖", gradient: "from-violet-500 to-purple-600",
      page: "/advisor", title: "Career AI Advisor",
      desc: "Talk to our multilingual AI advisor in Hindi, Telugu, Tamil, and more to build your career path.",
      stat: "7 Languages Supported", statColor: "text-violet-600",
      cta: "Chat Now →"
    },
    {
      icon: "🎓", gradient: "from-teal-500 to-cyan-600",
      page: "/learn", title: "Skill-Up Faster",
      desc: "AI-curated video courses in tech, finance, design, and soft skills — watch at your own pace.",
      stat: "340+ Free Courses", statColor: "text-teal-600",
      cta: "Start Learning →"
    },
    {
      icon: "🛡️", gradient: "from-amber-500 to-orange-500",
      page: "/safety", title: "Safety First",
      desc: "Report unsafe employers, know your rights, and get support. Every application is trust-verified.",
      stat: "99% Safety Verified", statColor: "text-amber-600",
      cta: "View Safety Tools →"
    },
  ];

  const stats = [
    { num: "15,400+", label: "Women Hired" },
    { num: "5,200+",  label: "Active Jobs" },
    { num: "340+",    label: "Skill Courses" },
    { num: "99%",     label: "Safety Rating" },
  ];

  const jobCategories = [
    { name: "Tech & IT",     icon: "💻" }, { name: "Teaching",   icon: "👩‍🏫" },
    { name: "Healthcare",    icon: "🏥" }, { name: "Finance",    icon: "📊" },
    { name: "Design",        icon: "🎨" }, { name: "Marketing",  icon: "📢" },
    { name: "Customer Care", icon: "📞" }, { name: "HR & Admin", icon: "🗂️" },
    { name: "Internships",   icon: "🌱" }, { name: "Remote",     icon: "🌐" },
  ];

  const testimonials = [
    { name: "Priya S.", role: "Data Analyst · Hyderabad", quote: "AarambhHer matched me with my current job in just 2 days. The AI advisor was incredible!", avatar: "P" },
    { name: "Meena R.", role: "Content Writer · Remote", quote: "As a fresher, I was scared. But the career advisor gave me a plan and now I have an offer letter!", avatar: "M" },
    { name: "Divya K.", role: "UI Designer · Bangalore",  quote: "The safety ratings gave me the confidence to apply. Best platform for women professionals.", avatar: "D" },
  ];

  return (
    <div className="fade-in">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-gray-900 via-purple-950 to-blue-950 py-20 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-pink-600/20 border border-pink-500/40 text-pink-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-7">
              ✦ AI-Powered · Women-First · Safety-Certified
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white leading-tight mb-5">
              Your Career,<br />
              <em className="not-italic text-pink-300">Your Terms.</em>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-9 max-w-xl">
              AarambhHer is India's first AI-driven career platform, built exclusively for women. Discover verified jobs, learn new skills, and grow with confidence.
            </p>
            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              <button onClick={() => navigate("/jobs")}
                className="bg-pink-700 hover:bg-pink-800 text-white font-semibold px-9 py-3.5 rounded-full shadow-lg shadow-pink-900/40 transition-all border-0 cursor-pointer hover:-translate-y-0.5">
                Find a Job →
              </button>
              <button onClick={() => navigate("/advisor")}
                className="border border-white/30 text-white hover:bg-white/10 font-medium px-9 py-3.5 rounded-full transition-all bg-transparent cursor-pointer">
                Talk to AI Advisor
              </button>
            </div>
          </div>
          <div className="flex-1 max-w-md">
             <div className="relative group">
                <div className="absolute inset-0 bg-pink-500/20 rounded-3xl blur-2xl group-hover:bg-pink-500/30 transition-all"></div>
                <img src={imgHero} alt="Empowered Woman" className="relative z-10 w-full rounded-3xl shadow-2xl border border-white/10 transform group-hover:scale-105 transition-transform duration-500" />
             </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-pink-100 flex justify-center flex-wrap">
        {stats.map((s, i) => (
          <div key={i} className={`px-12 py-6 text-center ${i < stats.length - 1 ? "border-r border-pink-50" : ""}`}>
            <span className="font-display text-4xl font-bold text-pink-700 block font-numeric">{s.num}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-1 block">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-4xl font-bold text-gray-900 mb-3">Everything You Need to <span className="text-pink-700">Succeed</span></h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">From finding the perfect job to upskilling — AarambhHer has you covered at every step.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div key={i} onClick={() => navigate(f.page)}
              className="bg-white rounded-3xl border border-pink-100 p-8 cursor-pointer group hover:shadow-2xl hover:shadow-pink-100/80 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              {/* Gradient blob */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${f.gradient} rounded-full blur-2xl opacity-10 group-hover:opacity-25 transition-opacity`}></div>
              
              <div className={`w-14 h-14 bg-gradient-to-br ${f.gradient} rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-lg shadow-pink-900/10 group-hover:scale-110 transition-transform`}>
                {f.icon}
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">{f.desc}</p>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${f.statColor} bg-pink-50 px-3 py-1.5 rounded-full`}>{f.stat}</span>
                <span className="text-sm font-semibold text-pink-700 group-hover:translate-x-1 transition-transform">{f.cta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Job Categories */}
      <div className="bg-gradient-to-br from-pink-50 to-rose-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Explore by Category</h2>
          <p className="text-gray-500 text-sm mb-10">Thousands of verified jobs across every field — find yours today.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {jobCategories.map((c, i) => (
              <button key={i} onClick={() => navigate("/jobs")}
                className="flex items-center gap-2 bg-white border border-pink-100 hover:border-pink-400 hover:bg-pink-50 px-5 py-3 rounded-2xl transition-all cursor-pointer shadow-sm group hover:shadow-lg">
                <span className="text-xl group-hover:scale-125 transition-transform">{c.icon}</span>
                <span className="text-sm font-semibold text-gray-700">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">Women Who Made It</h2>
          <p className="text-gray-500 text-sm">Real stories from women who found their dream jobs through AarambhHer.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-3xl border border-pink-100 p-7 hover:shadow-xl hover:shadow-pink-50 transition-all hover:-translate-y-1">
              <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-pink-700 to-rose-700 py-16 px-6 text-center">
        <h2 className="font-display text-4xl font-bold text-white mb-4">Ready to Begin Your Journey?</h2>
        <p className="text-pink-100 text-lg mb-8 max-w-lg mx-auto">Join 15,000+ women who have already taken the first step with AarambhHer.</p>
        <button onClick={() => navigate("/jobs")}
          className="bg-white text-pink-700 font-bold px-10 py-4 rounded-full hover:bg-pink-50 transition-all border-0 cursor-pointer text-lg shadow-2xl hover:-translate-y-0.5">
          Start Exploring Jobs
        </button>
      </div>
    </div>
  );
}
