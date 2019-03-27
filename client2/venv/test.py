from pynput.keyboard import Key, Listener
import paho.mqtt.client as mqtt

broker="localhost"

def on_message(client, userdata, message):
    print(str(message.payload.decode("utf-8")))

def on_press(key):
    mess = key
    client.publish("lifx", remove2(str(mess)))
def remove2(x):
    return x.replace("'", "")

print("creating new instance")
client = mqtt.Client("thing1") 
client.on_message=on_message
print("connecting to broker")
client.connect(broker) 
client.subscribe("lifx")

with Listener(on_press=on_press) as listener:
    listener.join()
