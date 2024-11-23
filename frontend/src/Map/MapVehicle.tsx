import { Marker } from "react-leaflet";
import { Customer, Vehicle } from "./scenario";
import { LCarIcon } from "./LeafletIcon";
import { CustomerMarker } from "./Customer";
import Route from './Route';
import { useEffect, useState } from "react";


export const MapVehicle = ({ vehicle, customer }: { vehicle: Vehicle, customer?: Customer, startRemainingTime: number | null }) => {
    if (!customer) {
        console.log("vehicle without customer")
        return null;
    }
    
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
    
    vehicle.remainingTravelTime, vehicle.distanceTravelled, vehicle.vehicleSpeed

    const actualProgress = (vehicle.distanceTravelled / vehicle.vehicleSpeed) / vehicle.remainingTravelTime;
    console.log("actualProgress", actualProgress);

    const [pos, setPos] = useState(0);

    let firstPathProgress = null;
    let secondPathProgress = null;

    if (pos < 0.5) {
        firstPathProgress = pos / 0.5;
    } else {
        secondPathProgress = (pos - 0.5) / 0.5;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setPos(Math.min(pos + 0.05, 1.0));
        }, 500);
        return () => clearInterval(interval);
    },);

    const showCustomer = customer && pos < 0.5;

    return (
        <>
            <Marker position={[vehicle.coordX, vehicle.coordY]} icon={LCarIcon()} />
            {showCustomer && <CustomerMarker customer={customer} />}
            <Route path={pickupPath} iconPos={firstPathProgress} color={"#00FF00"} />
            <Route path={dropoffPath} iconPos={secondPathProgress} color={"#FF0000"} />
        </>
    );
}