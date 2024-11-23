from algorithm import create_plan, example_data, cost_for_customer
import timeit
import matplotlib.pyplot as plt

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
    plans = create_plan(scenario, coefficient, speed)

    timeplan = []
    i = 0
    for plan, taxi in zip(plans, scenario["vehicles"]):
        i += 1
        time = 0
        pos = [taxi["coordX"], taxi["coordY"]]
        customers = scenario["customers"]
        for customer_id in plan:
            customer = get_customer_by_id(customer_id, customers)
            time_to_dropoff = cost_for_customer(pos, customer, speed)
            pickup_pos = [customer[p] for p in ["coordX", "coordY"]]
            time_to_pickup = time_to_dropoff - cost_for_customer(pickup_pos, customer, speed)
            
            timeplan.append((time + time_to_pickup, "pickup", i))
            timeplan.append((time + time_to_dropoff, "dropoff", i))

            time += time_to_dropoff
            pos = pickup_pos

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

    plt.plot(x, done_y, label="Done")
    plt.plot(x, driving_y, label="Driving")
    plt.plot(x, waiting_y, label="Waiting")

    plt.xlabel("X-axis")
    plt.ylabel("Y-axis")
    plt.legend()
    plt.show()

forecast_stats(example_data, 10, 11.11)