import { Place } from "../interface"
import "../styles/PlaceList.css"

interface PlaceListProps{
place:Place
}
export default function PlaceList({place}: PlaceListProps){
    return (
        <>
            <div className="place-row">
                <p>{place.name}</p>
                <p>{place.display_name}</p>
            </div>
        </>
    )
}