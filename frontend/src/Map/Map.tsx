import { LatLngExpression } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import Route from './Route';

const MUNICH_LATLONG: LatLngExpression = [48.137154, 11.576124];

const data = {
	"awaitingService": true,
	"coordX": 48.134514,
	"coordY": 11.629375,
	"destinationX": 48.14834,
	"destinationY": 11.588274,
	"id": "a3f1c04f-64a5-4e33-b872-3a13151924d7",
	"time": 10,
};

const Map = () => {

	const start = useMemo(() => Date.now(), []);
	const [time, setTime]= useState(0);

	useEffect(() => {
		const wait = (start + (time) * 1000 + 200) - Date.now();
		setTimeout(() => { setTime(time + 0.2) }, wait)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [time])

	useEffect(() => console.log(time), [time]);

	return (
		<MapContainer center={MUNICH_LATLONG} zoom={11} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Route data={data} elapsed={time}/>
		</MapContainer>
	);

};

export default Map;
