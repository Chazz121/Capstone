const mqtt = require('mqtt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  client.subscribe('presence', (err) => {
    if (!err) {
      client.publish('presence', 'hello mqtt');
    }
  });
});

client.on('message', (topic, message) => {
  console.log(topic, message.toString());
});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    client.publish('presence', key.name);
  }
});
