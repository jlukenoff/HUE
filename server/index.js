const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const { HUE_USERNAME } = require('../credentials.json');

const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send('request received');
});

app.get('/api/all', (req, res) => {
  fetch(`http://10.0.0.218/api/${HUE_USERNAME}/lights`)
    .then(chunk => chunk.json())
    .then(data => res.send(data))
    .catch(err => console.error(`Error fetching light data: ${err}`));
});

app.put('/api/adjust', (req, res) => {
  const { lightId, bri } = req.query;
  const queryObj = { bri: +bri };
  fetch(`http://10.0.0.218/api/${HUE_USERNAME}/lights/${lightId}/state`, {
    method: 'PUT',
    body: JSON.stringify(queryObj),
  })
    .then(chunk => chunk.json())
    .then(data => res.send(data))
    .catch(err => console.error(`PUT error: ${err}`));
});

app.put('/api/toggle', (req, res) => {
  const { lightId, on } = req.query;
  const queryObj = { on: on === 'true' };
  console.log('queryObj:', queryObj);
  fetch(`http://10.0.0.218/api/${HUE_USERNAME}/lights/${lightId}/state`, {
    method: 'PUT',
    body: JSON.stringify(queryObj),
  })
    .then(chunk => chunk.json())
    .then(data => res.send(data))
    .catch(err => console.error(`PUT error: ${err}`));
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

if (process.env.NODE_ENV === 'test') server.close();

module.exports = { server };
