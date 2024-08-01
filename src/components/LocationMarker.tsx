"use client";
import { LatLng, Popup } from "leaflet";
import { Dispatch, useEffect, useState } from "react";
import { Marker, useMap, useMapEvents } from "react-leaflet";
import * as L from "leaflet";
import "leaflet-rotatedmarker";
interface LocationMarkerProps {
  setLocate: Dispatch<boolean>;
  locate: boolean;
  // latLang:{lat: number, long:number}
  // setLatLang: Dispatch<{lat: number, long:number}>
}
export default function LocationMarker({
  setLocate,
  locate,
}: LocationMarkerProps) {
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const mapAlt = useMap();
  const map = useMapEvents({
    locationfound(e) {
      console.log(e, "<<<<<");
      let { lat, lng } = e.latlng;
      setPosition({ lat, lng });
      map.flyTo(e.latlng, 18);
      setLocate(false);
    },
  });
  const locViaMp = async () => {
    window.my.getLocation({
      success(res) {
        console.log(res, "<<<<");
        setPosition({
          lat: +res.latitude,
          lng: +res.longitude,
        });
        let newLoc = new LatLng(+res.latitude, +res.longitude);

        map.flyTo(newLoc, 18);
        setLocate(false);
      },
      fail(err) {
        console.log(err);
      },
    });
  };
  const carIcon = new L.Icon({
    iconUrl: "/arrow.svg",
    iconSize: [50, 50], // Adjust icon size as needed
    iconAnchor: [22, 22], // Adjust anchor point to center of icon
  });
  const CarMarker: React.FC<{
    position: L.LatLngExpression;
    rotationAngle: number;
  }> = ({ position, rotationAngle }) => {
    const map = useMap();

    useEffect(() => {
      const marker = L.marker(position, {
        icon: carIcon,
        rotationAngle: rotationAngle,
        rotationOrigin: "center center",
      }).addTo(map);

      return () => {
        map.removeLayer(marker);
      };
    }, [map, position, rotationAngle]);

    return null;
  };
  useEffect(() => {
    if (locate) {
      console.log("locate");

      if (
        navigator.userAgent.indexOf("AlipayClient") > -1 ||
        navigator.userAgent.indexOf("mPaaSClient") > -1
      ) {
        locViaMp();
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
      {/* <Marker position={position}></Marker> */}
      <CarMarker position={position} rotationAngle={10} />
    </>
  );
}
