const WebSocket = require('ws');
const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    } else {
      ws.send(str);
      console.log();
      console.log(key);
      console.log();
    }
    ws.on('disconnect', () => {
      console.log('dissconnected');
    });
  });

  ws.send('something');
});
