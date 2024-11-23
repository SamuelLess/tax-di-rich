import socketio

# Standard Python
sio = socketio.Client()

@sio.event
def connect():
    print("Connected to the socket server")
    sio.emit('start_scenario', ('0f54db22-8ec8-472f-9521-3ea5849bdd89', 0.05))

@sio.event
def disconnect():
    print("Disconnected from the socket server")

@sio.event
def message(data):
    print(f"Received message: {data}")

@sio.event
def update_scenario(data):
    print(f"Received new data: {data}")

@sio.on('updates')
def on_message(data):
    print(f"Received message: {data}")

if __name__ == "__main__":
    sio.connect('ws://0.0.0.0:9010')
    sio.wait()