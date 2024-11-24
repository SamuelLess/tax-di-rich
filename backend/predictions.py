from algorithm import create_plan, example_data, cost_for_customer
import timeit
import matplotlib.pyplot as plt

test = {
  "id": "9e665ffe-4fd4-4387-b35e-1166bc5f8268",
  "startTime": None,
  "endTime": None,
  "status": "CREATED",
  "vehicles": [
    {
      "id": "0311ce60-a54c-40e0-858c-173a99b74d2b",
      "coordX": 48.146935,
      "coordY": 11.564984,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "7a1eef77-446e-4cc4-ab29-d71b593ca685",
      "coordX": 48.15688,
      "coordY": 11.593828,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "6db8143f-6fee-4e79-bc84-d4233dd651f0",
      "coordX": 48.1562,
      "coordY": 11.594148,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "3b63bd52-ac00-49a8-b48a-c9ca85d71763",
      "coordX": 48.16334,
      "coordY": 11.600612,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "badaa743-4c2f-4c0a-aca2-0c9db9801515",
      "coordX": 48.11982,
      "coordY": 11.51261,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    }
  ],
  "customers": [
    {
      "id": "32f2922a-1dfc-41b1-b094-2b06bc4e03a4",
      "coordX": 48.131012,
      "coordY": 11.5564375,
      "destinationX": 48.113033,
      "destinationY": 11.568869,
      "awaitingService": True
    },
    {
      "id": "9c339354-80bf-4a98-90bf-b79ad64f9e73",
      "coordX": 48.143414,
      "coordY": 11.527084,
      "destinationX": 48.160423,
      "destinationY": 11.587505,
      "awaitingService": True
    },
    {
      "id": "d18b1f67-03fc-4066-9c7d-2e52b33b4d7a",
      "coordX": 48.127037,
      "coordY": 11.646385,
      "destinationX": 48.16409,
      "destinationY": 11.512558,
      "awaitingService": True
    },
    {
      "id": "192fe4bb-e74c-4379-b395-348e4cafa4d2",
      "coordX": 48.160366,
      "coordY": 11.518657,
      "destinationX": 48.14299,
      "destinationY": 11.526316,
      "awaitingService": True
    },
    {
      "id": "95c53b6e-90ed-43ed-ada3-4ec007c6da68",
      "coordX": 48.164375,
      "coordY": 11.627476,
      "destinationX": 48.13174,
      "destinationY": 11.607468,
      "awaitingService": True
    },
    {
      "id": "a7212e9c-8eee-4153-a472-b7730577d4a0",
      "coordX": 48.119347,
      "coordY": 11.550307,
      "destinationX": 48.153965,
      "destinationY": 11.591483,
      "awaitingService": True
    },
    {
      "id": "4c8a920c-23c1-42d9-8403-da5ac4652ec1",
      "coordX": 48.133938,
      "coordY": 11.577026,
      "destinationX": 48.161133,
      "destinationY": 11.611403,
      "awaitingService": True
    },
    {
      "id": "7355879e-3185-4ce0-98ab-26d98726be76",
      "coordX": 48.153194,
      "coordY": 11.529422,
      "destinationX": 48.136623,
      "destinationY": 11.643439,
      "awaitingService": True
    },
    {
      "id": "a298ce12-894a-444b-a59b-5043a78f4ebd",
      "coordX": 48.12232,
      "coordY": 11.5216,
      "destinationX": 48.140873,
      "destinationY": 11.555827,
      "awaitingService": True
    },
    {
      "id": "7e53751c-1e8d-4eb0-87ec-fc87c8cfbac5",
      "coordX": 48.148335,
      "coordY": 11.553262,
      "destinationX": 48.136665,
      "destinationY": 11.645538,
      "awaitingService": True
    }
  ]
}

# record with done, in_progress, waiting declaration
# class Statistics:    
#     def __init__(self):
#         self.done = 0
#         self.in_progress = 0
#         self.waiting = 0

def get_customer_by_id(customer_id, customers):
    # TODO refactor in algorithm.py
    return next((x for x in customers if x["id"] == customer_id), None)

def forecast_stats(scenario, coefficient, speed):
    start = timeit.default_timer()
    plans = create_plan(scenario, coefficient, speed)
    compute_time = timeit.default_timer() - start

    timeplan = []
    i = 0
    for plan, taxi in zip(plans, scenario["vehicles"]):
        i += 1
        cum_time = 0
        pos = [taxi["coordX"], taxi["coordY"]]
        customers = scenario["customers"]
        for customer_id in plan:
            customer = get_customer_by_id(customer_id, customers)
            time_to_dropoff = cost_for_customer(pos, customer, speed)
            pickup_pos = [customer[p] for p in ["coordX", "coordY"]]
            dropoff_pos = [customer[p] for p in ["destinationX", "destinationY"]]
            time_to_pickup = time_to_dropoff - cost_for_customer(pickup_pos, customer, speed)
            
            timeplan.append((cum_time + time_to_pickup, "pickup", i))
            timeplan.append((cum_time + time_to_dropoff, "dropoff", i))

            cum_time += time_to_dropoff
            pos = dropoff_pos

    timeplan.sort(key = lambda x: x[0])
    done, driving, waiting = 0, 0, len(scenario["customers"])
    x = [0]
    done_y, driving_y, waiting_y = [done],[driving],[waiting]

    for t in timeplan:
        x.append(t[0])
        if t[1] == "pickup":
            driving += 1
            waiting -= 1
        else:
            driving -= 1
            done += 1
        done_y.append(done)
        driving_y.append(driving)
        waiting_y.append(waiting)

    times = [t[0] for t in timeplan]
    if times:
        avg_wait_time = sum(times) / len(times)
        max_wait_time = max(times)
    else:
        avg_wait_time = 0
        max_wait_time = 0
    return {'x_axis': x,
            'y_axis': {'waiting': waiting_y, 'driving': driving_y, 'done': done_y},
            'avg_wait_time': avg_wait_time,
            'max_wait_time': max_wait_time,
            'compute_time': compute_time}

if __name__ == "__main__":
    print(forecast_stats(test, set(), 100, 11.11))