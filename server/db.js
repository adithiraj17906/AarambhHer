import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Seed data
export const initialJobs = [
  { icon: "💻", bg: "bg-blue-50", title: "Junior Data Analyst", salary: "₹25,000/mo", type: "Full-time", company: "TechVerse India", women_count: "320", location: "Gachibowli, Hyderabad", tags: ["Remote", "Freshers OK"], tColors: ["bg-teal-100 text-teal-800", "bg-pink-100 text-pink-800"], appliedRecent: 12, live: true, reviews: ["The supportive culture for women here is amazing!", "Great mentorship for junior analysts."] },
  { icon: "✍️", bg: "bg-purple-50", title: "Content Writer", salary: "₹18,000/mo", type: "Part-time", company: "MediaHive", women_count: "540", location: "Indiranagar, Bangalore", tags: ["Part-time", "Creative"], tColors: ["bg-violet-100 text-violet-800", "bg-pink-100 text-pink-800"], activeViewers: 45, reviews: ["I love the flexible work hours for part-timers.", "Creative freedom is truly respected."] },
  { icon: "📞", bg: "bg-green-50", title: "Customer Support Executive", salary: "₹20,000/mo", type: "Full-time", company: "FinEdge BPO", women_count: "1,100", location: "Adyar, Chennai", tags: ["Full-time", "Beginner OK"], tColors: ["bg-green-100 text-green-800", "bg-pink-100 text-pink-800"], appliedRecent: 8, reviews: ["The training program is very comprehensive.", "Inclusive environment for all levels."] },
  { icon: "🎨", bg: "bg-yellow-50", title: "UI/UX Design Intern", salary: "₹10,000/mo", type: "Internship", company: "Designly Co.", women_count: "210", location: "Kukatpally, Hyderabad", tags: ["Internship", "Design"], tColors: ["bg-amber-100 text-amber-700", "bg-pink-100 text-pink-800"], live: true, reviews: ["Learned so much about accessible design here.", "The design team is really welcoming."] },
  { icon: "📊", bg: "bg-rose-50", title: "Accounts Assistant", salary: "₹22,000/mo", type: "Full-time", company: "Blue Lotus Finance", women_count: "390", location: "Whitefield, Bangalore", tags: ["Finance", "Full-time"], tColors: ["bg-pink-100 text-pink-800", "bg-rose-100 text-rose-800"], activeViewers: 15, reviews: ["Professional growth opportunities are top-notch.", "Solid work-life balance for finance roles."] }
];

export const initialGigs = [
  { icon: "🚗", bg: "bg-blue-50", title: "Safe Cab Driver", pay: "₹800/shift", location: "Secunderabad, Hyderabad", time: "6h", women_count: "120", dist: "2 km", tags: ["Flexible", "Safe"], tColors: ["bg-blue-100 text-blue-800", "bg-pink-100 text-pink-800"], live: true, appliedRecent: 0, activeViewers: 0 },
  { icon: "🏡", bg: "bg-purple-50", title: "Home Tutor (Primary)", pay: "₹400/hr", location: "Koramangala, Bangalore", time: "2h", women_count: "250", dist: "5 km", tags: ["Teaching", "Home"], tColors: ["bg-purple-100 text-purple-800", "bg-pink-100 text-pink-800"], live: false, appliedRecent: 0, activeViewers: 22 },
  { icon: "🥘", bg: "bg-green-50", title: "Tiffin Service Helper", pay: "₹350/day", location: "Velachery, Chennai", time: "4h", women_count: "85", dist: "1 km", tags: ["Cooking", "Morning"], tColors: ["bg-green-100 text-green-800", "bg-pink-100 text-pink-800"], live: true, appliedRecent: 0, activeViewers: 0 },
  { icon: "📦", bg: "bg-yellow-50", title: "Delivery Partner", pay: "₹500/shift", location: "Jubilee Hills, Hyderabad", time: "5h", women_count: "310", dist: "3 km", tags: ["Delivery", "Instant"], tColors: ["bg-amber-100 text-amber-700", "bg-pink-100 text-pink-800"], live: false, appliedRecent: 5, activeViewers: 0 },
  { icon: "🧵", bg: "bg-rose-50", title: "Alteration Specialist", pay: "₹300/gig", location: "T. Nagar, Chennai", time: "3h", women_count: "64", dist: "1.5 km", tags: ["Tailoring", "Expert"], tColors: ["bg-pink-100 text-pink-800", "bg-rose-100 text-rose-800"], live: false, appliedRecent: 0, activeViewers: 10 }
];

