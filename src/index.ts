import express, { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

// Define an interface for the data structure in db.json
interface CardData {
  id: number;
  name: string;
  type: string;
  // Add other properties as needed
}

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());

// Endpoint to serve JSON data
app.get('/api/data', (req: Request, res: Response) => {
  const dataPath = path.resolve(__dirname, '../public/db.json');
  
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      res.status(500).send('Error reading JSON file');
    } else {
      const parsedData: CardData[] = JSON.parse(data);
      res.json(parsedData);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
