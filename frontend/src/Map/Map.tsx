import { LatLngExpression } from 'leaflet';
import { useEffect, useMemo, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import Route from './Route';
import { blobSchema, IRoute, routeSchema } from './route';
import blob from "./blob.json";
import { Scenario } from './scenario';
import { CustomerMarker } from './Customer';
import { MapVehicle } from './MapVehicle';

const UPDATE_INTERVAL = 200;
const MUNICH_LATLONG: LatLngExpression = [48.137154, 11.576124];
const data = {
	"awaitingService": true,
	"coordX": 48.134514,
	"coordY": 11.629375,
	"destinationX": 48.14834,
	"destinationY": 11.588274,
	"id": "a3f1c04f-64a5-4e33-b872-3a13151924d7",
	"time": 0.1
  };
// const data = blobSchema.parse(blob);

const Map = ({scenarioState} : {scenarioState: Scenario}) => {

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
			{scenarioState.customers.map((customer) => (
				<CustomerMarker key={customer.id} customer={customer} />
			))}
			 <Route data={data} elapsed={20}/> 
			 {scenarioState.vehicles.map((vehicle) => (
				<MapVehicle key={vehicle.id} vehicle={vehicle} />
			))}
		</MapContainer>
	);

};

export default Map;
