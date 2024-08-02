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

    const { destination, isDestSet, setIsDestSet, setLocate, setIsPickupSet, pickup, setPickup, isPickupSet } = context

    const [destResults, setDestResults] = useState([])
    const [destinationInput, setDestinationInput] = useState("")

    const [pickupResults, setPickupResults] = useState([])
    const [pickupInput, setPickupInput] = useState("")

    const [displayResult, setDisplayResult] = useState([])
    const [isDisplayList, setIsDisplayList] = useState<boolean>(false)

    const [selectingPickup, setSelectingPickup] = useState(false)
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
            setDisplayResult(data)
        } catch (error) {
            console.log(error);
        }
    }
    const pickupHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {

            let { value } = e.target

            setPickupInput(value)
            const { data } = await axios({
                method: "get",
                url: `${openStreetApi}/search?format=json&q=${value}`,
                headers: {
                    "Content-Type": "json"
                }
            })

            setPickupResults(data)
            setDisplayResult(data)

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

                    {
                        !isPickupSet ?
                            <input value={pickupInput} onFocus={() => { setIsDisplayList(true); setDisplayResult(pickupResults); setSelectingPickup(true) }} onChange={pickupHandler} type="text" />
                            : <input value={pickup.display_name} disabled ></input>
                    }

                    <button onClick={() => { if (!isPickupSet && !isDisplayList) { setPickupInput("") }; setIsDisplayList(false); setIsPickupSet(false); setLocate(true) }} className="button-cancel">X</button>
                </div>
                <div className="input-row">
                    <label>Destination</label>

                    {
                        !isDestSet ?
                            <input value={destinationInput} onFocus={() => { setIsDisplayList(true); setDisplayResult(destResults); setSelectingPickup(false) }} onChange={destinationHandler} type="text" />
                            : <input value={destination.display_name} disabled ></input>
                    }

                    <button onClick={() => { if (!isDestSet && !isDisplayList) { setDestinationInput("") }; setIsDisplayList(false); setIsDestSet(false); setLocate(true) }} className="button-cancel">X</button>
                </div>
            </div>

            {isDisplayList && <div className="place-list">
                {displayResult.map((el: Place) => (
                    <div>
                        <PlaceList selectingPickup={selectingPickup} place={el} setIsDisplayList={setIsDisplayList} ></PlaceList>
                    </div>
                ))}
            </div>}
        </>
    )
}