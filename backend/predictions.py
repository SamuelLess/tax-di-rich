from algorithm import create_plan, example_data
import timeit

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
    print(plans)
    done, driving, waiting = 0, 0, len(scenario["customers"])
    for taxi, plan in zip(plans, scenario["vehicles"]):
        
        pass
forecast_stats(example_data, 10, 11.11)