
/* {
  "data": {
    "customers": [
      {
        "awaitingService": true,
        "coordX": 48.131012,
        "coordY": 11.5564375,
        "destinationX": 48.113033,
        "destinationY": 11.568869,
        "id": "32f2922a-1dfc-41b1-b094-2b06bc4e03a4"
      },
      {
        "awaitingService": true,
        "coordX": 48.143414,
        "coordY": 11.527084,
        "destinationX": 48.160423,
        "destinationY": 11.587505,
        "id": "9c339354-80bf-4a98-90bf-b79ad64f9e73"
      },
      {
        "awaitingService": true,
        "coordX": 48.127037,
        "coordY": 11.646385,
        "destinationX": 48.16409,
        "destinationY": 11.512558,
        "id": "d18b1f67-03fc-4066-9c7d-2e52b33b4d7a"
      },
      {
        "awaitingService": true,
        "coordX": 48.160366,
        "coordY": 11.518657,
        "destinationX": 48.14299,
        "destinationY": 11.526316,
        "id": "192fe4bb-e74c-4379-b395-348e4cafa4d2"
      },
      {
        "awaitingService": true,
        "coordX": 48.164375,
        "coordY": 11.627476,
        "destinationX": 48.13174,
        "destinationY": 11.607468,
        "id": "95c53b6e-90ed-43ed-ada3-4ec007c6da68"
      },
      {
        "awaitingService": true,
        "coordX": 48.119347,
        "coordY": 11.550307,
        "destinationX": 48.153965,
        "destinationY": 11.591483,
        "id": "a7212e9c-8eee-4153-a472-b7730577d4a0"
      },
      {
        "awaitingService": true,
        "coordX": 48.133938,
        "coordY": 11.577026,
        "destinationX": 48.161133,
        "destinationY": 11.611403,
        "id": "4c8a920c-23c1-42d9-8403-da5ac4652ec1"
      },
      {
        "awaitingService": true,
        "coordX": 48.153194,
        "coordY": 11.529422,
        "destinationX": 48.136623,
        "destinationY": 11.643439,
        "id": "7355879e-3185-4ce0-98ab-26d98726be76"
      },
      {
        "awaitingService": true,
        "coordX": 48.12232,
        "coordY": 11.5216,
        "destinationX": 48.140873,
        "destinationY": 11.555827,
        "id": "a298ce12-894a-444b-a59b-5043a78f4ebd"
      },
      {
        "awaitingService": true,
        "coordX": 48.148335,
        "coordY": 11.553262,
        "destinationX": 48.136665,
        "destinationY": 11.645538,
        "id": "7e53751c-1e8d-4eb0-87ec-fc87c8cfbac5"
      }
    ],
    "endTime": null,
    "id": "9e665ffe-4fd4-4387-b35e-1166bc5f8268",
    "startTime": "2024-11-23T17:17:07.354927",
    "status": "RUNNING",
    "vehicles": [
      {
        "activeTime": 0,
        "coordX": 48.146935,
        "coordY": 11.564984,
        "customerId": null,
        "distanceTravelled": 0,
        "id": "0311ce60-a54c-40e0-858c-173a99b74d2b",
        "isAvailable": true,
        "numberOfTrips": 0,
        "remainingTravelTime": 0,
        "vehicleSpeed": null
      },
      {
        "activeTime": 0,
        "coordX": 48.15688,
        "coordY": 11.593828,
        "customerId": null,
        "distanceTravelled": 0,
        "id": "7a1eef77-446e-4cc4-ab29-d71b593ca685",
        "isAvailable": true,
        "numberOfTrips": 0,
        "remainingTravelTime": 0,
        "vehicleSpeed": null
      },
      {
        "activeTime": 0,
        "coordX": 48.1562,
        "coordY": 11.594148,
        "customerId": null,
        "distanceTravelled": 0,
        "id": "6db8143f-6fee-4e79-bc84-d4233dd651f0",
        "isAvailable": true,
        "numberOfTrips": 0,
        "remainingTravelTime": 0,
        "vehicleSpeed": null
      },
      {
        "activeTime": 0,
        "coordX": 48.16334,
        "coordY": 11.600612,
        "customerId": null,
        "distanceTravelled": 0,
        "id": "3b63bd52-ac00-49a8-b48a-c9ca85d71763",
        "isAvailable": true,
        "numberOfTrips": 0,
        "remainingTravelTime": 0,
        "vehicleSpeed": null
      },
      {
        "activeTime": 0,
        "coordX": 48.11982,
        "coordY": 11.51261,
        "customerId": null,
        "distanceTravelled": 0,
        "id": "badaa743-4c2f-4c0a-aca2-0c9db9801515",
        "isAvailable": true,
        "numberOfTrips": 0,
        "remainingTravelTime": 0,
        "vehicleSpeed": null
      }
    ]
  },
  "status": {
    "totalCustomers": 10,
    "totalVehicles": 5,
    "vehiclesMoving": 0,
    "vehiclesAvailable": 5,
    "customersWaiting": 10,
    "status": "RUNNING",
    "totalTime": 0,
    "totalDistance": 0,
    "averageDistance": 0,
    "distances": [
      0,
      0,
      0,
      0,
      0
    ],
    "totalTrips": 0
  },
  "start_remaining_time": {
    "0311ce60-a54c-40e0-858c-173a99b74d2b": 66,
    "7a1eef77-446e-4cc4-ab29-d71b593ca685": 476,
    "6db8143f-6fee-4e79-bc84-d4233dd651f0": 451,
    "3b63bd52-ac00-49a8-b48a-c9ca85d71763": 185,
    "badaa743-4c2f-4c0a-aca2-0c9db9801515": 245
  }
} */


export interface Scenario {
    customers: Customer[];
    endTime: string;
    id: string;
    startTime: string;
    status: string;
    vehicles: Vehicle[];
}

export interface Customer {
    awaitingService: boolean;
    coordX: number;
    coordY: number;
    destinationX: number;
    destinationY: number;
    id: string;
}

export interface Vehicle {
    activeTime: number;
    coordX: number;
    coordY: number;
    customerId: string;
    distanceTravelled: number;
    id: string;
    isAvailable: boolean;
    numberOfTrips: number;
    remainingTravelTime: number;
    vehicleSpeed: number;
}


