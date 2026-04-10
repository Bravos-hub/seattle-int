import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config();

const app = express();
const sql = neon(process.env.DATABASE_URL);

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Handling large JSON site content

// Initialize Database table if not exists
async function initDb() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        key TEXT UNIQUE NOT NULL,
        content JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Database initialized');
  } catch (err) {
    console.error('❌ Failed to initialize database:', err);
  }
}

initDb();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: !!process.env.DATABASE_URL });
});

// GET site content
app.get('/api/content', async (req, res) => {
  try {
    const result = await sql`SELECT content FROM site_settings WHERE key = 'main_content'`;
    if (result.length === 0) {
      // If no content in DB, return a signal to the frontend to use its defaults
      return res.status(404).json({ error: 'Content not found', useDefaults: true });
    }
    res.json(result[0].content);
  } catch (err) {
    console.error('Error fetching content:', err);
    res.status(500).json({ error: 'Failed to fetch content from database' });
  }
});

// POST site content (Save/Update)
app.post('/api/content', async (req, res) => {
  const content = req.body;
  if (!content || Object.keys(content).length === 0) {
    return res.status(400).json({ error: 'Invalid content payload' });
  }

  try {
    await sql`
      INSERT INTO site_settings (key, content)
      VALUES ('main_content', ${content})
      ON CONFLICT (key) DO UPDATE
      SET content = EXCLUDED.content,
          updated_at = CURRENT_TIMESTAMP
    `;
    console.log('✅ Site content updated in database');
    res.json({ success: true, message: 'Content saved successfully' });
  } catch (err) {
    console.error('Error saving content:', err);
    res.status(500).json({ error: 'Failed to save content to database' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
