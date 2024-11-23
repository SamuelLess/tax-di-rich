import requests
from algorithm import create_plan

def init_scenario(id_sc):
    data = get_scenario(id_sc)
    print(data)
    if data.get("message", "") == "Scenario not found":
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


def time_to_next_change(id_sc):
    sc = get_scenario(id_sc)
    ts = []
    for v in sc["vehicles"]:
        ts.append(v["remainingTravelTime"])
    ts = [t for t in ts if t]
    print(f"{ts=}")
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
    }
    return totals
