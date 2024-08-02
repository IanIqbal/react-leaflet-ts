'use client'
import { MapContainer, Marker, Popup, TileLayer, useMap, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { createContext, Dispatch, useEffect, useState } from 'react'
import LocationMarker from './LocationMarker'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { RoutingMachine } from './RouteComp'
import { CoordinateMap, Place } from '../interface'
import InputSearch from './InputSearch'
import "../styles/MapSection.css"
interface mapType {
    latLang: CoordinateMap
    setLatLang: Dispatch<{ lat: number, long: number }>

    destination: Place 
    setDestination: Dispatch<Place>
    setIsDestSet: Dispatch<boolean>
    isDestSet:boolean

    pickup:Place
    isPickupSet:boolean
    setIsPickupSet:Dispatch<boolean>
    setPickup:Dispatch<Place>

    setLocate:Dispatch<boolean>

}
declare global {
    interface Window {
        my: {
            postMessage: (value: Object) => {

            },
            onMessage: (e: any) => void;
            // onMessage: (callback: (e: any) => void) => void

        }
    }
}
export const MapContext = createContext<mapType | undefined>(undefined)
export default function MapSection() {
    const [locate, setLocate] = useState(false)
    const [latLang, setLatLang] = useState<CoordinateMap>({ lat: 0, long: 0 })
    const [initLocate, setInitLocate] = useState(false)

    const [pickup, setPickup] = useState<Place>(Object)
    const [isPickupSet, setIsPickupSet] = useState(false)

    const [destination, setDestination] = useState<Place>(Object)
    const [isDestSet, setIsDestSet] = useState(false)

    const getLocation = () => {
        // setInitLocate(false)
        setLocate(true)
    }
    const locateViaReact = () => {
        window.my.getLocation({
            success(res) {
                console.log(res, "<<<<");
                setLatLang({
                    lat: +res.latitude,
                    long: +res.longitude
                })
                setInitLocate(true)
            },
            fail(err) {
                console.log(err);
            }
        })

    }
    const locateViaMpaas = () => {

        // console.log("triggered")

        // let test = { payload: popularMovies.results[0] }
        // window.my.navigateTo({ url: "/pages/index/index"})

        window.my.postMessage({ message: "request location" })

        window.my.onMessage = function (e: any) {
            console.log(e, "<<<<<<<");
            let { message } = e
            setLatLang({
                lat: +message.latitude,
                long: +message.longitude
            })
            setInitLocate(true)
        }
    }

    const locateLeafletApi = () => {
        getLocation()
        setInitLocate(true)
    }
    useEffect(() => {

        if (
            navigator.userAgent.indexOf("AlipayClient") > -1 ||
            navigator.userAgent.indexOf("mPaaSClient") > -1
        ) {
            locateViaMpaas()
            
            // locateViaReact()
        } else {
            locateLeafletApi()
        }

        
    }, [])
    useEffect(()=>{
        console.log(isDestSet, isPickupSet);
        
    },[isDestSet, isPickupSet])
    return (
        <>
            <MapContext.Provider value={{ latLang, setLatLang , destination, setDestination, setIsDestSet, setIsPickupSet, isDestSet, setLocate, pickup, setPickup, isPickupSet}} >

                <div >
                    <div>
                        <p>MAP</p>
                        <p>{latLang.lat} & {latLang.long}</p>
                        <InputSearch></InputSearch>
                        <button onClick={getLocation}>get location</button>
                    </div>
                    {initLocate && <MapContainer style={{ height: "500px", maxHeight:"500px" }} center={[latLang.lat, latLang.long]} zoom={18} scrollWheelZoom={true}>
                        <TileLayer

                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <CircleMarker radius={10} center={[latLang.lat, latLang.long]}>

                        </CircleMarker>
                        <LocationMarker setLocate={setLocate} locate={locate} setLatLang={setLatLang} latLang={latLang} setInitLocate={setInitLocate} ></LocationMarker>
                       {isPickupSet && isDestSet && 
                           <RoutingMachine></RoutingMachine>
                       }
                    </MapContainer>}
                </div>
            </MapContext.Provider>
        </>
    )
}