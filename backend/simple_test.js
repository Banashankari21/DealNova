const express = require('express');
const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Simple test works!' });
});

app.post('/api/payments/process', (req, res) => {
  res.json({ message: 'Payment route works!', body: req.body });
});

app.listen(5000, () => {
  console.log('Simple server running on port 5000');
});