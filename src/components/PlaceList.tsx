import { Dispatch, useContext } from "react"
import { Place } from "../interface"
import "../styles/PlaceList.css"
import { MapContext } from "./MapSection"

interface PlaceListProps {
    place: Place
    setIsDisplayList:Dispatch<boolean>
}
export default function PlaceList({ place, setIsDisplayList }: PlaceListProps) {
    const context = useContext(MapContext)

    if(context == undefined){
        throw new Error("context is undefined")
    }

    const {destination, setDestination, setIsDestSet} = context

    
    return (
        <>
            <div className="place-row" onClick={() => { console.log("invoke place row"); setDestination(place); setIsDestSet(true); setIsDisplayList(false);}}>
                <p>{place.name}</p>
                <p>{place.display_name}</p>
            </div>
        </>
    )
}