export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { path } = req.query;
  const token = req.headers.authorization;
  const mlUrl = `https://api.mercadolibre.com/${path}`;

  try {
    const response = await fetch(mlUrl, {
      method: req.method,
      headers: { 'Authorization': token, 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
