"use client";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { createContext, Dispatch, useEffect, useState } from "react";
import LocationMarker from "./LocationMarker";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { RoutingMachine } from "./RouteComp";
import * as L from "leaflet";

// import { Message } from '../interface'

interface mapType {
  latLang: { lat: number; long: number };
  setLatLang: Dispatch<{ lat: number; long: number }>;
}
declare global {
  interface Window {
    my: {
      postMessage: (value: Object) => {};
      onMessage: (e: any) => void;
      // onMessage: (callback: (e: any) => void) => void
    };
  }
}
export const MapContext = createContext<mapType | undefined>(undefined);
export default function MapSection() {
  const [locate, setLocate] = useState(false);
  const [latLang, setLatLang] = useState({ lat: 0, long: 0 });
  const [initLocate, setInitLocate] = useState(false);
  const getLocation = () => {
    setLocate(true);
  };
  const locateViaReact = () => {
    window.my.getLocation({
      success(res) {
        console.log(res, "<<<<");
        setLatLang({
          lat: +res.latitude,
          long: +res.longitude,
        });
        setInitLocate(true);
      },
      fail(err) {
        console.log(err);
      },
    });
  };
  const locateViaMpaas = () => {
    // console.log("triggered")

    // let test = { payload: popularMovies.results[0] }
    // window.my.navigateTo({ url: "/pages/index/index"})

    window.my.postMessage({ message: "request location" });

    window.my.onMessage = function (e: any) {
      console.log(e, "<<<<<<<");
      let { message } = e;
      setLatLang({
        lat: +message.latitude,
        long: +message.longitude,
      });
      console.log(latLang, "<<< latlang");
      setInitLocate(true);
    };
  };

  const locateHardCode = () => {
    setLatLang({
      lat: 51.505,
      long: -0.09,
    });
    setInitLocate(true);
  };
  useEffect(() => {
    if (
      navigator.userAgent.indexOf("AlipayClient") > -1 ||
      navigator.userAgent.indexOf("mPaaSClient") > -1
    ) {
      locateViaMpaas();
      // locateViaReact()
    } else {
      locateHardCode();
    }
  }, []);
  const carIcon = new L.Icon({
    iconUrl:
      "data:image/png;base64,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",

    iconSize: [10, 10], // Adjust icon size as needed
    iconAnchor: [25, 25], // Adjust anchor point to center of icon
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
  const [position, setPosition] = useState<L.LatLngExpression>([42.5, 12.5]);
  const [rotationAngle, setRotationAngle] = useState<number>(0);

  useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.alpha !== null) {
        setRotationAngle(event.alpha);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);
  return (
    <>
      <MapContext.Provider value={{ latLang, setLatLang }}>
        <div>
          <div>
            <p>MAP</p>
            <p>
              {latLang.lat} & {latLang.long}
            </p>
            <button onClick={getLocation}>get location</button>
          </div>
          {initLocate && (
            <MapContainer
              style={{ height: "500px" }}
              center={[latLang.lat, latLang.long]}
              zoom={18}
              scrollWheelZoom={true}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <LocationMarker
                setLocate={setLocate}
                locate={locate}
              ></LocationMarker>
              <RoutingMachine></RoutingMachine>
            </MapContainer>
          )}
        </div>
      </MapContext.Provider>
    </>
  );
}
