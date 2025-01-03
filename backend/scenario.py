import requests
import os
import psutil


def get_scenarios():
    return requests.get("http://localhost:8080/scenarios").json()


def create_scenario(vhs_num, cms_num):
    return requests.post(
        f"http://localhost:8080/scenario/create?numberOfVehicles={vhs_num}&numberOfCustomers={cms_num}"
    ).json()


def init_scenario(id_sc, init_anyway=False):
    data = get_scenario(id_sc)
    if data.get("message", "") == "Scenario not found" or init_anyway:
        print("Init scenario...")
        requests.post(
            f"http://localhost:8090/Scenarios/initialize_scenario?db_scenario_id={id_sc}",
            json={},
        )


def run_scenario(id_sc, speed):
    sc = get_scenario(id_sc)
    if sc["status"] == "CREATED":
        print("Running scenario...")
        requests.post(
            f"http://localhost:8090/Runner/launch_scenario/{id_sc}?speed={speed}"
        )


def short_id(id):
    return id[:6]


def get_scenario(id_sc: str):
    return requests.get(f"http://localhost:8090/Scenarios/get_scenario/{id_sc}").json()


def time_to_next_change(vhs):
    ts = []
    for v in vhs:
        ts.append(v["remainingTravelTime"])
    ts = [t for t in ts if t]
    if not ts:
        return 0
    return min(ts)


def get_vehicles(id_sc: str):
    return get_scenario(id_sc)["vehicles"]


def get_vehicles_moving_ids(id_sc: str):
    return [v["id"] for v in get_vehicles(id_sc) if not v["isAvailable"]]


def get_vehicles_available_ids(id_sc: str):
    return [v["id"] for v in get_vehicles(id_sc) if v["isAvailable"]]


def get_customers(id_sc: str):
    return get_scenario(id_sc)["customers"]


def get_customers_waiting_ids(id_sc):
    return [c["id"] for c in get_customers(id_sc) if not not c["awaitingService"]]




def send_cars(id_sc, vehicles: [(str, str)]):
    # /Scenarios/update_scenario/{scenario_id}
    # PUT
    # {
    #   "vehicles": [
    #     {
    #       "id": "string",
    #       "customerId": "string"
    #     }
    #   ]
    # }
    data = {"vehicles": [{"id": v[0], "customerId": v[1]} for v in vehicles]}
    return requests.put(
        f"http://localhost:8090/Scenarios/update_scenario/{id_sc}", json=data
    ).json()


def scenario_status(id_sc):
    data = get_scenario(id_sc)
    vhs = get_vehicles(id_sc)
    cms = get_customers(id_sc)
    total_time = sum([v["activeTime"] for v in vhs])
    dists = [v["distanceTravelled"] for v in vhs]
    total_dists = sum(dists)
    trips = [v["numberOfTrips"] for v in vhs]

    pid = os.getpid()
    python_process = psutil.Process(pid)
    memory_use = python_process.memory_info()[0]/2.**30  # memory use in GB...I think
    print('memory use:', memory_use)
    totals = {
        "totalCustomers": len(data["customers"]),
        "totalVehicles": len(data["vehicles"]),
        "vehiclesMoving": len(get_vehicles_moving_ids(id_sc)),
        "vehiclesAvailable": len(get_vehicles_available_ids(id_sc)),
        "customersWaiting": len(get_customers_waiting_ids(id_sc)),
        "status": data["status"],
        "totalTime": total_time,
        "totalDistance": total_dists,
        "averageDistance": total_dists / len(vhs),
        "distances": dists,
        "totalTrips": sum(trips),
        "memoryUse": memory_use,
        "cpuPercentage": psutil.cpu_percent(),
    }
    return totals