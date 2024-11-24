import { LatLngExpression } from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { Scenario } from './scenario';
import { MapVehicle } from './MapVehicle';
import { CustomerMarker } from './Customer';
import { LCustomerIconRed } from './LeafletIcon';

const UPDATE_INTERVAL = 200;
const MUNICH_LATLONG: LatLngExpression = [48.137154, 11.576124];


const Map = ({ scenarioState, startRemainingTimes }: { scenarioState: Scenario, startRemainingTimes: {[key: string]: number} }) => {


	return (
		<MapContainer center={MUNICH_LATLONG} zoom={12} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
			<TileLayer
				attribution='&copy; <a href="https://carto.com/">Carto</a>'
				url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
			/>

			 {/* {scenarioState.customers.map((customer) => ({
				return (<Marker key={customer.id} position={[customer.coordX, customer.coordY]} icon={LCustomerIconRed()} />)
			 }
			))}  */}

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
