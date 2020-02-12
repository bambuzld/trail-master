const mongoose = require('mongoose')

const TrailSchema = new mongoose.Schema({
    name: String,
    description: String,
    level: String,
    type: String,
    length: String,
    path: [[Number]],
    elevation: [Number],
    geoJson: {
        type: {
            type: String
        },
        features: [
            {
                type:{type:  String},
                // properties: {
                //     name: String
                // },
                geometry: {
                    coordinates: [[Number]],
                    type: {type: String}
                }
            }
        ]
    }

})

module.exports = mongoose.model("Trail",TrailSchema)