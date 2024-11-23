from algorithm import create_plan, example_data
import timeit

# record with done, in_progress, waiting declaration
# class Statistics:    
#     def __init__(self):
#         self.done = 0
#         self.in_progress = 0
#         self.waiting = 0


def forecast_stats(scenario, coefficient, speed):
    plan = create_plan(scenario, coefficient, speed)
    print(plan)

forecast_stats(example_data, 10, 11.11)