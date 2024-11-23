import { Marker } from "react-leaflet";
import { Vehicle } from "./scenario";
import { LCarIcon } from "./LeafletIcon";
import { Route } from "react-router";


export const MapVehicle = ({vehicle} : {vehicle: Vehicle}) => {
    return (
        <Marker position={[vehicle.coordX, vehicle.coordY]} icon={LCarIcon()} />
        <Route
        );
}