const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const User = require('../models/User');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('reportImage'), async (req, res) => {
  try {
    const { email } = req.body;
    const imagePath = req.file.path;

    Tesseract.recognize(imagePath, 'eng').then(result => {
      const text = result.data.text;
      const healthData = parseHealthData(text);

      User.findOneAndUpdate(
        { email },
        { $push: { healthData } },
        { new: true, upsert: true },
        (err, user) => {
          if (err) return res.status(500).json({ error: err.message });
          res.json(user);
        }
      );
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

function parseHealthData(text) {
  const bpRegex = /BP: (\d+\/\d+)/;
  const sugarRegex = /Sugar: (\d+)/;
  const weightRegex = /Weight: (\d+)/;

  const bpMatch = text.match(bpRegex);
  const sugarMatch = text.match(sugarRegex);
  const weightMatch = text.match(weightRegex);

  return {
    bp: bpMatch ? bpMatch[1] : null,
    sugar: sugarMatch ? sugarMatch[1] : null,
    weight: weightMatch ? weightMatch[1] : null,
  };
}

module.exports = router;
