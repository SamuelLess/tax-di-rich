import { Fragment, useEffect, useMemo, useState } from 'react';
import { Marker, Polyline } from 'react-leaflet'
import { LCarIcon, LFlagIcon } from './LeafletIcon';
import { IRoute, routeSchema, routeLengths, getCoordinateAtPercentage } from './route';

interface IData {
    awaitingService: boolean;
    coordX: number;
    coordY: number;
    destinationX: number;
    destinationY: number;
    id: string;
    time: number;
}

const driveUrl = (data: IData) => {
	return `http://localhost:4546/ors/v2/directions/driving-car?start=${data.coordY},${data.coordX}&end=${data.destinationY},${data.destinationX}`
}

const fetchRoute = async (data: IData): Promise<IRoute | null> => {
	try {
		const URI = driveUrl(data);
		const res = await fetch(URI);
		const json = await res.json();
		return routeSchema.parse(json.features[0].geometry.coordinates).map(r => [r[1], r[0]]);
	} catch {
		return null;
	}
}

const Route = (props: { data: IData, elapsed: number }) => {

	const [route, setRoute] = useState<null | IRoute>(null);
	const routeLengthMap = useMemo(() => routeLengths(route), [route]);
	const [[markerCurX, markerCurY], setMarkerCur] = useState([props.data.coordX, props.data.coordY])
	const [[markerEndX, markerEndY], setMarkerEnd] = useState([props.data.destinationX, props.data.destinationY]);

	useEffect(() => {
		if (route && route.length > 0) {
			setMarkerEnd(route[route.length - 1])
			if (routeLengthMap !== null) {
				const perc = 100 / props.data.time * props.elapsed;
				const coord = getCoordinateAtPercentage(
					route, 
					routeLengthMap.lengths,
					routeLengthMap.totalLength,
					perc
				);
				setMarkerCur(coord);
			}
		}
	}, [route, routeLengthMap, props])
	
	useEffect(() => {
		fetchRoute(props.data).then(data => {
			if (data) setRoute(data)
		})
	}, [props.data])

	return (
		<Fragment>
			<Marker position={[markerCurX, markerCurY]} icon={LCarIcon()} />
			<Marker position={[markerEndX, markerEndY]} icon={LFlagIcon()} />
			{route ? <Polyline positions={route} color='red' /> : null}
		</Fragment>
	);

};

export default Route;
