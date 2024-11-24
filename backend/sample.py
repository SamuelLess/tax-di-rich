import json
import sys
import time
from pprint import pprint

from tqdm import tqdm

from algorithm import create_plan, create_plan_greedy, create_plan_random
from scenario import (
    get_vehicles,
    get_scenario,
    send_cars,
    scenario_status,
    time_to_next_change,
    init_scenario,
    run_scenario,
)

SIMULATION_SPEED = 0.005

def main():
    # get id from args
    if len(sys.argv) > 1:
        id_sc = sys.argv[1]
        if len (sys.argv) > 2:
            n = int(sys.argv[2])
            print(f"Running {n} samples...")
            smp = sample_scenario(id_sc, n)
            print(smp)
            # write to file with `sample-MM-DD-HH-MM.json`
            with open(f"sample-{time.strftime('%m-%d-%H-%M')}.json", "w") as f:
                f.write(json.dumps(smp))
    else:
        print("Please provide a scenario id")
        exit(1)

def reset_scenario(id_sc):
    init_scenario(id_sc, init_anyway=True)


def single_example_algo(id_sc, plan_algo):
    reset_scenario(id_sc)
    run_scenario(id_sc, speed=SIMULATION_SPEED)
    return loop_create_plan(id_sc, SIMULATION_SPEED, plan_algo)


def sample_scenario(id_sc, n=10):
    algos = ['RAND', 'GREEDY', 'ALGO']
    total_times = {alg.lower(): [] for alg in algos}
    for _ in tqdm(range(n)):
        for algo in algos:
            res = single_example_algo(id_sc, algo)
            total_times[algo.lower()].append(res["totalTime"])
        print(total_times)
    return total_times | {f"{alg}-avg": sum(times) / len(times) for alg, times in total_times.items()}
    

import typing as t

def loop_create_plan(id_sc, speed, plan_algo: str):
    sc_data = get_scenario(id_sc)
    while sc_data["status"] != "COMPLETED":
        match plan_algo:
            case 'RAND':
                solution = create_plan_random(sc_data)
            case 'GREEDY':
                solution = create_plan_greedy(sc_data)
            case _:
                solution = create_plan(sc_data)
        actions = []
        for vh, plan in zip(sc_data['vehicles'], solution):
            # vehicle available and not moving
            if vh['isAvailable'] and plan:
                actions.append((vh['id'], plan[0]))
        if actions:
            rsp = send_cars(id_sc, actions)
            if rsp.get("message"):
                break
        wait_time = time_to_next_change(get_vehicles(id_sc))
        time.sleep(wait_time * speed)
        sc_data = get_scenario(id_sc)
    return scenario_status(id_sc)




if __name__ == "__main__":
    main()