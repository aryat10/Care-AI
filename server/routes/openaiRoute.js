const express = require('express');
const { getMedicalAdvice, getFirstAidAdvice } = require('../controllers/openaiController');
const router = express.Router();

router.post('/symptoms', getMedicalAdvice);
router.post('/firstaid', getFirstAidAdvice);

module.exports = router;