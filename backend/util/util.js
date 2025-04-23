const validator = require("validator");
module.exports = {
    checkError: function (pokemonInput) {
        return validator.isEmpty(pokemonInput.name) || validator.isEmpty(pokemonInput.imgUrl || pokemonInput.pokemonTypes.length === 0);
    }
}