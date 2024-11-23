import { Marker } from "react-leaflet";
import { LCustomerIcon } from "./LeafletIcon";
import { Customer } from "./scenario";



export const CustomerMarker = ({customer} : {customer: Customer}) => {
    if (!customer.awaitingService) return null;
    return (
        <Marker position={[customer.coordX, customer.coordY]} icon={LCustomerIcon()} />
    );
    }