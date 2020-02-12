export const trailsDto = trails => {
   return trails.map(trail => ({
        trail,
        geoJson: {
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: trail.path
            },
            properties: {
                name: trail.name
            }
        }
    })
   )

}


//{
//     "type": "Feature",
//     "geometry": {
//       "type": "Point",
//       "coordinates": [125.6, 10.1]
//     },
//     "properties": {
//       "name": "Dinagat Islands"
//     }
//   }