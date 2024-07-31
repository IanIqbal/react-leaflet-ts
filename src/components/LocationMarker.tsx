"use client"
import { LatLng, Popup } from "leaflet";
import { Dispatch, useEffect, useState } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";

interface LocationMarkerProps {
    setLocate: Dispatch<boolean>
    locate: boolean
    latLang:{lat: number, long:number}
    setLatLang: Dispatch<{lat: number, long:number}>
    setInitLocate:Dispatch<boolean>
}
export default function LocationMarker({ setLocate, locate, setLatLang, setInitLocate }: LocationMarkerProps) {
    const [position, setPosition] = useState({ lat: 0, lng: 0 });
    const mapAlt = useMap()
    const map = useMapEvents({
        locationfound(e) {
            console.log(e, "<<<<<");
            let { lat, lng } = e.latlng
            setPosition({ lat, lng });
            setLatLang({lat, long:lng})
            map.flyTo(e.latlng, 18);
            setLocate(false)
            setInitLocate(true)
        }
    });
    const locViaMp = async ()=>{
        window.my.getLocation({
            success(res) {
                console.log(res, "<<<<");
                setPosition({
                    lat: +res.latitude,
                    lng: +res.longitude
                })
                let newLoc = new LatLng(+res.latitude, +res.longitude)

                map.flyTo(newLoc, 18)
                setLocate(false)
            },
            fail(err) {
                console.log(err);
            }
        })
    }
    useEffect(() => {
        if (locate) {
            console.log("locate");

            if (
                navigator.userAgent.indexOf("AlipayClient") > -1 ||
                navigator.userAgent.indexOf("mPaaSClient") > -1
            ) {
                locViaMp()
            } else {
                map.locate({
                    enableHighAccuracy: true,
                });
            }


        }
    }, [locate, map]);

    return position === null ? null : (
        <>
            <h1>test</h1>
            {/* <Marker position={position} >
                <Popup>You are here</Popup>
            </Marker> */}
        </>
    );
};