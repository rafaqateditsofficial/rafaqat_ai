import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { message } = req.body || {};
    if (!message || !message.trim()) return res.status(400).json({ error: 'Message is required' });
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.interactions.create({ model: 'gemini-3.8-flash', input: message });
    return res.status(200).json({ reply: response.output_text });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Rafaqat AI could not respond.' });
  }
}
