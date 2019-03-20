const mqtt = require('mqtt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  client.subscribe('lifx', (err) => {
    if (err) {
      console.log(err);
    } else if (!err) {
      client.publish('lifx', 'hello mqtt');
    } else console.log(err);
  });
});

client.on('message', (topic, message) => {
  console.log(topic, message.toString());
});
