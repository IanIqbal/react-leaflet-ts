// export interface Message{
//     "currentTarget": {
//         "dataset": Object,
//         "id": string,
//         "tagName": string
//     },
//     "target": {
//         "dataset": Object,
//         "id": string,
//         "tagName": string,
//         "targetDataset": Object
//     },
//     "timeStamp": number,
//     "type": string,
//     "detail": {
//         "message": string
//     }
// }

export interface Message {
  message: string;
}

import "leaflet";
declare module "leaflet" {
  interface MarkerOptions {
    rotationAngle?: number;
    rotationOrigin?: string;
  }

  interface Marker {
    setRotationAngle(newAngle: number): this;
    setRotationOrigin(newOrigin: string): this;
  }
}
