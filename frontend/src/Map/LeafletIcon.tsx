import { divIcon } from "leaflet";
import { ReactNode } from "react";
import { renderToString } from "react-dom/server";

const LeafletIcon = (icon: ReactNode) => {
	const iconMarkup = renderToString(icon);
  
	// Create a Leaflet Icon with the custom image
	return divIcon({
	  html: iconMarkup,
	  className: 'custom-icon', // Add any custom styling if necessary
	  iconSize: [32, 32], // Adjust to your needs
	  iconAnchor: [2, 30], // Center the icon appropriately
	});
};

export default LeafletIcon;
  