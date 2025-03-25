import * as fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as path from 'path';

/**
 * API route to serve Algolia mock data
 * Used by the Algolia mock in local development mode
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Read the Algolia data file
    const dataPath = path.join(process.cwd(), 'src/local/data/algolia-data.json');

    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({ error: 'Algolia data not found' });
    }

    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    // Set cache headers
    res.setHeader('Cache-Control', 'max-age=0, s-maxage=86400');

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error serving Algolia data:', error);
    return res.status(500).json({ error: 'Failed to load Algolia data' });
  }
}
