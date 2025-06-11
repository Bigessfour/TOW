const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(express.static('_site')); // Serve static Jekyll build

// Simple in-memory storage (replace with db.json in production)
let contacts = [];

app.post('/contact', (req, res) => {
  const { name, email, subject, message } = req.body;
  if (name && email && subject && message) {
    contacts.push({
      name,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });
    res.json({ success: true, message: 'Contact form submitted successfully' });
  } else {
    res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
  }
});

app.get('/api/emergency', (req, res) => {
  const alerts = [
    {
      message: 'No current alerts',
      level: 'normal',
      timestamp: new Date().toISOString(),
    },
  ];
  res.json(alerts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
