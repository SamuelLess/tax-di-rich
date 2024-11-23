import { CarProfile, FlagCheckered } from '@phosphor-icons/react';
import { LatLngExpression } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, Polyline, TileLayer } from 'react-leaflet'
import * as z from "zod";
import LeafletIcon from './LeafletIcon';

const data = {
	"awaitingService": true,
	"coordX": 48.134514,
	"coordY": 11.629375,
	"destinationX": 48.14834,
	"destinationY": 11.588274,
	"id": "a3f1c04f-64a5-4e33-b872-3a13151924d7",
	"time": 32,
};

const MUNICH_LATLONG: LatLngExpression = [48.137154, 11.576124];

const driveUrl = (startX: number, startY: number, endX: number, endY: number) => {
	return `http://localhost:4546/ors/v2/directions/driving-car?start=${startY},${startX}&end=${endY},${endX}`
}

const routeSchema = z.array(
	z.tuple([z.number(), z.number()])
);

type Route = z.infer<typeof routeSchema>;

const Map = () => {

	const [route, setRoute] = useState<null | Route>(null);

	const start = useMemo(() => Date.now(), []);
	const [time, setTime]= useState(data.time);
	
	useEffect(() => {
		const URL = driveUrl(data.coordX, data.coordY, data.destinationX, data.destinationY);
		fetch(URL).then(e => {
			e.json().then(j => {
				const res = routeSchema.safeParse(j.features[0].geometry.coordinates);
				console.log(res.data);
				if (res.success) setRoute(res.data);
			});
		})
	}, []);

	return (
		<MapContainer center={MUNICH_LATLONG} zoom={11} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[data.coordX, data.coordY]} icon={LeafletIcon(<CarProfile size={32} color="#000000" weight="fill" />)} />
			<Marker position={[data.destinationX, data.destinationY]} icon={LeafletIcon(<FlagCheckered size={32} color="#000000" weight="fill" />)} />
			{route ? <Polyline positions={route.map(r => [r[1], r[0]])} color='red' /> : null}
		</MapContainer>
	);

};

export default Map;
