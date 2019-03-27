const mqtt = require('mqtt');
const readline = require('readline');
const LifxClient = require('node-lifx').Client;

const lifxClient = new LifxClient();
lifxClient.init();

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
  if (topic === 'lifx') {
    if (message.toString() === 'on') {
      lifxClient.lights().forEach((light) => {
        light.getState((err, info) => {
          if (!err) {
            if (info.label === 'Left' || info.label === 'Right') {
              light.on();
              console.log('on');
            }
          }
        });
      });
    }
    if (message.toString() === 'off') {
      lifxClient.lights().forEach((light) => {
        light.getState((err, info) => {
          if (!err) {
            if (info.label === 'Left' || info.label === 'Right') {
              light.off();
              console.log('off');
            }
          }
        });
      });
    }
  }
  console.log(message.toString());
});
