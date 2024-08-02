import { Dispatch, useContext } from "react"
import { Place } from "../interface"
import "../styles/PlaceList.css"
import { MapContext } from "./MapSection"

interface PlaceListProps {
    place: Place
    setIsDisplayList: Dispatch<boolean>
    selectingPickup: boolean
}
export default function PlaceList({ place, setIsDisplayList, selectingPickup }: PlaceListProps) {
    const context = useContext(MapContext)

    if (context == undefined) {
        throw new Error("context is undefined")
    }

    const { destination, setDestination, setIsDestSet, setPickup, setIsPickupSet } = context


    return (
        <>
            <div className="place-row" onClick={() => {
                console.log("invoke place row");

                if (selectingPickup) {
                    setPickup(place)
                    setIsPickupSet(true)
                } else {
                    setDestination(place);
                    setIsDestSet(true);
                }
                setIsDisplayList(false);
            }}>
                <p>{place.name}</p>
                <p>{place.display_name}</p>
            </div>
        </>
    )
}