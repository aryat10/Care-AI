const axios = require('axios');

const getMedicalAdvice = async (req, res) => {
  const { message } = req.body;

  console.log("Loaded API Key:", process.env.GEMINI_API_KEY); // Verify API key

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a medical assistant bot. Provide a short, concise, plain-text bullet-point summary of advice for the following symptoms: ${message}. Use '-' for bullets, keep lines short, and include when to see a doctor and a brief disclaimer on a single line. Avoid Markdown syntax (* or **).`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200 // Limit to keep it concise
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const advice = response.data.candidates[0].content.parts[0].text;
    res.json({ advice });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get medical advice.' });
  }
};

const getFirstAidAdvice = async (req, res) => {
  const { condition } = req.body;

  console.log("Loaded API Key:", process.env.GEMINI_API_KEY);

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=' + process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a medical assistant bot. Provide a short, concise, plain-text bullet-point summary of first-aid steps for ${condition}. Use '-' for bullets, keep lines short, and include when to seek medical attention and a brief disclaimer on a single line. Avoid Markdown syntax (* or **).`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200 // Limit to keep it concise
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const firstAid = response.data.candidates[0].content.parts[0].text;
    res.json({ firstAid });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get first-aid advice.' });
  }
};

module.exports = { getMedicalAdvice, getFirstAidAdvice };