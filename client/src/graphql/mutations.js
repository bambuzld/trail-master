export const CREATE_PIN_MUTATION = `
    mutation($title: String, $image: String!, $content: String!, $latitude: Float!, $longitude: Float!){
        createPin(input:{
            title: $title,
            image: $image,
            content: $content,
            latitude: $latitude,
            longitude: $longitude
        }){
            _id
            createdAt
            title
            image
            content
            latitude
            longitude
        }
    }
    `;
// author{
//     _id
//     name
//     email
// }

export const CREATE_TRAIL_MUTATION = `
mutation($name: String!, $description: String!, $type: String!, $level: String!, $path: [[Float]]!, $elevation: [Float]!, $geoJson: GeoJSONInput!){
        createTrail(input:{
            name:$name,
            description:$description,
            level: $level,
            type: $type,
            path: $path,
            elevation: $elevation,
            geoJson: $geoJson
            }){
        _id
        name
        description
        elevation
        path
        geoJson{
            type
        }
        }
    }
`;
