// relay.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    // rilancia il messaggio a tutti i client connessi (incluso Cables)
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});
