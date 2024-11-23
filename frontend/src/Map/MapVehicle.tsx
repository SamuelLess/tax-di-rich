import { Circle, Marker } from "react-leaflet";
import { Customer, Vehicle } from "./scenario";
import { LCarIcon } from "./LeafletIcon";
import { CustomerMarker } from "./Customer";
import Route from './Route';
import { useEffect, useState } from "react";


export const MapVehicle = ({ vehicle, customer, startRemainingTime }: { vehicle: Vehicle, customer?: Customer, startRemainingTime: number | null }) => {
    const [progress, setProgress] = useState(0);

    const targetProgress = startRemainingTime ? 1 - (vehicle.remainingTravelTime / startRemainingTime) : 0;
    const clampedProgress = Math.min(1, Math.max(0, targetProgress));

    useEffect(() => {
        const interval = setInterval(() => {     
            setProgress(progress + (clampedProgress - progress) * 0.01);
        }, 100);
        return () => clearInterval(interval);
    },[setProgress]);

    if (!customer) {
        return <Marker position={[vehicle.coordX, vehicle.coordY]} icon={LCarIcon()} />;
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

    let firstPathProgress = null;
    let secondPathProgress = null;

    if (progress < 0.5) {
        firstPathProgress = progress / 0.5;
    } else {
        secondPathProgress = (progress - 0.5) / 0.5;
    }

    const showCustomer = customer && progress < 0.5 && progress !== null;

    return (
        <>
            <Circle center={[vehicle.coordX, vehicle.coordY]} radius={20} fill fillColor="white"/>
            <Marker position={[vehicle.coordX, vehicle.coordY]} icon={LCarIcon()} zIndexOffset={1}/>
            {showCustomer && <CustomerMarker customer={customer} />}
            <Route path={pickupPath} iconPos={firstPathProgress} color={"#00FF00"} />
            <Route path={dropoffPath} iconPos={secondPathProgress} color={"#FF0000"} />
        </>
    );
}
