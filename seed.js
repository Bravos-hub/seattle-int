import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import { defaultSiteContent } from './src/content/siteContent.ts';

dotenv.config();

const sql = neon(process.env.DATABASE_URL);

async function seed() {
  console.log('🌱 Seeding database with initial site content...');
  try {
    // Ensure table exists
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        key TEXT UNIQUE NOT NULL,
        content JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Insert default content
    await sql`
      INSERT INTO site_settings (key, content)
      VALUES ('main_content', ${defaultSiteContent})
      ON CONFLICT (key) DO NOTHING
    `;
    
    console.log('✅ Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seed();
