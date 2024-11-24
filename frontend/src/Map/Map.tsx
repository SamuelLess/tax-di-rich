import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Scenario } from './scenario';
import { MapVehicle } from './MapVehicle';
import { CustomerMarker } from './Customer';
import { LCustomerIconRed } from './LeafletIcon';

const MUNICH_LATLONG: LatLngExpression = [48.137154, 11.576124];


const Map = ({ scenarioState, startRemainingTimes, radius }: { 
	scenarioState: Scenario, 
	startRemainingTimes: {[key: string]: number},
	radius: number
}) => {

	let customersToDo = scenarioState.customers.filter(customer => customer.awaitingService);
	// set of assigned customers 
	let assignedCustomers = new Set(scenarioState.vehicles.map(vehicle => vehicle.customerId));
	// filter out assigned customers
	customersToDo = customersToDo.filter(customer => !assignedCustomers.has(customer.id));
	return (
		<MapContainer  center={MUNICH_LATLONG} zoom={12} scrollWheelZoom={true} style={{ height: "100%", width: "100%", borderRadius: radius }}>
			<TileLayer
				attribution='&copy; <a href="https://carto.com/">Carto</a>'
				url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
			/>
			
			{customersToDo.map((customer) => {
				return (<CustomerMarker key={customer.id} customer={customer} />)
			})}

			{scenarioState.vehicles.map((vehicle) => {
				const customerOfVehicle = scenarioState.customers.find(customer => customer.id === vehicle.customerId);		
				return (
					<MapVehicle key={vehicle.id} vehicle={vehicle} customer={customerOfVehicle!} startRemainingTime={startRemainingTimes[vehicle.id]}/>
				);
			})}
		</MapContainer>
	);

};

export default Map;
