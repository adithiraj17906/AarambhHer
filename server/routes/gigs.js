import { Router } from 'express';
import { pool, isConnectedToPostgres, initialGigs } from '../db.js';

const router = Router();

let memGigs = initialGigs.map((g, idx) => ({ id: idx + 1, ...g }));

// GET all gigs
router.get('/', async (req, res) => {
  const { search, location } = req.query;

  try {
    if (isConnectedToPostgres) {
      let query = 'SELECT * FROM gigs WHERE 1=1';
      const params = [];

      if (location) {
        params.push(`%${location}%`);
        query += ` AND location ILIKE $${params.length}`;
      }
      if (search) {
        params.push(`%${search}%`);
        query += ` AND title ILIKE $${params.length}`;
      }

      query += ' ORDER BY id ASC';
      const result = await pool.query(query, params);
      return res.json(result.rows);
    }

    let filtered = [...memGigs];
    if (location) {
      filtered = filtered.filter(g => g.location.toLowerCase().includes(location.toLowerCase()));
    }
    if (search) {
      filtered = filtered.filter(g => g.title.toLowerCase().includes(search.toLowerCase()));
    }
    return res.json(filtered);
  } catch (err) {
    console.error('Error fetching gigs:', err);
    return res.status(500).json({ error: 'Failed to fetch gigs' });
  }
});

// GET gig by ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    if (isConnectedToPostgres) {
      const result = await pool.query('SELECT * FROM gigs WHERE id = $1', [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Gig not found' });
      return res.json(result.rows[0]);
    }

    const gig = memGigs.find(g => g.id === id);
    if (!gig) return res.status(404).json({ error: 'Gig not found' });
    return res.json(gig);
  } catch (err) {
    console.error('Error fetching gig:', err);
    return res.status(500).json({ error: 'Failed to fetch gig' });
  }
});

// POST new gig
router.post('/', async (req, res) => {
  const {
    icon = '🚗',
    bg = 'bg-blue-50',
    title,
    pay,
    location,
    time = '4h',
    women_count = '50+',
    dist = '1 km',
    tags = ['Flexible'],
    tColors = ['bg-blue-100 text-blue-800'],
    live = false
  } = req.body;

  if (!title || !pay) {
    return res.status(400).json({ error: 'Title and pay are required fields' });
  }

  try {
    if (isConnectedToPostgres) {
      const result = await pool.query(
        `INSERT INTO gigs (icon, bg, title, pay, location, time, women_count, dist, tags, t_colors, live, applied_recent, active_viewers)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 0, 0)
         RETURNING *`,
        [icon, bg, title, pay, location, time, women_count, dist, JSON.stringify(tags), JSON.stringify(tColors), !!live]
      );
      return res.status(201).json(result.rows[0]);
    }

    const newGig = {
      id: memGigs.length ? Math.max(...memGigs.map(g => g.id)) + 1 : 1,
      icon, bg, title, pay, location, time, women_count, dist, tags, tColors,
      live: !!live, appliedRecent: 0, activeViewers: 0
    };
    memGigs.push(newGig);
    return res.status(201).json(newGig);
  } catch (err) {
    console.error('Error creating gig:', err);
    return res.status(500).json({ error: 'Failed to create gig' });
  }
});

// PUT update gig
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updates = req.body;

  try {
    if (isConnectedToPostgres) {
      const existing = await pool.query('SELECT * FROM gigs WHERE id = $1', [id]);
      if (existing.rows.length === 0) return res.status(404).json({ error: 'Gig not found' });

      const current = existing.rows[0];
      const title = updates.title ?? current.title;
      const pay = updates.pay ?? current.pay;
      const location = updates.location ?? current.location;
      const time = updates.time ?? current.time;
      const women_count = updates.women_count ?? current.women_count;
      const dist = updates.dist ?? current.dist;
      const tags = updates.tags ? JSON.stringify(updates.tags) : current.tags;
      const live = updates.live ?? current.live;

      const result = await pool.query(
        `UPDATE gigs SET 
          title = $1, pay = $2, location = $3, time = $4, women_count = $5, dist = $6, tags = $7, live = $8
         WHERE id = $9 RETURNING *`,
        [title, pay, location, time, women_count, dist, tags, live, id]
      );
      return res.json(result.rows[0]);
    }

    const index = memGigs.findIndex(g => g.id === id);
    if (index === -1) return res.status(404).json({ error: 'Gig not found' });

    memGigs[index] = { ...memGigs[index], ...updates, id };
    return res.json(memGigs[index]);
  } catch (err) {
    console.error('Error updating gig:', err);
    return res.status(500).json({ error: 'Failed to update gig' });
  }
});

// DELETE gig
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    if (isConnectedToPostgres) {
      const result = await pool.query('DELETE FROM gigs WHERE id = $1 RETURNING id', [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Gig not found' });
      return res.json({ message: 'Gig deleted successfully', id });
    }

    const index = memGigs.findIndex(g => g.id === id);
    if (index === -1) return res.status(404).json({ error: 'Gig not found' });

    memGigs.splice(index, 1);
    return res.json({ message: 'Gig deleted successfully', id });
  } catch (err) {
    console.error('Error deleting gig:', err);
    return res.status(500).json({ error: 'Failed to delete gig' });
  }
});

export default router;
