from algorithm import create_plan, example_data, cost_for_customer
import timeit
import matplotlib.pyplot as plt

test = {
  "id": "844643e8-4f2d-49be-be7b-1e02791183ab",
  "startTime": None,
  "endTime": None,
  "status": "CREATED",
  "vehicles": [
    {
      "id": "5738d6e9-5239-4abd-b084-a1e78e6bc901",
      "coordX": 48.141216,
      "coordY": 11.568132,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "9e0ce349-0036-4d39-a230-ea2a8766e43c",
      "coordX": 48.130352,
      "coordY": 11.60285,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "2e0b73b8-0a69-42a8-841d-099f53190067",
      "coordX": 48.12123,
      "coordY": 11.51631,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "6b010859-8bb6-428d-a734-463f0c42f433",
      "coordX": 48.16463,
      "coordY": 11.634949,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "9c266ae5-b63d-49a7-85ad-ac6ceddd1226",
      "coordX": 48.148705,
      "coordY": 11.528259,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "1c376a44-f9c9-4dec-a125-957df856bbc7",
      "coordX": 48.123684,
      "coordY": 11.620317,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "8d57c6ea-dd60-4500-9afc-9fb671745dbb",
      "coordX": 48.150043,
      "coordY": 11.508726,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "09d78b01-1cfb-49be-8cb3-cf5b99320e9c",
      "coordX": 48.124615,
      "coordY": 11.5309305,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "ea8fe46a-0247-4da5-991b-ab9aed807eff",
      "coordX": 48.145317,
      "coordY": 11.576272,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "ebda2e0b-bacf-4e2b-8244-a730584adedb",
      "coordX": 48.15434,
      "coordY": 11.552818,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "4ea6d7aa-acb9-4bb1-a5dc-81239e01ff00",
      "coordX": 48.15722,
      "coordY": 11.607761,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "f6cc830d-b694-4041-a932-e975a61988b0",
      "coordX": 48.13121,
      "coordY": 11.519577,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "df49a2d3-d643-4715-b5fa-be54ae82294d",
      "coordX": 48.11762,
      "coordY": 11.625549,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "934cff7d-5bd0-45b6-b724-8366486c2e31",
      "coordX": 48.130096,
      "coordY": 11.62497,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "f1242172-2bf7-46c2-83eb-cce3f71d815e",
      "coordX": 48.136215,
      "coordY": 11.580951,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "0fdbae11-cd7b-40b8-b066-8919dfb965c1",
      "coordX": 48.124783,
      "coordY": 11.642542,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "a6dc30be-71ac-4a50-963f-22728a9d8bf8",
      "coordX": 48.147053,
      "coordY": 11.512948,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "2bc5d1ed-f564-47ed-86fc-6505b39be3e5",
      "coordX": 48.132378,
      "coordY": 11.631206,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "9a5a994a-93fa-4f97-a3d4-06b8a574dbce",
      "coordX": 48.116554,
      "coordY": 11.568157,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "e62cb3bb-afc6-426b-b662-0be05520a86a",
      "coordX": 48.152462,
      "coordY": 11.535001,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "186683be-3c81-493e-9a32-d1a9f40014e1",
      "coordX": 48.122295,
      "coordY": 11.618255,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "dc79e05b-d054-4a25-8e40-0451a50d8059",
      "coordX": 48.12661,
      "coordY": 11.563639,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "4f51f11b-c5b0-4e28-82b3-f63c71616c9d",
      "coordX": 48.159504,
      "coordY": 11.578336,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "d627258f-2ca9-43d5-9666-b193a0433a08",
      "coordX": 48.13154,
      "coordY": 11.525623,
      "isAvailable": True,
      "vehicleSpeed": None,
      "customerId": None,
      "remainingTravelTime": None,
      "distanceTravelled": None,
      "activeTime": None,
      "numberOfTrips": None
    },
    {
      "id": "1f20a96e-20a7-4fe3-a454-249f46c1d593",
      "coordX": 48.149307,
      "coordY": 11.561167,
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
      "id": "9d077792-9c51-4dee-8738-a127065b2865",
      "coordX": 48.134872,
      "coordY": 11.5084505,
      "destinationX": 48.12021,
      "destinationY": 11.608032,
      "awaitingService": True
    },
    {
      "id": "50d850f0-b1d2-42e0-9471-44ef82f8402d",
      "coordX": 48.132893,
      "coordY": 11.62668,
      "destinationX": 48.141766,
      "destinationY": 11.592237,
      "awaitingService": True
    },
    {
      "id": "44997488-7007-423f-9aba-6884cea8f3f0",
      "coordX": 48.13642,
      "coordY": 11.598536,
      "destinationX": 48.162918,
      "destinationY": 11.535421,
      "awaitingService": True
    },
    {
      "id": "672d3aee-d6cd-4444-a903-7bd1837701a4",
      "coordX": 48.114296,
      "coordY": 11.591361,
      "destinationX": 48.127697,
      "destinationY": 11.528258,
      "awaitingService": True
    },
    {
      "id": "4d468ffe-54b6-45b7-adaa-d0e1bab7b214",
      "coordX": 48.149273,
      "coordY": 11.601911,
      "destinationX": 48.135563,
      "destinationY": 11.531565,
      "awaitingService": True
    },
    {
      "id": "d56bb66e-c0bf-4c04-a88b-23aa51799f4c",
      "coordX": 48.127697,
      "coordY": 11.596948,
      "destinationX": 48.139076,
      "destinationY": 11.588391,
      "awaitingService": True
    },
    {
      "id": "b4b63d5a-37a7-4fb5-be88-163c8615b412",
      "coordX": 48.14598,
      "coordY": 11.517451,
      "destinationX": 48.12914,
      "destinationY": 11.607777,
      "awaitingService": True
    },
    {
      "id": "5229de8d-eceb-430d-afe3-783b1e5c116e",
      "coordX": 48.11956,
      "coordY": 11.612997,
      "destinationX": 48.127438,
      "destinationY": 11.6159315,
      "awaitingService": True
    },
    {
      "id": "c0cefd24-f3fb-4600-bd8c-737c47ccd34b",
      "coordX": 48.149776,
      "coordY": 11.528684,
      "destinationX": 48.161724,
      "destinationY": 11.508077,
      "awaitingService": True
    },
    {
      "id": "2a6c2076-aa01-46cc-94b4-1308a67911d6",
      "coordX": 48.137894,
      "coordY": 11.525591,
      "destinationX": 48.11727,
      "destinationY": 11.644927,
      "awaitingService": True
    },
    {
      "id": "a50c9253-3670-4ab8-9f57-18d468a3f527",
      "coordX": 48.148167,
      "coordY": 11.574461,
      "destinationX": 48.162975,
      "destinationY": 11.507579,
      "awaitingService": True
    },
    {
      "id": "a42788a4-7ef6-4efc-ac2b-e67fd6190b13",
      "coordX": 48.124146,
      "coordY": 11.575691,
      "destinationX": 48.124107,
      "destinationY": 11.565508,
      "awaitingService": True
    },
    {
      "id": "faaa9288-51cc-4706-9c21-3924e44ce9b9",
      "coordX": 48.139706,
      "coordY": 11.508011,
      "destinationX": 48.122578,
      "destinationY": 11.524872,
      "awaitingService": True
    },
    {
      "id": "6ee17b82-6e56-4bdd-9301-deb8e55a3d2e",
      "coordX": 48.160397,
      "coordY": 11.601595,
      "destinationX": 48.156845,
      "destinationY": 11.516103,
      "awaitingService": True
    },
    {
      "id": "88999342-cb5b-4405-86c6-ae28eb34bf57",
      "coordX": 48.14885,
      "coordY": 11.615343,
      "destinationX": 48.133793,
      "destinationY": 11.635403,
      "awaitingService": True
    },
    {
      "id": "28421308-1dea-4d29-9335-126e50abbffa",
      "coordX": 48.1341,
      "coordY": 11.521277,
      "destinationX": 48.132107,
      "destinationY": 11.63683,
      "awaitingService": True
    },
    {
      "id": "84567f13-8ad8-48f3-954a-9563009f634e",
      "coordX": 48.14917,
      "coordY": 11.558083,
      "destinationX": 48.131,
      "destinationY": 11.614311,
      "awaitingService": True
    },
    {
      "id": "ade35e23-a14b-4bc8-b6e4-40b216d70305",
      "coordX": 48.115345,
      "coordY": 11.605407,
      "destinationX": 48.13558,
      "destinationY": 11.597269,
      "awaitingService": True
    },
    {
      "id": "c3b6427e-5ea2-47b7-b09e-ba082d9dd968",
      "coordX": 48.142838,
      "coordY": 11.592361,
      "destinationX": 48.155552,
      "destinationY": 11.636963,
      "awaitingService": True
    },
    {
      "id": "783393f0-0796-4025-ad6a-3e35670d9813",
      "coordX": 48.14263,
      "coordY": 11.569051,
      "destinationX": 48.150253,
      "destinationY": 11.564348,
      "awaitingService": True
    },
    {
      "id": "0e721ca6-b5e4-4768-ae1a-ddad9b43a20c",
      "coordX": 48.124187,
      "coordY": 11.549949,
      "destinationX": 48.113033,
      "destinationY": 11.598,
      "awaitingService": True
    },
    {
      "id": "f90bebb1-ed33-4185-a663-938c1e5660bb",
      "coordX": 48.15163,
      "coordY": 11.504105,
      "destinationX": 48.164627,
      "destinationY": 11.6269045,
      "awaitingService": True
    },
    {
      "id": "3f7a3179-e592-4a63-8194-29f2e489ee8c",
      "coordX": 48.132698,
      "coordY": 11.619502,
      "destinationX": 48.161526,
      "destinationY": 11.62746,
      "awaitingService": True
    },
    {
      "id": "c8efe1f4-baa3-4f36-b7ea-179c6929a22d",
      "coordX": 48.153954,
      "coordY": 11.568409,
      "destinationX": 48.145874,
      "destinationY": 11.56894,
      "awaitingService": True
    },
    {
      "id": "69b0e891-7552-4053-9f33-fbea89165139",
      "coordX": 48.129093,
      "coordY": 11.614067,
      "destinationX": 48.165157,
      "destinationY": 11.5717325,
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
    avg_wait_time = sum(times) / len(times)
    max_wait_time = max(times)
    
    return x, waiting_y, driving_y, done_y, avg_wait_time, max_wait_time, compute_time

if __name__ == "__main__":
    print(forecast_stats(test, 100, 11.11))