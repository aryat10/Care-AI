const express = require('express');
const cors = require('cors');
const openaiRoutes = require('./routes/openaiRoute');
require('dotenv').config();

console.log('[INFO] Environment variables loaded');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/openai', openaiRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`[INFO] Server is running on port ${PORT}`);
});
