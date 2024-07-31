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
    message: string
}

export interface CoordinateMap {
    lat: number,
    long: number
}

export interface Place {

    "place_id": number,
    "licence": string,
    "osm_type": string,
    "osm_id": number,
    "lat": string,
    "lon": string,
    "class": string,
    "type": string,
    "place_rank": number,
    "importance": number,
    "addresstype": string,
    "name": string,
    "display_name":string,
    "boundingbox": string[]

}