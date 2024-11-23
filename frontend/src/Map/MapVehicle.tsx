import { Marker } from "react-leaflet";
import { Customer, Vehicle } from "./scenario";
import { LCarIcon } from "./LeafletIcon";
import { CustomerMarker } from "./Customer";


export const MapVehicle = ({ vehicle, customer }: { vehicle: Vehicle, customer: Customer }) => {
    return (
        <>
            <Marker position={[vehicle.coordX, vehicle.coordY]} icon={LCarIcon()} />
            <CustomerMarker customer={customer} />
        </>
    );
}