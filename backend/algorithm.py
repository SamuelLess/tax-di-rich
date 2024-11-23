import networkx as nx
from scenario import *
import matplotlib.pyplot as plt
import math
import ortools
import solver
import copy

class Vehicle:
    def __init__(self, activeTime, coordX, coordY, customerId, distanceTravelled, id, isAvailable, numberOfTrips, remainingTravelTime, vehicleSpeed):
        
        self.activeTime = activeTime
        self.coordX = coordX
        self.coordY = coordY
        self.customerId = customerId
        self.distanceTravelled = distanceTravelled
        self.id = id
        self.isAvailable = isAvailable
        self.numberOfTrips = numberOfTrips
        self.remainingTravelTime = remainingTravelTime
        self.vehicleSpeed = vehicleSpeed

class Customer:
    def __init__(self, awaitingService, coordX, coordY, destinationX, destinationY, id):
        self.awaitingService = awaitingService
        self.coordX = coordX
        self.coordY = coordY
        self.destinationX = destinationX
        self.destinationY = destinationY
        self.id = id

example_data = {
    "customers": [
        {
            "awaitingService": True,
            "coordX": 48.13828,
            "coordY": 11.619596,
            "destinationX": 48.134586,
            "destinationY": 11.56353,
            "id": "2b84668a-c09d-4d9d-9776-5e50315b8297"
        },
        {
            "awaitingService": True,
            "coordX": 48.129242,
            "coordY": 11.589639,
            "destinationX": 48.133804,
            "destinationY": 11.549081,
            "id": "940c34b8-5eac-4374-a7f8-2d711a799325"
        },
        {
            "awaitingService": True,
            "coordX": 48.15526,
            "coordY": 11.590749,
            "destinationX": 48.155388,
            "destinationY": 11.505246,
            "id": "fbb3a7d5-ce80-409c-a73e-5af142e06fb3"
        },
        {
            "awaitingService": True,
            "coordX": 48.120132,
            "coordY": 11.548841,
            "destinationX": 48.151264,
            "destinationY": 11.522556,
            "id": "9660c732-ac8b-411c-b2e0-97e6e3ffb957"
        },
        {
            "awaitingService": True,
            "coordX": 48.132492,
            "coordY": 11.549629,
            "destinationX": 48.124966,
            "destinationY": 11.646115,
            "id": "ae9f04ad-729f-4a48-8a70-d0635635438b"
        },
        {
            "awaitingService": True,
            "coordX": 48.13389,
            "coordY": 11.529968,
            "destinationX": 48.15522,
            "destinationY": 11.50802,
            "id": "815fd75d-f408-486f-bcc1-83cc213bf0be"
        },
        {
            "awaitingService": True,
            "coordX": 48.123943,
            "coordY": 11.605603,
            "destinationX": 48.15465,
            "destinationY": 11.5288925,
            "id": "8cfbecae-de62-4a21-a5b6-a0cf6a242d0f"
        },
        {
            "awaitingService": True,
            "coordX": 48.144848,
            "coordY": 11.578807,
            "destinationX": 48.138325,
            "destinationY": 11.557069,
            "id": "d0d5684d-fb95-4b95-8ffa-7dd26486e40b"
        },
        {
            "awaitingService": True,
            "coordX": 48.12753,
            "coordY": 11.550993,
            "destinationX": 48.136845,
            "destinationY": 11.561149,
            "id": "708b772f-f1f5-42c8-be9b-5d72a62e3eed"
        },
        {
            "awaitingService": True,
            "coordX": 48.153175,
            "coordY": 11.58204,
            "destinationX": 48.15658,
            "destinationY": 11.620353,
            "id": "c6caf86c-d647-4ce8-8207-e34b53e73034"
        }
    ],
    "endTime": None,
    "id": "027fc9ac-b7d1-448b-95ac-75f97f529e55",
    "startTime": "2024-11-23T03:10:18.241417",
    "status": "RUNNING",
    "vehicles": [
        {
            "activeTime": 1290,
            "coordX": 48.13828,
            "coordY": 11.619596,
            "customerId": "2b84668a-c09d-4d9d-9776-5e50315b8297",
            "distanceTravelled": 0,
            "id": "5fa341fa-d281-4a7a-b765-3a19104624c2",
            "isAvailable": False,
            "numberOfTrips": 0,
            "remainingTravelTime": 444,
            "vehicleSpeed": 9.42237263093254
        },
        {
            "activeTime": 746,
            "coordX": 48.129242,
            "coordY": 11.589639,
            "customerId": "940c34b8-5eac-4374-a7f8-2d711a799325",
            "distanceTravelled": 0,
            "id": "67e4494b-93d7-4104-92d9-86ed60aa7e03",
            "isAvailable": False,
            "numberOfTrips": 0,
            "remainingTravelTime": 240,
            "vehicleSpeed": 12.698813957664518
        },
        {
            "activeTime": 1022,
            "coordX": 48.15526,
            "coordY": 11.590749,
            "customerId": "fbb3a7d5-ce80-409c-a73e-5af142e06fb3",
            "distanceTravelled": 0,
            "id": "123bde32-4f99-4c8d-974c-6c52b21be6bd",
            "isAvailable": False,
            "numberOfTrips": 0,
            "remainingTravelTime": 628,
            "vehicleSpeed": 10.099223746108086
        },
        {
            "activeTime": 865,
            "coordX": 48.120132,
            "coordY": 11.548841,
            "customerId": "9660c732-ac8b-411c-b2e0-97e6e3ffb957",
            "distanceTravelled": 0,
            "id": "5a6f4a71-44da-4b3f-9a2b-c60053c01adf",
            "isAvailable": False,
            "numberOfTrips": 0,
            "remainingTravelTime": 342,
            "vehicleSpeed": 11.614992496829455
        },
        {
            "activeTime": 0,
            "coordX": 48.157974,
            "coordY": 11.640308,
            "customerId": "ae9f04ad-729f-4a48-8a70-d0635635438b",
            "distanceTravelled": 0,
            "id": "51e79acb-d2b3-413e-ad03-5b4bc573c2aa",
            "isAvailable": False,
            "numberOfTrips": 0,
            "remainingTravelTime": 750,
            "vehicleSpeed": 9.731809889699125
        }
    ]}

