import sys
import time

from tqdm import tqdm

from algorithm import create_plan
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
        else:
            res = single_scenario_rand(id_sc)
            print(res)
    else:
        print("Please provide a scenario id")
        exit(1)

def reset_scenario(id_sc):
    init_scenario(id_sc, init_anyway=True)


def single_example_algo(id_sc):
    reset_scenario(id_sc)
    run_scenario(id_sc, speed=SIMULATION_SPEED)
    return loop_sc(id_sc, SIMULATION_SPEED)


def single_scenario_rand(id_sc):
    reset_scenario(id_sc)
    run_scenario(id_sc, speed=SIMULATION_SPEED)
    return loop_over_scenario(id_sc)

def sample_scenario(id_sc, n=10):
    total_times = {"rand": [], "algo": []}
    for _ in tqdm(range(n)):
        res_rand = single_scenario_rand(id_sc)
        total_times['rand'].append(res_rand["totalTime"])
        res_algo = single_example_algo(id_sc)
        total_times['algo'].append(res_algo["totalTime"])
    return total_times | {'rand_avg': sum(total_times['rand'])/n, 'algo_avg': sum(total_times['algo'])/n}


def loop_over_scenario(id_sc):
    scenario_data = get_scenario(id_sc)
    while scenario_data["status"] != "COMPLETED":
        vhs_avail = [v["id"] for v in scenario_data['vehicles'] if v["isAvailable"]]
        cms_waiting = [c["id"] for c in scenario_data['customers'] if c["awaitingService"]]
        updates = [
            (vhs_avail[i], cms_waiting[i])
            for i in range(min(len(vhs_avail), len(cms_waiting)))
        ]
        if updates:
            send_cars(id_sc, updates)
        wait_time = time_to_next_change(get_vehicles(id_sc))
        time.sleep(wait_time * SIMULATION_SPEED*0.9)
        scenario_data = get_scenario(id_sc)
    return scenario_status(id_sc)

def loop_sc(id_sc, speed):
    sc_data = get_scenario(id_sc)
    #pprint(sc_data)
    while sc_data["status"] != "COMPLETED":
        solution = create_plan(sc_data)
        actions = []
        for vh, plan in zip(sc_data['vehicles'], solution):
            # vehicle available and not moving
            if vh['isAvailable']:
                if plan:
                    # send car to customer
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