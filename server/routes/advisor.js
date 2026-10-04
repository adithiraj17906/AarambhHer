import { Router } from 'express';
import { pool, isConnectedToPostgres, initialAiReplies } from '../db.js';

const router = Router();

let memAdvisorReplies = { ...initialAiReplies };

// GET all advisor replies
router.get('/replies', async (req, res) => {
  try {
    if (isConnectedToPostgres) {
      const result = await pool.query('SELECT * FROM advisor_replies ORDER BY id ASC');
      const repliesMap = {};
      result.rows.forEach(r => {
        repliesMap[r.question] = r.reply;
      });
      return res.json(repliesMap);
    }

    return res.json(memAdvisorReplies);
  } catch (err) {
    console.error('Error fetching advisor replies:', err);
    return res.status(500).json({ error: 'Failed to fetch advisor replies' });
  }
});

// POST new advisor reply FAQ
router.post('/replies', async (req, res) => {
  const { question, reply } = req.body;

  if (!question || !reply) {
    return res.status(400).json({ error: 'Question and reply are required' });
  }

  try {
    if (isConnectedToPostgres) {
      const result = await pool.query(
        `INSERT INTO advisor_replies (question, reply)
         VALUES ($1, $2)
         ON CONFLICT (question) DO UPDATE SET reply = EXCLUDED.reply
         RETURNING *`,
        [question, reply]
      );
      return res.status(201).json(result.rows[0]);
    }

    memAdvisorReplies[question] = reply;
    return res.status(201).json({ question, reply });
  } catch (err) {
    console.error('Error saving advisor reply:', err);
    return res.status(500).json({ error: 'Failed to save advisor reply' });
  }
});

// POST chat message for AI Career Advisor
router.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message string is required' });
  }

  const queryClean = message.trim().toLowerCase();

  try {
    let reply = null;

    if (isConnectedToPostgres) {
      const result = await pool.query('SELECT * FROM advisor_replies');
      for (const row of result.rows) {
        if (queryClean.includes(row.question.toLowerCase()) || row.question.toLowerCase().includes(queryClean)) {
          reply = row.reply;
          break;
        }
      }
    } else {
      for (const [q, r] of Object.entries(memAdvisorReplies)) {
        if (queryClean.includes(q.toLowerCase()) || q.toLowerCase().includes(queryClean)) {
          reply = r;
          break;
        }
      }
    }

    // Default intelligent responses for keywords
    if (!reply) {
      if (queryClean.includes('resume') || queryClean.includes('cv')) {
        reply = "A strong resume should highlight your core accomplishments, quantifiable impacts, and recent skills. Be sure to check our Resume ATS Analyzer in the navigation bar to get a free score and improvement tips!";
      } else if (queryClean.includes('safety') || queryClean.includes('emergency')) {
        reply = "Your safety is our top priority. We offer verified employers, safety ratings on each gig, and an emergency SOS button in the Safety tab.";
      } else if (queryClean.includes('salary') || queryClean.includes('earn')) {
        reply = "Salaries vary by domain and experience level. For entry-level tech and data roles, expect ₹18,000–₹35,000/month. For flexible gigs, you can earn ₹300–₹800 per shift. Filter our Jobs page by 'Pay' to view top opportunities!";
      } else {
        reply = `Thank you for asking! I'm here to guide you toward rewarding career opportunities, courses, and flexible gigs. Could you tell me a little more about your current background or goals?`;
      }
    }

    return res.json({ reply });
  } catch (err) {
    console.error('Error in advisor chat:', err);
    return res.status(500).json({ error: 'Failed to process chat query' });
  }
});

export default router;
