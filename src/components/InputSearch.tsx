import axios from "axios";
import "../styles/InputSearch.css"
import { useContext, useEffect, useState } from "react";
import PlaceList from "./PlaceList";
import { Place } from "../interface";
import { MapContext } from "./MapSection";
const openStreetApi = "https://nominatim.openstreetmap.org"
export default function InputSearch() {
    const context = useContext(MapContext)

    if (context == undefined) {
        throw new Error("context is undefined")
    }

    const { destination, isDestSet, setIsDestSet, setLocate } = context
    const [destResults, setDestResults] = useState([])
    const [destinationInput, setDestinationInput] = useState("")
    const [isDisplayList, setIsDisplayList] = useState<boolean>(false)
    const destinationHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {

            let { value } = e.target

            setDestinationInput(value)
            const { data } = await axios({
                method: "get",
                url: `${openStreetApi}/search?format=json&q=${value}`,
                headers: {
                    "Content-Type": "json"
                }
            })

            setDestResults(data)
        } catch (error) {
            console.log(error);
        }
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

                    {
                        !isDestSet ?
                            <input value={destinationInput} onFocus={() => setIsDisplayList(true)} onChange={destinationHandler} type="text" />
                            : <input value={destination.display_name} disabled ></input>
                    }

                    <button onClick={() => {if(!isDestSet && !isDisplayList){setDestinationInput("")};  setIsDisplayList(false); setIsDestSet(false);setLocate(true) }} className="button-cancel">X</button>
                </div>
            </div>

            {isDisplayList && <div className="place-list">
                {destResults.map((el: Place) => (
                    <div>
                        <PlaceList place={el} setIsDisplayList={setIsDisplayList} ></PlaceList>
                    </div>
                ))}
            </div>}
        </>
    )
}