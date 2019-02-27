const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const { HUE_USERNAME } = require('../credentials.json');

const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
  res.send('request received');
});

/**
 * Endpoints:
 * /api/
 *  - all: gets all light data from local bridge
 *    Bridge Endpoint: GET '<bridge_ip>/api/<bridge_username>/lights'
 *
 *  - adjust: adjusts the brightness of a specific light
 *      - Bridge Endpoint: PUT '<bridge_ip>/api/<bridge_username>/lights/<lightId>/state'
 *      - params: lightId, brightness ({ bri })
 *
 *  - toggle: turns a light off or on
 *      -Bridge Endpoint: PUT '<bridge_ip>/api/<bridge_username>/lights/<lightId>/state'
 *      - params: lightId, isOn
 *
 */

app.get('/api/all', (req, res) => {
  fetch(`http://10.0.0.218/api/${HUE_USERNAME}/lights`)
    .then(chunk => chunk.json())
    .then(data => res.send(data))
    .catch(err => console.error(`Error fetching light data: ${err}`));
});

app.put('/api/adjust/:lightId/:bri', (req, res) => {
  const { lightId, bri } = req.params;
  const queryObj = { bri: +bri };
  fetch(`http://10.0.0.218/api/${HUE_USERNAME}/lights/${lightId}/state`, {
    method: 'PUT',
    body: JSON.stringify(queryObj),
  })
    .then(chunk => chunk.json())
    .then(data => res.send(data))
    .catch(err => console.error(`PUT error: ${err}`));
});

app.put('/api/toggle/:lightId/:on', (req, res) => {
  const { lightId, on } = req.params;
  const queryObj = { on: on === 'true' };
  fetch(`http://10.0.0.218/api/${HUE_USERNAME}/lights/${lightId}/state`, {
    method: 'PUT',
    body: JSON.stringify(queryObj),
  })
    .then(chunk => chunk.json())
    .then(data => res.send(data))
    .catch(err => console.error(`PUT error: ${err}`));
});

/* TODO: add authentication and functionality
  to add new lights
*/
const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Server running on port ${port}`));

if (process.env.NODE_ENV === 'test') server.close();

module.exports = { server };
