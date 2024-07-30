'use client'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { createContext, Dispatch, useEffect, useState } from 'react'
import LocationMarker from './LocationMarker'
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import { RoutingMachine } from './RouteComp'
import { Message } from '../interface'
interface mapType {
    latLang: { lat: number, long: number }
    setLatLang: Dispatch<{ lat: number, long: number }>
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
    const [isClient, setIsClient] = useState(false)
    const [locate, setLocate] = useState(false)
    const [latLang, setLatLang] = useState({ lat: 0, long: 0 })
    const [initLocate, setInitLocate] = useState(false)
    const getLocation = () => {
        setLocate(true)
    }
    const loadLocation = async () => {
        try {
            if (
                navigator.userAgent.indexOf("AlipayClient") > -1 ||
                navigator.userAgent.indexOf("mPaaSClient") > -1
            ) {
                console.log("triggered")

                // let test = { payload: popularMovies.results[0] }
                // window.my.navigateTo({ url: "/pages/index/index"})
                // window.my.getLocation({
                //     success(res) {
                //         console.log(res, "<<<<");
                //         setLatLang({
                //             lat: +res.latitude,
                //             long: +res.longitude
                //         })
                //         setInitLocate(true)
                //     },
                //     fail(err) {
                //         console.log(err);
                //     }
                // })

                window.my.postMessage({ message: "request location" })


                // window.my.onMessage = ((e?: Message) =>{
                //     console.log("triggered on Message");

                //     console.log(e, "<<<<<<<dari mpaas");

                //     return e
                // })
                window.my.onMessage = async function (e: any) {
                    console.log(e, "<<<<<<<");
                    let { message } = e
                    // setLatLang({
                    //     lat: +message.latitude,
                    //     long: +message.longitude
                    // })
                    console.log(message, "<<< message");
                    
                    setLatLang({
                        lat: 51.505,
                        long: -0.09
                    })
                    console.log(latLang, "<<< latlang");
                    setInitLocate(true)
                }
                //     setLatLang({
                //     lat: 51.505,
                //     long: -0.09
                // })
                setInitLocate(true)
            } else {
                setLatLang({
                    lat: 51.505,
                    long: -0.09
                })
                setInitLocate(true)

            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        setIsClient(true)

        loadLocation()
    }, [])

    useEffect(() => {
        console.log(latLang, "<<<<<<<< watch latlang");

    }, [latLang])
    if (!isClient) {
        return null;
    }
    return (
        <>
            <MapContext.Provider value={{ latLang, setLatLang }} >

                <div >
                    <div>
                        <p>MAP</p>
                        <p>{latLang.lat} & {latLang.long}</p>
                        <button onClick={getLocation}>get location</button>
                    </div>
                    {initLocate && <MapContainer style={{ height: "500px" }} center={[latLang.lat, latLang.long]} zoom={18} scrollWheelZoom={true}>
                        <TileLayer

                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[latLang.lat, latLang.long]}>

                        </Marker>
                        <LocationMarker setLocate={setLocate} locate={locate} ></LocationMarker>
                        <RoutingMachine  ></RoutingMachine>
                    </MapContainer>}
                </div>
            </MapContext.Provider>
        </>
    )
}