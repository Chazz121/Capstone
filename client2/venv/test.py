import paho.mqtt.client as mqtt

def on_message(client, userdata, message):
    print(str(message.payload.decode("utf-8")))


broker="localhost"

print("creating new instance")
client = mqtt.Client("thing1") 
client.on_message=on_message
print("connecting to broker")
client.connect(broker) 
client.subscribe("presence")
client.loop_forever() 
