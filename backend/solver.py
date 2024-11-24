from ortools.constraint_solver import pywrapcp
from ortools.constraint_solver import routing_enums_pb2
import networkx as nx
import math

ACCURACY = 1

# def print_solution(vehicle_count, manager, routing, solution):
#     """Prints solution on console."""
#     print(f"Objective: {solution.ObjectiveValue()}")
    
#     print(f"")
#     max_route_distance = 0
#     total_distance = 0
#     for vehicle_id in range(vehicle_count):
#         index = routing.Start(vehicle_id)
#         plan_output = f"Route for vehicle {vehicle_id}:\n"
#         route_distance = 0
#         while not routing.IsEnd(index):
#             plan_output += f" {manager.IndexToNode(index)} -> "
#             previous_index = index
#             index = solution.Value(routing.NextVar(index))
#             route_distance += routing.GetArcCostForVehicle(
#                 previous_index, index, vehicle_id
#             )
#         plan_output += f"{manager.IndexToNode(index)}\n"
#         plan_output += f"Distance of the route: {route_distance}m\n"
#         total_distance += route_distance
#         print(plan_output)
#         max_route_distance = max(route_distance, max_route_distance)
#     print(f"Maximum of the route distances: {max_route_distance}m")
#     print(f"Total distance of all routes: {total_distance}m")

# def evaluate_solution(vehicle_count, routing, solution):
#     max_route_distance = 0
#     total_distance = 0
#     for vehicle_id in range(vehicle_count):
#         index = routing.Start(vehicle_id)
#         route_distance = 0
#         while not routing.IsEnd(index):
#             previous_index = index
#             index = solution.Value(routing.NextVar(index))
#             route_distance += routing.GetArcCostForVehicle(
#                 previous_index, index, vehicle_id
#             )
#         total_distance += route_distance
#         max_route_distance = max(route_distance, max_route_distance)
#     return max_route_distance, total_distance

# generates a list of the paths from the solution
def extract_solution(vehicle_count, manager, routing, solution, nodes):
    paths = []
    for vehicle_id in range(vehicle_count):
        index = routing.Start(vehicle_id)
        path = []
        while not routing.IsEnd(index):
            path.append(manager.IndexToNode(index))
            previous_index = index
            index = solution.Value(routing.NextVar(index))
        path.append(manager.IndexToNode(index))
        paths.append(list(map(lambda x: nodes[x], path)))
    return paths

def solve_tsp(G: nx.DiGraph, end_node_id: str, starting_node_ids: list[str], coefficient = 100):
    nodes = list(G.nodes())
    starting_nodes_indices = [nodes.index(node) for node in starting_node_ids]
    end_node_index = nodes.index(end_node_id)
    manager = pywrapcp.RoutingIndexManager(
        G.number_of_nodes(), len(starting_node_ids), starting_nodes_indices, [end_node_index] * len(starting_node_ids)
    )

    routing = pywrapcp.RoutingModel(manager)

    def distance_callback(from_index, to_index):
        from_node = manager.IndexToNode(from_index)
        to_node = manager.IndexToNode(to_index)

        if from_node == to_node:
            return 0
        if not G.has_edge(nodes[from_node], nodes[to_node]):
            return 212345 # this is infinity lol (beyond)
        our_weight = int(G.get_edge_data(nodes[from_node], nodes[to_node])['weight'])
        return our_weight

    penalty = 1000000
    for node in range(1, len(nodes)):
        if manager.NodeToIndex(node) < 0:
            continue
        routing.AddDisjunction([manager.NodeToIndex(node)], penalty)    

    transit_callback_index = routing.RegisterTransitCallback(distance_callback)
    routing.SetArcCostEvaluatorOfAllVehicles(transit_callback_index)
    search_parameters = pywrapcp.DefaultRoutingSearchParameters()
    #search_parameters.local_search_metaheuristic = (
    #routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
    search_parameters.time_limit.FromSeconds(5)
    search_parameters.first_solution_strategy = (
        routing_enums_pb2.FirstSolutionStrategy.PATH_CHEAPEST_ARC
    )
    
    dimension_name = "Distance"
    routing.AddDimension(
        transit_callback_index,
        0,
        # TODO: Do minutes
        int(100000 * 30 * 60 ), # Max time per car is 1 hour
        True,
        dimension_name,
    )

    distance_dimension = routing.GetDimensionOrDie(dimension_name)
    distance_dimension.SetGlobalSpanCostCoefficient(coefficient)

    solution = routing.SolveWithParameters(search_parameters)
    print(solution)
    if not solution:
        search_parameters.local_search_metaheuristic = (
        routing_enums_pb2.LocalSearchMetaheuristic.GUIDED_LOCAL_SEARCH)
        solution = routing.SolveWithParameters(search_parameters)
        print(solution)
    return extract_solution(len(starting_node_ids), manager, routing, solution, nodes)