const express = require('express');
const cors = require('cors');
const openaiRoutes = require('./routes/openaiRoute');

require('dotenv').config();
console.log("Loaded API Key:", process.env.OPENAI_API_KEY); // Verify API key is loaded

const app = express();

app.use(cors({
  origin: 'https://care-ai-frontend.onrender.com' // Update after frontend deployment
}));
app.use(express.json());

app.use('/api/openai', openaiRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});