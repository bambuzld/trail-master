const mongoose = require('mongoose')

const TrailSchema = new mongoose.Schema({
    name: String,
    description: String,
    level: String,
    type: String,
    length: String,
    path: [[Number]],
    elevation: [Number],

})

module.exports = mongoose.model("Trail",TrailSchema)