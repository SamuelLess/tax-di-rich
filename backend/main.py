import sys
import threading
import time
from pprint import pprint

import matplotlib.pyplot as plt

from algorithm import create_plan
from algorithm import create_plan_greedy
from scenario import get_customers
from scenario import (
    get_vehicles,
    get_scenario,
    send_cars,
    scenario_status,
    time_to_next_change,
    init_scenario,
    run_scenario,
)

SIMULATION_SPEED = 0.1


def main():
    # get id from args
    if len(sys.argv) > 1:
        id_sc = sys.argv[1]
        init_scenario(id_sc)
    else:
        print("Please provide a scenario id")
        exit(1)
    run_scenario(id_sc, speed=SIMULATION_SPEED)
    loop_over_scenario(id_sc)

def loop_step(id_sc, served_customers, use_efficient):
    """UPDATED START TIMES
    id => startRemainingTravelTime
    """
    sc_data = get_scenario(id_sc)
    pprint(get_vehicles(id_sc))
    pprint(get_customers(id_sc))
    solution = create_plan_greedy(sc_data, served_customers) if use_efficient else create_plan(sc_data, served_customers)
    print(f"{solution=}")
    actions = []
    for vh, plan in zip(sc_data['vehicles'], solution):
        #print(f"Vehicle {vh['id']} -> {plan}")
        # vehicle available and not moving
        if vh['isAvailable']:
            if plan:
                # send car to customer
                actions.append((vh['id'], plan[0]))

    #vis_scenario(id_sc)
    print(scenario_status(id_sc))
    print(f"Sending {len(actions)} cars...")
    rsp = send_cars(id_sc, actions)
    update_dict = {}
    update_pos_dict = {}
    newly_served = []
    for vh in rsp.get('updatedVehicles', []):
        v_id = vh['id']
        remaining_travel_time = vh['remainingTravelTime']
        update_dict[v_id] = remaining_travel_time
        update_pos_dict[v_id] = (vh['coordX'], vh['coordY'])
        newly_served.append(vh['customerId'])

    wait_time = time_to_next_change(get_vehicles(id_sc))
    return wait_time, len(actions) > 0, update_dict, update_pos_dict, newly_served


def loop_over_scenario(id_sc):
    """status is 'CREATED' | 'RUNNING' | 'COMPLETED'"""
    scenario_data = get_scenario(id_sc)
    pprint(scenario_data)
    while scenario_data["status"] != "COMPLETED":
        wait_time = loop_step(id_sc)
        time.sleep(wait_time * SIMULATION_SPEED)
        scenario_data = get_scenario(id_sc)
    print("Scenario completed")
    pprint(get_scenario(id_sc))
    pprint(scenario_status(id_sc))


# def vis_scenario(id_sc: str):
#     # /scenarios/{scenarioId}/customers
#     """
#     [{'awaitingService': True,
#       'coordX': 48.120827,
#       'coordY': 11.568981,
#       'destinationX': 48.117657,
#       'destinationY': 11.636292,
#       'id': '8107e047-636d-46c5-bfe6-0c07d00042ee'}]
#     """
#     customers = get_customers(id_sc)
#     customers_waiting = get_customers_waiting_ids(id_sc)
#     # /scenarios/{scenarioId}/vehicles
#     vehicles = get_vehicles(id_sc)
#     # create graph with networkx and show
#     G = nx.Graph()
#     for customer in customers:
#         G.add_node(
#             f"C{'W' if customer['awaitingService'] else ''}-{short_id(customer["id"])}",
#             pos=(customer["coordY"], customer["coordX"]),
#         )
#     for vehicle in vehicles:
#         G.add_node(
#             f"V-{short_id(vehicle["id"])}",
#             pos=(vehicle["coordY"], vehicle["coordX"]),
#         )
#     # draw vehicle nodes in red
#     # nx.draw_networkx_nodes(G, nx.get_node_attributes(G, 'pos'), nodelist=[node for node in G.nodes if node.startswith("V")], node_color='r')
#     nx.draw(G, nx.get_node_attributes(G, "pos"), with_labels=True, font_size=12)
#     # color vehicle nodes in red
#     nx.draw_networkx_nodes(
#         G,
#         nx.get_node_attributes(G, "pos"),
#         nodelist=[node for node in G.nodes if node.startswith("V")],
#         node_color="r",
#     )
#     # color waiting customers in orange
#     nx.draw_networkx_nodes(
#         G,
#         nx.get_node_attributes(G, "pos"),
#         nodelist=[node for node in G.nodes if node.startswith("CW")],
#         node_color="orange",
#     )
#     plt_show_sec(1)  # show for 3 sec


def plt_show_sec(duration: float = 3):
    def _stop():
        time.sleep(duration)
        plt.close()

    if duration:
        threading.Thread(target=_stop).start()
    plt.show(block=False)
    plt.pause(duration)


if __name__ == "__main__":
    main()