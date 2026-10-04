import { Router } from 'express';
import { pool, isConnectedToPostgres, initialJobs } from '../db.js';

const router = Router();

// In-memory fallback store if PostgreSQL is temporarily unavailable
let memJobs = initialJobs.map((j, idx) => ({ id: idx + 1, ...j }));

// GET all jobs (with optional filters)
router.get('/', async (req, res) => {
  const { type, location, search } = req.query;

  try {
    if (isConnectedToPostgres) {
      let query = 'SELECT * FROM jobs WHERE 1=1';
      const params = [];

      if (type && type !== 'All') {
        params.push(type);
        query += ` AND type = $${params.length}`;
      }
      if (location) {
        params.push(`%${location}%`);
        query += ` AND location ILIKE $${params.length}`;
      }
      if (search) {
        params.push(`%${search}%`);
        query += ` AND (title ILIKE $${params.length} OR company ILIKE $${params.length})`;
      }

      query += ' ORDER BY id ASC';
      const result = await pool.query(query, params);
      return res.json(result.rows);
    }

    // In-memory fallback
    let filtered = [...memJobs];
    if (type && type !== 'All') {
      filtered = filtered.filter(j => j.type.toLowerCase() === type.toLowerCase());
    }
    if (location) {
      filtered = filtered.filter(j => j.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (search) {
      filtered = filtered.filter(j => 
        j.title.toLowerCase().includes(search.toLowerCase()) || 
        j.company.toLowerCase().includes(search.toLowerCase())
      );
    }
    return res.json(filtered);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    return res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// GET job by ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    if (isConnectedToPostgres) {
      const result = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Job not found' });
      }
      return res.json(result.rows[0]);
    }

    const job = memJobs.find(j => j.id === id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    return res.json(job);
  } catch (err) {
    console.error('Error fetching job:', err);
    return res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// POST new job
router.post('/', async (req, res) => {
  const {
    icon = '💻',
    bg = 'bg-blue-50',
    title,
    salary,
    type = 'Full-time',
    company,
    women_count = '100+',
    location,
    tags = [],
    tColors = ['bg-pink-100 text-pink-800'],
    live = false,
    reviews = []
  } = req.body;

  if (!title || !company) {
    return res.status(400).json({ error: 'Title and company are required fields' });
  }

  try {
    if (isConnectedToPostgres) {
      const result = await pool.query(
        `INSERT INTO jobs (icon, bg, title, salary, type, company, women_count, location, tags, t_colors, applied_recent, active_viewers, live, reviews)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 0, 1, $11, $12)
         RETURNING *`,
        [icon, bg, title, salary, type, company, women_count, location, JSON.stringify(tags), JSON.stringify(tColors), !!live, JSON.stringify(reviews)]
      );
      return res.status(201).json(result.rows[0]);
    }

    const newJob = {
      id: memJobs.length ? Math.max(...memJobs.map(j => j.id)) + 1 : 1,
      icon, bg, title, salary, type, company, women_count, location, tags, tColors,
      appliedRecent: 0, activeViewers: 1, live: !!live, reviews
    };
    memJobs.push(newJob);
    return res.status(201).json(newJob);
  } catch (err) {
    console.error('Error creating job:', err);
    return res.status(500).json({ error: 'Failed to create job' });
  }
});

// PUT update job
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updates = req.body;

  try {
    if (isConnectedToPostgres) {
      const existing = await pool.query('SELECT * FROM jobs WHERE id = $1', [id]);
      if (existing.rows.length === 0) {
        return res.status(404).json({ error: 'Job not found' });
      }

      const current = existing.rows[0];
      const title = updates.title ?? current.title;
      const salary = updates.salary ?? current.salary;
      const type = updates.type ?? current.type;
      const company = updates.company ?? current.company;
      const location = updates.location ?? current.location;
      const women_count = updates.women_count ?? current.women_count;
      const tags = updates.tags ? JSON.stringify(updates.tags) : current.tags;
      const live = updates.live ?? current.live;

      const result = await pool.query(
        `UPDATE jobs SET 
          title = $1, salary = $2, type = $3, company = $4, location = $5, women_count = $6, tags = $7, live = $8
         WHERE id = $9 RETURNING *`,
        [title, salary, type, company, location, women_count, tags, live, id]
      );
      return res.json(result.rows[0]);
    }

    const index = memJobs.findIndex(j => j.id === id);
    if (index === -1) return res.status(404).json({ error: 'Job not found' });

    memJobs[index] = { ...memJobs[index], ...updates, id };
    return res.json(memJobs[index]);
  } catch (err) {
    console.error('Error updating job:', err);
    return res.status(500).json({ error: 'Failed to update job' });
  }
});

// DELETE job
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    if (isConnectedToPostgres) {
      const result = await pool.query('DELETE FROM jobs WHERE id = $1 RETURNING id', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Job not found' });
      }
      return res.json({ message: 'Job deleted successfully', id });
    }

    const index = memJobs.findIndex(j => j.id === id);
    if (index === -1) return res.status(404).json({ error: 'Job not found' });

    memJobs.splice(index, 1);
    return res.json({ message: 'Job deleted successfully', id });
  } catch (err) {
    console.error('Error deleting job:', err);
    return res.status(500).json({ error: 'Failed to delete job' });
  }
});

// POST apply for job (increment applied_recent)
router.post('/:id/apply', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { applicantName, email } = req.body;

  try {
    if (isConnectedToPostgres) {
      const result = await pool.query(
        'UPDATE jobs SET applied_recent = applied_recent + 1 WHERE id = $1 RETURNING *',
        [id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Job not found' });
      return res.json({ 
        message: `Application submitted successfully for ${applicantName || 'Applicant'}!`, 
        job: result.rows[0] 
      });
    }

    const job = memJobs.find(j => j.id === id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    job.appliedRecent = (job.appliedRecent || 0) + 1;
    return res.json({ 
      message: `Application submitted successfully for ${applicantName || 'Applicant'}!`, 
      job 
    });
  } catch (err) {
    console.error('Error applying for job:', err);
    return res.status(500).json({ error: 'Failed to submit application' });
  }
});

export default router;
