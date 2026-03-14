import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JobCard from '../components/JobCard';
import GigCard from '../components/GigCard';
import { jobData, gigData } from '../data/mockData';

export default function Jobs({ user, toast }) {
  const navigate = useNavigate();
  const [activeType, setActiveType] = useState("All");
  const [activeLoc, setActiveLoc]   = useState("All");
  const [activeExp, setActiveExp]   = useState("Any");

  const filterItem = (item, isGig) => {
    // Type Filter
    if (activeType !== "All") {
      if (activeType === "Gig Work" && !isGig) return false;
      if (activeType !== "Gig Work" && isGig) return false;
      if (activeType === "Remote" && !item.location.includes("Remote") && !item.tags.includes("Remote")) return false;
      if (activeType !== "Remote" && activeType !== "Gig Work" && item.type !== activeType) return false;
    }

    // Location Filter
    if (activeLoc !== "All") {
      if (!item.location.includes(activeLoc)) return false;
    }

    // Experience Filter (Jobs only usually, but let's check tags)
    if (activeExp !== "Any" && !isGig) {
      if (activeExp === "Fresher" && !item.tags.includes("Freshers OK") && !item.tags.includes("Beginner OK")) return false;
      if (activeExp === "1-3 yrs" && !item.tags.includes("1-3 yrs")) {
        // Simple logic for mock data: if it's not fresher and not 3+, assume 1-3
        if (item.tags.includes("Freshers OK") || item.tags.includes("3+ yrs")) return false;
      }
      if (activeExp === "3+ yrs" && !item.tags.includes("3+ yrs")) return false;
    }

    return true;
  };

  const filteredJobs = jobData.filter(j => filterItem(j, false));
  const filteredGigs = gigData.filter(g => filterItem(g, true));

  const onApply = (title) => {
    if (!user) {
      toast("Please login to apply for this job.");
      navigate("/login");
      return;
    }
    toast(`Applied for: ${title}! We'll notify you soon. ✓`);
  };

  const onAccept = (title) => {
    if (!user) {
      toast("Please login to accept this gig.");
      navigate("/login");
      return;
    }
    toast(`Gig Accepted: ${title}! We'll notify you with next steps. ✓`);
  };

  const FilterGroup = ({ label, options, active, set }) => (
    <div className="mb-5">
      <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map(t => (
          <button key={t} onClick={() => set(t)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border cursor-pointer transition-all ${active === t ? "bg-pink-700 text-white border-pink-700" : "bg-rose-50 text-gray-700 border-pink-100 hover:border-pink-400"}`}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 fade-in">
      <div className="mb-7 flex justify-between items-end">
        <div>
           <h2 className="font-display text-4xl font-bold text-gray-900 mb-1">Opportunities Hub</h2>
           <p className="text-gray-500 text-sm">Verified jobs and gig tasks for women professionals.</p>
        </div>
        <div className="bg-pink-50 border border-pink-100 px-4 py-2 rounded-xl text-center">
           <span className="block text-xs font-bold text-gray-400 uppercase tracking-tighter">Results Found</span>
           <span className="text-xl font-bold text-pink-700 font-numeric">{filteredJobs.length + filteredGigs.length}</span>
        </div>
      </div>
      
      <div className="flex gap-6 items-start">
        {/* Filter panel */}
        <div className="w-72 flex-shrink-0 bg-white rounded-2xl border border-pink-100 p-5 sticky top-20 shadow-sm">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-5">Filters</h3>
          <FilterGroup label="Opportunity Type" options={["All","Full-time","Part-time","Gig Work","Remote"]} active={activeType} set={setActiveType} />
          <FilterGroup label="Location"   options={["All","Gachibowli","Kukatpally","Jubilee Hills","Whitefield","Indiranagar","Adyar","Velachery","Remote"]}  active={activeLoc}  set={setActiveLoc} />
          <FilterGroup label="Experience" options={["Any","Fresher","1-3 yrs","3+ yrs"]}               active={activeExp}  set={setActiveExp} />
          <button onClick={() => { setActiveType("All"); setActiveLoc("All"); setActiveExp("Any"); toast("Filters reset! showing all."); }}
            className="w-full bg-white border border-pink-200 text-gray-500 hover:bg-rose-50 font-semibold py-3 rounded-xl text-sm transition-all cursor-pointer mt-3">
            Clear Filters
          </button>
        </div>

        {/* List of mixed opportunities */}
        <div className="flex-1 flex flex-col gap-8">
          {filteredJobs.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Full-Time & Part-Time Roles</h3>
              <div className="flex flex-col gap-4">
                {filteredJobs.map((job, i) => (
                  <JobCard key={i} job={job} onApply={onApply} />
                ))}
              </div>
            </div>
          )}

          {filteredGigs.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Gigs & Local Tasks</h3>
              <div className="flex flex-col gap-4">
                {filteredGigs.map((gig, i) => (
                  <GigCard key={i} gig={gig} onAccept={onAccept} />
                ))}
              </div>
            </div>
          )}

          {filteredJobs.length === 0 && filteredGigs.length === 0 && (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-pink-200">
               <span className="text-4xl block mb-4">🔍</span>
               <h3 className="text-xl font-bold text-gray-900">No results found</h3>
               <p className="text-gray-500">Try adjusting your filters to find more opportunities.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