export const initialVideos = [
  { icon: "🐍", bg: "bg-blue-100", cat: "Tech Skills", title: "Python Programming for Absolute Beginners", meta: "⏱ 4h 20min · 125K views · freeCodeCamp", live: false },
  { icon: "📊", bg: "bg-green-100", cat: "Business", title: "Excel for Data Analysis — Zero to Hero", meta: "⏱ 2h 45min · 89K views · Leila Gharani", live: false },
  { icon: "🎨", bg: "bg-purple-100", cat: "Design", title: "UX Design Crash Course — Full Beginner Guide", meta: "⏱ 1h 52min · 210K views · DesignCourse", live: false },
  { icon: "💰", bg: "bg-yellow-100", cat: "Finance", title: "Financial Literacy for Women — Complete Guide", meta: "⏱ 3h 10min · 67K views · Her Money", live: false },
  { icon: "🎤", bg: "bg-pink-100", cat: "Soft Skills", title: "Public Speaking Confidence — Practical Skills", meta: "⏱ 1h 30min · 145K views · TEDx", live: false },
  { icon: "🏢", bg: "bg-teal-100", cat: "Business", title: "Digital Marketing Full Course 2025", meta: "⏱ 5h 00min · 198K views · Simplilearn", live: false },
  { icon: "🪡", bg: "bg-rose-100", cat: "Stitching", title: "Mastering Blouse Cutting & Stitching", meta: "⏱ 45min · 450K views · Tailoring Hub", live: true },
  { icon: "👗", bg: "bg-indigo-100", cat: "Stitching", title: "Modern Dress Design & Embroidery", meta: "⏱ 1h 15min · 230K views · Fashion Tech", live: false },
  { icon: "🍳", bg: "bg-orange-100", cat: "Cooking", title: "Professional Home Catering & Buffet Setup", meta: "⏱ 2h 10min · 180K views · Chef Meena", live: true },
  { icon: "🥗", bg: "bg-emerald-100", cat: "Cooking", title: "Healthy Meal Prep for Working Women", meta: "⏱ 55min · 310K views · Healthy Living", live: false },
  { icon: "🧤", bg: "bg-amber-100", cat: "Vocational", title: "Handmade Crafts & Etsy Business Guide", meta: "⏱ 1h 30min · 95K views · Crafty India", live: true }
];

export const initialAiReplies = {
  "What career suits a science graduate?": "As a science graduate, your analytical strengths open many doors. Top paths: Data Science (Python + ML), Biotech Research, Environmental Consulting, or Science Communication. Want a personalized learning roadmap for any of these?",
  "How do I get into tech with no experience?": "Great news — you can absolutely break in! Start with free resources like freeCodeCamp or Khan Academy, build 2–3 portfolio projects, then apply for junior roles. Your communication skills are transferable assets. Want a 3-month plan?",
  "Suggest skills for remote work": "For remote success, focus on: async communication, digital tools (Slack, Notion, Trello), time management, and field-relevant tech skills. Remote roles are booming — smart choice! Which field are you targeting?",
  "Best courses for data science?": "My top picks: 1) Google Data Analytics Certificate (Coursera), 2) Python for Data Science (freeCodeCamp — free!), 3) SQL Essential Training (LinkedIn Learning). Start with Python, then move to analysis. Shall I map a 3-month plan?"
};

// PostgreSQL Pool configuration
const connectionString = process.env.DATABASE_URL;
const isProduction = process.env.NODE_ENV === 'production';

export const pool = new Pool({
  connectionString: connectionString || undefined,
  ssl: connectionString && connectionString.includes('sslmode=require') 
    ? { rejectUnauthorized: false } 
    : (isProduction ? { rejectUnauthorized: false } : false)
});

export let isConnectedToPostgres = false;

