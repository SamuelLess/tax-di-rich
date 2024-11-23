import haversineDistance from "haversine-distance";
import * as z from "zod";

export const blobSchema = z.object({
	"customers": z.array(z.object({
		"awaitingService": z.boolean(),
		"coordX": z.number(),
		"coordY": z.number(),
		"destinationX": z.number(),
		"destinationY": z.number(),
		"id": z.string(),
	})),
	"endTime": z.null(),
	"id": z.string(),
	"startTime": z.string(),
	"status": z.string(),
	"vehicles": z.array(z.object({
		"activeTime": z.number(),
		"coordX": z.number(),
		"coordY": z.number(),
		"customerId": z.string(),
		"distanceTravelled": z.number(),
		"id": z.string(),
		"isAvailable": z.boolean(),
		"numberOfTrips": z.number(),
		"remainingTravelTime": z.nullable(z.number()),
		"vehicleSpeed": z.number()
	}))
});

export type IBlob = z.infer<typeof blobSchema>;

export const routeSchema = z.array(
	z.tuple([z.number(), z.number()])
);

export type IRoute = z.infer<typeof routeSchema>;

// Function to calculate relative distances and total length
export const routeLengths = (routes: null | IRoute): null | { lengths: number[]; totalLength: number } => {
	if (routes === null || routes.length < 2) return null;

	const lengths: number[] = [];
	let totalLength = 0;

	for (let i = 0; i < routes.length - 1; i++) {
		const distance = haversineDistance(routes[i], routes[i + 1]);
		lengths.push(distance);
		totalLength += distance;
	}

	return { lengths, totalLength };
};

// Function to get the coordinate at a given percentage along the route
export const getCoordinateAtPercentage = (
	routes: IRoute,
	lengths: number[],
	totalLength: number,
	percentage: number
): [number, number] => {
	if (percentage <= 0) return routes[0];
	if (percentage >= 100) return routes[routes.length - 1];

	const targetDistance = (percentage / 100) * totalLength;
	let accumulatedDistance = 0;

	for (let i = 0; i < lengths.length; i++) {
		const segmentDistance = lengths[i];
		if (accumulatedDistance + segmentDistance >= targetDistance) {
			// Interpolate between routes[i] and routes[i + 1]
			const ratio = (targetDistance - accumulatedDistance) / segmentDistance;
			const [x1, y1] = routes[i];
			const [x2, y2] = routes[i + 1];
			
			const interpolatedX = x1 + ratio * (x2 - x1);
			const interpolatedY = y1 + ratio * (y2 - y1);
			
			return [interpolatedX, interpolatedY];
		}
		accumulatedDistance += segmentDistance;
	}

	return routes[routes.length - 1];
};
