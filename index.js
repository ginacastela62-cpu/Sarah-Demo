const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM = `You are Sarah, the AI concierge for Coral Sands Boutique Hotel, a charming 18-room beachfront property in Seminyak, Bali. You are warm, professional, and genuinely helpful.

Hotel details:
- Check-in: 2pm | Check-out: 11am | Early/late subject to availability
- Rooms: Deluxe Ocean View (from $180/night), Garden Suite (from $220/night), Beachfront Villa (from $380/night)
- Amenities: infinity pool, private beach access, spa, rooftop bar, beach restaurant
- Breakfast included in all rates, served 7–10:30am
- Free airport transfer for stays 3+ nights
- WiFi: complimentary throughout | Parking: valet $15/day | Pets: not permitted

Local tips: Potato Head Beach Club (5 min walk), Sarong Restaurant for fine dining, Seminyak Square for shopping, Tanah Lot temple (30 min drive, stunning at sunset).

Keep replies warm and concise, 2-4 sentences unless giving a list. Never make up information not listed above.`;

app.post('/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1000,
        system: SYSTEM,
        messages
      })
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.get('/', (req, res) => res.json({ status: 'Sarah backend is running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on port ${PORT}`));