// Initialize Database schema and seed data
export async function initDb() {
  try {
    const client = await pool.connect();
    isConnectedToPostgres = true;
    console.log('✅ Connected to PostgreSQL database successfully.');

    // 1. Create jobs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS jobs (
        id SERIAL PRIMARY KEY,
        icon VARCHAR(20) DEFAULT '💻',
        bg VARCHAR(50) DEFAULT 'bg-blue-50',
        title VARCHAR(255) NOT NULL,
        salary VARCHAR(100),
        type VARCHAR(50),
        company VARCHAR(255) NOT NULL,
        women_count VARCHAR(50),
        location VARCHAR(255),
        tags JSONB DEFAULT '[]'::jsonb,
        t_colors JSONB DEFAULT '[]'::jsonb,
        applied_recent INT DEFAULT 0,
        active_viewers INT DEFAULT 0,
        live BOOLEAN DEFAULT false,
        reviews JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 2. Create gigs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS gigs (
        id SERIAL PRIMARY KEY,
        icon VARCHAR(20) DEFAULT '🚗',
        bg VARCHAR(50) DEFAULT 'bg-blue-50',
        title VARCHAR(255) NOT NULL,
        pay VARCHAR(100),
        location VARCHAR(255),
        time VARCHAR(50),
        women_count VARCHAR(50),
        dist VARCHAR(50),
        tags JSONB DEFAULT '[]'::jsonb,
        t_colors JSONB DEFAULT '[]'::jsonb,
        live BOOLEAN DEFAULT false,
        applied_recent INT DEFAULT 0,
        active_viewers INT DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Create videos table
    await client.query(`
      CREATE TABLE IF NOT EXISTS videos (
        id SERIAL PRIMARY KEY,
        icon VARCHAR(20) DEFAULT '🎥',
        bg VARCHAR(50) DEFAULT 'bg-blue-100',
        cat VARCHAR(100) NOT NULL,
        title VARCHAR(255) NOT NULL,
        meta VARCHAR(255),
        live BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 4. Create advisor_replies table
    await client.query(`
      CREATE TABLE IF NOT EXISTS advisor_replies (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL UNIQUE,
        reply TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Seed jobs if empty
    const jobsRes = await client.query('SELECT COUNT(*) FROM jobs');
    if (parseInt(jobsRes.rows[0].count, 10) === 0) {
      console.log('🌱 Seeding initial jobs...');
      for (const j of initialJobs) {
        await client.query(
          `INSERT INTO jobs (icon, bg, title, salary, type, company, women_count, location, tags, t_colors, applied_recent, active_viewers, live, reviews)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
          [j.icon, j.bg, j.title, j.salary, j.type, j.company, j.women_count, j.location, JSON.stringify(j.tags), JSON.stringify(j.tColors), j.appliedRecent || 0, j.activeViewers || 0, !!j.live, JSON.stringify(j.reviews || [])]
        );
      }
    }

    // Seed gigs if empty
    const gigsRes = await client.query('SELECT COUNT(*) FROM gigs');
    if (parseInt(gigsRes.rows[0].count, 10) === 0) {
      console.log('🌱 Seeding initial gigs...');
      for (const g of initialGigs) {
        await client.query(
          `INSERT INTO gigs (icon, bg, title, pay, location, time, women_count, dist, tags, t_colors, live, applied_recent, active_viewers)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [g.icon, g.bg, g.title, g.pay, g.location, g.time, g.women_count, g.dist, JSON.stringify(g.tags), JSON.stringify(g.tColors), !!g.live, g.appliedRecent || 0, g.activeViewers || 0]
        );
      }
    }

    // Seed videos if empty
    const videosRes = await client.query('SELECT COUNT(*) FROM videos');
    if (parseInt(videosRes.rows[0].count, 10) === 0) {
      console.log('🌱 Seeding initial videos...');
      for (const v of initialVideos) {
        await client.query(
          `INSERT INTO videos (icon, bg, cat, title, meta, live)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [v.icon, v.bg, v.cat, v.title, v.meta, !!v.live]
        );
      }
    }

    // Seed advisor replies if empty
    const advisorRes = await client.query('SELECT COUNT(*) FROM advisor_replies');
    if (parseInt(advisorRes.rows[0].count, 10) === 0) {
      console.log('🌱 Seeding initial career advisor FAQ replies...');
      for (const [question, reply] of Object.entries(initialAiReplies)) {
        await client.query(
          `INSERT INTO advisor_replies (question, reply) VALUES ($1, $2) ON CONFLICT (question) DO NOTHING`,
          [question, reply]
        );
      }
    }

    client.release();
    console.log('✨ Database schema and seed verification complete.');
  } catch (err) {
    isConnectedToPostgres = false;
    console.warn('\n⚠️  Could not connect to PostgreSQL:', err.message);
    console.warn('👉 Operating in In-Memory / Mock-Data Fallback Mode so APIs remain functional.');
    console.warn('👉 To connect to PostgreSQL, set a valid DATABASE_URL in server/.env (e.g., local PostgreSQL or Supabase/Neon connection string).\n');
  }
}
