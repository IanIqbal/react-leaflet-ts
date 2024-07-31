import axios from "axios";
import "../styles/InputSearch.css"
import { useEffect, useState } from "react";
import PlaceList from "./PlaceList";
import { Place } from "../interface";
const openStreetApi = "https://nominatim.openstreetmap.org"
export default function InputSearch() {
    const [destResults, setDestResults] = useState([])
    const [isDisplayList, setIsDisplayList] = useState<boolean>(false)
    // const [outputPlace, setOutputPlace] = useState([])
    const destinationHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {

            console.log(e.target.value, "<<<<<");
            let { value } = e.target
            const { data } = await axios({
                method: "get",
                url: `${openStreetApi}/search?format=json&city=${value}&street=${value}&amenity=${value}`,
                headers: {
                    "Content-Type": "json"
                }
            })

            console.log(data);
            setDestResults(data)
        } catch (error) {
            console.log(error);

        }
    }
    const displayListHandler = () => {
        setIsDisplayList(!isDisplayList)
    }

    useEffect(() => {
        console.log(isDisplayList, "<<<< isDisplay");

    }, [isDisplayList])
    return (
        <>
            <div className="input-container">

                <div className="input-row">
                    <label>Pickup</label>
                    <input onChange={destinationHandler} type="text" />
                </div>
                <div className="input-row">
                    <label>Destination</label>
                    <input onFocus={displayListHandler} onDrop={displayListHandler} onBlur={displayListHandler} onAbort={displayListHandler} onChange={destinationHandler} type="text" />
                </div>
            </div>

            {isDisplayList && <div className="place-list">
                {destResults.map((el: Place) => (
                    <PlaceList place={el} ></PlaceList>
                ))}
            </div>}
        </>
    )
}