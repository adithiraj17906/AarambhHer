import { Router } from 'express';
import { pool, isConnectedToPostgres, initialVideos } from '../db.js';

const router = Router();

let memVideos = initialVideos.map((v, idx) => ({ id: idx + 1, ...v }));

// GET all learning videos / courses
router.get('/', async (req, res) => {
  const { cat, search } = req.query;

  try {
    if (isConnectedToPostgres) {
      let query = 'SELECT * FROM videos WHERE 1=1';
      const params = [];

      if (cat && cat !== 'All') {
        params.push(cat);
        query += ` AND cat = $${params.length}`;
      }
      if (search) {
        params.push(`%${search}%`);
        query += ` AND (title ILIKE $${params.length} OR meta ILIKE $${params.length})`;
      }

      query += ' ORDER BY id ASC';
      const result = await pool.query(query, params);
      return res.json(result.rows);
    }

    let filtered = [...memVideos];
    if (cat && cat !== 'All') {
      filtered = filtered.filter(v => v.cat.toLowerCase() === cat.toLowerCase());
    }
    if (search) {
      filtered = filtered.filter(v => 
        v.title.toLowerCase().includes(search.toLowerCase()) || 
        (v.meta && v.meta.toLowerCase().includes(search.toLowerCase()))
      );
    }
    return res.json(filtered);
  } catch (err) {
    console.error('Error fetching videos:', err);
    return res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// GET video by ID
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    if (isConnectedToPostgres) {
      const result = await pool.query('SELECT * FROM videos WHERE id = $1', [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Video not found' });
      return res.json(result.rows[0]);
    }

    const video = memVideos.find(v => v.id === id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    return res.json(video);
  } catch (err) {
    console.error('Error fetching video:', err);
    return res.status(500).json({ error: 'Failed to fetch video' });
  }
});

// POST new video
router.post('/', async (req, res) => {
  const { icon = '🎥', bg = 'bg-blue-100', cat, title, meta = '', live = false } = req.body;

  if (!title || !cat) {
    return res.status(400).json({ error: 'Title and cat (category) are required' });
  }

  try {
    if (isConnectedToPostgres) {
      const result = await pool.query(
        `INSERT INTO videos (icon, bg, cat, title, meta, live)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [icon, bg, cat, title, meta, !!live]
      );
      return res.status(201).json(result.rows[0]);
    }

    const newVideo = {
      id: memVideos.length ? Math.max(...memVideos.map(v => v.id)) + 1 : 1,
      icon, bg, cat, title, meta, live: !!live
    };
    memVideos.push(newVideo);
    return res.status(201).json(newVideo);
  } catch (err) {
    console.error('Error creating video:', err);
    return res.status(500).json({ error: 'Failed to create video' });
  }
});

// PUT update video
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const updates = req.body;

  try {
    if (isConnectedToPostgres) {
      const existing = await pool.query('SELECT * FROM videos WHERE id = $1', [id]);
      if (existing.rows.length === 0) return res.status(404).json({ error: 'Video not found' });

      const current = existing.rows[0];
      const cat = updates.cat ?? current.cat;
      const title = updates.title ?? current.title;
      const meta = updates.meta ?? current.meta;
      const live = updates.live ?? current.live;

      const result = await pool.query(
        `UPDATE videos SET cat = $1, title = $2, meta = $3, live = $4 WHERE id = $5 RETURNING *`,
        [cat, title, meta, live, id]
      );
      return res.json(result.rows[0]);
    }

    const index = memVideos.findIndex(v => v.id === id);
    if (index === -1) return res.status(404).json({ error: 'Video not found' });

    memVideos[index] = { ...memVideos[index], ...updates, id };
    return res.json(memVideos[index]);
  } catch (err) {
    console.error('Error updating video:', err);
    return res.status(500).json({ error: 'Failed to update video' });
  }
});

// DELETE video
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    if (isConnectedToPostgres) {
      const result = await pool.query('DELETE FROM videos WHERE id = $1 RETURNING id', [id]);
      if (result.rows.length === 0) return res.status(404).json({ error: 'Video not found' });
      return res.json({ message: 'Video deleted successfully', id });
    }

    const index = memVideos.findIndex(v => v.id === id);
    if (index === -1) return res.status(404).json({ error: 'Video not found' });

    memVideos.splice(index, 1);
    return res.json({ message: 'Video deleted successfully', id });
  } catch (err) {
    console.error('Error deleting video:', err);
    return res.status(500).json({ error: 'Failed to delete video' });
  }
});

export default router;
