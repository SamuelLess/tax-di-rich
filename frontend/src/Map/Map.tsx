import { LatLngExpression } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import Route from './Route';
import { blobSchema, IRoute, routeSchema } from './route';
import blob from "./blob.json";

const UPDATE_INTERVAL = 200;
const MUNICH_LATLONG: LatLngExpression = [48.137154, 11.576124];
// const data = blobSchema.parse(blob);

const Map = () => {

	// const start = useMemo(() => Date.now(), []);
	// const [time, setTime]= useState(0);

	// useEffect(() => {
	// 	const wait = (start + time + UPDATE_INTERVAL) - Date.now();
	// 	setTimeout(() => { setTime(time + UPDATE_INTERVAL) }, wait)
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [time])

	// useEffect(() => console.log(time), [time]);

	return (
		<MapContainer center={MUNICH_LATLONG} zoom={12} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
			<TileLayer
				attribution='&copy; <a href="https://carto.com/">Carto</a>'
				url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
			/>
			<Marker position={[48.113, 11.503302]} />
			<Marker position={[48.165312, 11.646708]} />
			{/* <Route data={data} elapsed={time}/> */}
		</MapContainer>
	);

};

export default Map;
