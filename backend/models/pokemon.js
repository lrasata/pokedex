const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemonSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        captured: {
            type: Boolean,
            required: true
        },
        imgUrl: {
            type: String,
            required: true
        },
        pokemonTypes: {
            type: [String],
            required: true
        },
    },
    {timestamps: true}
);

module.exports = mongoose.model('Pokemon', pokemonSchema);