AVG_SPEED = 11.11
SINK_NODE_ID = "sink_node"

def customer_start_pos(customer):
    return [customer["coordX"], customer["coordY"]]

def customer_end_pos(customer):
    return [customer["destinationX"], customer["destinationY"]]

# Euclidean distance
def dist(pos1, pos2):
    return math.sqrt( (pos1[0] - pos2[0])**2 + (pos1[1] - pos1[1])**2 )

def cost(pos1, pos2, speed = AVG_SPEED):
    return dist(pos1, pos2) / speed

# Cost for doing a request, when the vehicle is still at the previous customer
def cost_for_customer(current_position, customer):
    cost_to_next_job = cost(current_position, customer_start_pos(customer))
    cost_to_finish_job = cost(customer_start_pos(customer), customer_end_pos(customer))
    return  cost_to_next_job + cost_to_finish_job

def add_customer_nodes(G, customers):
    # TODO: filter for only unserviced customers
    for customer in customers:
        G.add_node(
            customer["id"],
            pos=(customer["coordY"], customer["coordX"]),
        )

def add_customer_edges(G, customers):
    for firstCustomer in customers:
        for secondCustomer in customers:
            if firstCustomer != secondCustomer:
                G.add_edge(
                    firstCustomer["id"],
                    secondCustomer["id"],
                    weight=cost_for_customer(customer_end_pos(firstCustomer), secondCustomer)
                )

def add_vehicles(G: nx.DiGraph, vehicles : list[Vehicle], customers: list[Customer]):
    customer_nodes = filter(lambda x: x != SINK_NODE_ID, copy.copy(list(G.nodes())))
    starting_nodes = []
    # Nodes from starting positions
    for vehicle in vehicles:
        if vehicle["isAvailable"] or True:
            vehicle_position = (vehicle["coordY"], vehicle["coordX"])
            starting_nodes.append(vehicle["id"])
            G.add_node(
                    vehicle["id"],
                    pos=vehicle_position
                ),
            for customer_id in customer_nodes:
                customer = next((x for x in customers if x["id"] == customer_id), None)
                starting_cost = cost_for_customer(vehicle_position, customer)
                G.add_edge(vehicle["id"], customer_id, weight = starting_cost)
        else: 
            print("Unimplemented: Vehicle is busy")
    return starting_nodes

def add_sink(G):
    G.add_node(SINK_NODE_ID, pos=(0, 0))
    for node in G.nodes():
        G.add_edge(node, "sink_node")

def build_graph(scenario):
    customers, vehicles = scenario["customers"], scenario["vehicles"]

    G = nx.DiGraph()
    
    add_customer_nodes(G, customers)
    add_customer_edges(G, customers)
    add_sink(G)
    starting_nodes = add_vehicles(G, vehicles, customers)
    print("Graph generated")

    solver.solve_tsp(G, SINK_NODE_ID, starting_nodes)

    #nx.draw(G, nx.get_node_attributes(G, 'pos'), with_labels=True)
    #plt.show()


if __name__ == "__main__":
    build_graph(example_data)