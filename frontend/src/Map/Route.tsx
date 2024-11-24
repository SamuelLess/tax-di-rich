import { useEffect, useMemo, useState } from 'react';
import { Marker, Polyline } from 'react-leaflet'
import { IRoute, routeSchema, routeLengths, getCoordinateAtPercentage } from './route';
import { LCarIcon } from './LeafletIcon';

interface IPath {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}

const driveUrl = (data: IPath) => {
	return `http://localhost:4546/ors/v2/directions/driving-car?start=${data.startY},${data.startX}&end=${data.endY},${data.endX}`
}

const fetchRoute = async (data: IPath): Promise<IRoute | null> => {
	try {
		const URI = driveUrl(data);
		const res = await fetch(URI);
		const json = await res.json();
		return routeSchema.parse(json.features[0].geometry.coordinates).map(r => [r[1], r[0]]);
	} catch {
		return null;
	}
}

const Route = (props: { path: IPath, iconPos: number | null, active: boolean }) => {
	const [route, setRoute] = useState<null | IRoute>(null);
	const routeLengthMap = useMemo(() => routeLengths(route), [route]);

	useEffect(() => {
		fetchRoute(props.path).then(data => {
			if (data) setRoute(data)
		})
	}, [props.path])


	if(route === null) return null;
	if(routeLengthMap === null) return null;

	let coord: [number, number] | null = null;

	if(props.iconPos !== null) {
		coord = getCoordinateAtPercentage(
			route, 
			routeLengthMap.lengths,
			routeLengthMap.totalLength,
			props.iconPos * 100
		);
	}


	return (
		<>
			{coord ? <Marker position={coord} icon={LCarIcon()} /> : null}
			{route ? <Polyline positions={route} color={"#bca0bd"} weight={props.active ? 3:1} opacity={props.active? 1: 0.8}/> : null}
		</>
	);

};

export default Route;
