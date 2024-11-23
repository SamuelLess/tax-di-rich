import { CircleMarker, Marker } from "react-leaflet";
import { Customer, Vehicle } from "./scenario";
import { LCarIcon } from "./LeafletIcon";
import { CustomerMarker } from "./Customer";
import Route from './Route';
import { useEffect, useState } from "react";


export const MapVehicle = ({ vehicle, customer, startRemainingTime }: { vehicle: Vehicle, customer?: Customer, startRemainingTime: number | null }) => {

    const targetProgress = startRemainingTime ? 1 - (vehicle.remainingTravelTime / startRemainingTime) : 0;

    const [progress, setProgress] = useState(0);

     useEffect(() => {
         const interval = setInterval(() => { 
            setProgress(prev => prev + (targetProgress - prev) * 0.1);
         }, 100);
         return () => clearInterval(interval);
     },[targetProgress]);

    useEffect(() => {
        console.log("resetting progress");
        setProgress(0);
    }, [customer?.id, vehicle.coordX, vehicle.coordY]);

    if (!customer) {
        return <Marker position={[vehicle.coordX, vehicle.coordY]} icon={LCarIcon()} />;
    }    

    const isOnDropoffPath = vehicle.coordX === customer.coordX && vehicle.coordY === customer.coordY;
    const isOnPickupPath = !isOnDropoffPath;


    const pickupPath = {
        startX: vehicle.coordX,
        startY: vehicle.coordY,
        endX: customer.coordX,
        endY: customer.coordY
    };

    const dropoffPath = {
        startX: customer.coordX,
        startY: customer.coordY,
        endX: customer.destinationX,
        endY: customer.destinationY
    };

    
    const pickupPathProgress = isOnPickupPath ? progress : null;
    const dropoffPathProgress = isOnDropoffPath ? progress : null;

    const showCustomer = customer && isOnPickupPath;

    return (
        <>
            {isOnPickupPath && <Route path={pickupPath} iconPos={pickupPathProgress} color={"#00FF00"} />}
            <Route path={dropoffPath} iconPos={dropoffPathProgress} color={"#FF0000"} />
            {showCustomer && <CustomerMarker customer={customer} />}
        </>
    );
}
