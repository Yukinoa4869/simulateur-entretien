const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const { messages } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ Erreur backend IA :", err);
    res.status(500).json({ reply: "Erreur serveur Vercel." });
  }
};