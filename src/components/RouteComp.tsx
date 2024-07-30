import L from "leaflet"
import { createControlComponent } from "@react-leaflet/core"
import "leaflet-routing-machine"
import { Dispatch, useContext } from "react"
import { MapContext } from "./MapSection"


const RoutingInstance = () => {
    const context = useContext(MapContext)
    
    if(context == undefined){
        throw new Error("context is undefined")
    }
    const {latLang} = context
    // console.log(latLang, "<<<<<<<<");
    
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(latLang.lat, latLang.long ),
            L.latLng(latLang.lat + 10, latLang.long + 10)
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }],
            extendToWaypoints:true,
           missingRouteTolerance:1 
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        // draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false
    });

    return instance;
};

export const RoutingMachine = createControlComponent(RoutingInstance);

