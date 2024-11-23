import { CarProfile, FlagCheckered } from "@phosphor-icons/react";
import { divIcon, PointExpression } from "leaflet";
import { ReactNode } from "react";
import { renderToString } from "react-dom/server";

const LeafletIcon = (icon: ReactNode, anchor: PointExpression) => {
	const iconMarkup = renderToString(icon);
  
	// Create a Leaflet Icon with the custom image
	return divIcon({
	  html: iconMarkup,
	  className: 'custom-icon', // Add any custom styling if necessary
	  iconSize: [32, 32], // Adjust to your needs
	  iconAnchor: anchor, // Center the icon appropriately
	});
};

const LCarIcon = () => {
	return LeafletIcon(<CarProfile size={32} color="#000000" weight="fill" />, [16, 16]);
};

const LFlagIcon = () => {
	return LeafletIcon(<FlagCheckered size={32} color="#000000" weight="fill" />, [5, 28]);
}

export { LCarIcon, LFlagIcon };
