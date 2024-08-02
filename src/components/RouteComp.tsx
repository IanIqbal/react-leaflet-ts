import L from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"
import { Dispatch, useContext } from "react"
import { MapContext } from "./MapSection"


const RoutingInstance = () => {
    const context = useContext(MapContext)

    if (context == undefined) {
        throw new Error("context is undefined")
    }
    const { latLang, destination, isDestSet , pickup} = context
    // console.log(latLang, "<<<<<<<<");

    const instance = L.Routing.control({
        waypoints: [
            L.latLng(+pickup.lat, +pickup.lon),
            L.latLng(+destination?.lat, +destination?.lon)
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }],
            extendToWaypoints: true,
            missingRouteTolerance: 1
        },
       
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        // draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false
    });
    console.log(isDestSet, "<<<<<dest set");

    const container = instance.getContainer()
    const parent = container?.parentNode

    if (container) {
        parent?.removeChild(container)
    }
    return instance;
};

export const RoutingMachine = createControlComponent(RoutingInstance);

