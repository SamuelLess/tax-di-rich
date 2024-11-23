import sys
import threading
import time
from pprint import pprint

from aiohttp import web
import socketio


import matplotlib.pyplot as plt
import networkx as nx

from scenario import (
    get_customers,
    get_customers_waiting_ids,
    get_vehicles,
    short_id,
    get_scenario,
    send_cars,
    scenario_status,
    time_to_next_change,
    get_vehicles_available_ids,
    init_scenario,
    run_scenario,
)

SIMULATION_SPEED = 0.005

sio = socketio.AsyncServer(cors_allowed_origins='*')

def start_web_server():
    app = web.Application()
    sio.attach(app)
    app.add_routes([web.get('/', default_page)])
    web.run_app(app, port=9090)


def main():
    # get id from args
    if len(sys.argv) > 1:
        id_sc = sys.argv[1]
        init_scenario(id_sc)
    else:
        print("Please provide a scenario id")
        exit(1)
    run_scenario(id_sc, speed=SIMULATION_SPEED)

    web_thread = threading.Thread(target=start_web_server)
    web_thread.start()

    loop_over_scenario(id_sc)

async def default_page(request):
    return web.Response(text="The backend for marjapussi is up and running.")

def loop_over_scenario(id_sc):
    """status is 'CREATED' | 'RUNNING' | 'COMPLETED'"""
    scenario_data = get_scenario(id_sc)
    pprint(scenario_data)
    while scenario_data["status"] != "COMPLETED":
        pprint(get_scenario(id_sc))
        sio.start_background_task(sio.emit, 'updates', scenario_status(id_sc))
        vis_scenario(id_sc)
        print(scenario_status(id_sc))
        vhs_avail = get_vehicles_available_ids(id_sc)
        cms_waiting = get_customers_waiting_ids(id_sc)
        print(f"{vhs_avail=}")
        print(f"{cms_waiting=}")
        updates = [
            (vhs_avail[i], cms_waiting[i])
            for i in range(min(len(vhs_avail), len(cms_waiting)))
        ]
        print(f"Sending {len(updates)} cars...")
        rsp = send_cars(id_sc, updates)
        pprint(rsp)
        wait_time = time_to_next_change(id_sc)
        print(
            f"Sleeping for {wait_time}*{SIMULATION_SPEED}={wait_time*SIMULATION_SPEED} seconds..."
        )
        time.sleep(wait_time * SIMULATION_SPEED)
        scenario_data = get_scenario(id_sc)
    print("Scenario completed")
    pprint(get_scenario(id_sc))
    pprint(scenario_status(id_sc))


def vis_scenario(id_sc: str):
    # /scenarios/{scenarioId}/customers
    """
    [{'awaitingService': True,
      'coordX': 48.120827,
      'coordY': 11.568981,
      'destinationX': 48.117657,
      'destinationY': 11.636292,
      'id': '8107e047-636d-46c5-bfe6-0c07d00042ee'}]
    """
    customers = get_customers(id_sc)
    customers_waiting = get_customers_waiting_ids(id_sc)
    # /scenarios/{scenarioId}/vehicles
    vehicles = get_vehicles(id_sc)
    # create graph with networkx and show
    G = nx.Graph()
    for customer in customers:
        G.add_node(
            f"C{'W' if customer['awaitingService'] else ''}-{short_id(customer["id"])}",
            pos=(customer["coordY"], customer["coordX"]),
        )
    for vehicle in vehicles:
        G.add_node(
            f"V-{short_id(vehicle["id"])}",
            pos=(vehicle["coordY"], vehicle["coordX"]),
        )
    # draw vehicle nodes in red
    # nx.draw_networkx_nodes(G, nx.get_node_attributes(G, 'pos'), nodelist=[node for node in G.nodes if node.startswith("V")], node_color='r')
    nx.draw(G, nx.get_node_attributes(G, "pos"), with_labels=True, font_size=12)
    # color vehicle nodes in red
    nx.draw_networkx_nodes(
        G,
        nx.get_node_attributes(G, "pos"),
        nodelist=[node for node in G.nodes if node.startswith("V")],
        node_color="r",
    )
    # color waiting customers in orange
    nx.draw_networkx_nodes(
        G,
        nx.get_node_attributes(G, "pos"),
        nodelist=[node for node in G.nodes if node.startswith("CW")],
        node_color="orange",
    )
    plt_show_sec(1)  # show for 3 sec


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