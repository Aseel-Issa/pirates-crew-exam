const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PirateSchema = new Schema({
    name: {
        type: String,
        required: [true, "Pirate name is required"]
    },
    image: {
        type: String,
        required: [true, "Pirate's image url is required"]
    },
    treasureChests: {
        type: Number,
        required: [true, "Treasure chests is required"]
    },
    catchPhrase: {
        type: String,
        required: [true, "Catch phrase is required"]
    },
    crewPosition: {
        type: Number,
        required: [true, "Crew position is required"]
    },
    leg: {
        type: Boolean,
        required: [true, "leg is required"]
    },
    eye: {
        type: Boolean,
        required: [true, "eye is required"]
    },
    hook: {
        type: Boolean,
        required: [true, "hook is required"]
    }
})

const PirateModel = mongoose.model('pirate', PirateSchema)

module.exports={
    PirateModel
}