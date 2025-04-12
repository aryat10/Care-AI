const express = require('express');
const cors = require('cors');
const openaiRoutes = require('./routes/openaiRoute');
require('dotenv').config();
console.log("Loaded API Key:", process.env.KEY); // Verify API key is loaded
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/openai', openaiRoutes);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});