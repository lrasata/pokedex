const Pokemon = require('../models/pokemon');
const {checkError} = require("../util/util");

module.exports = {
  getPokemons: async function({ page, name, idNumber }) {
    if (!page) {
      page = 1;
    }
    const ITEM_PER_PAGE = 20;

    const filter = {};
    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // case-insensitive match
    }
    if (idNumber) {
      filter.idNumber = { $regex: idNumber };
    }

    const totalPokemons = await Pokemon.find(filter).countDocuments();
    const pokemons = await Pokemon.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * ITEM_PER_PAGE)
      .limit(ITEM_PER_PAGE);
    return {
      pokemons: pokemons.map(p => {
        return {
          ...p._doc,
          _id: p._id.toString(),
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString()
        };
      }),
      totalPokemons: totalPokemons
    };
  },
  getPokemonById: async function({ id }) {
    const pokemon = await Pokemon.findById(id);
    if (!pokemon) {
      const error = new Error('No pokemon found!');
      error.code = 404;
      throw error;
    }
    return {
      ...pokemon._doc,
      _id: pokemon._id.toString(),
      createdAt: pokemon.createdAt.toISOString(),
      updatedAt: pokemon.updatedAt.toISOString()
    };
  },
  createPokemon: async function({ pokemonInput }) {
    if (checkError(pokemonInput)) {
      const error = new Error('Pokemon Invalid input.');
      error.code = 422;
      throw error;
    }

    const pokemon = new Pokemon({
      name: pokemonInput.name,
      imgUrl: pokemonInput.imgUrl,
      idNumber: pokemonInput.idNumber,
      captured: pokemonInput.captured,
      pokemonTypes: pokemonInput.pokemonTypes,
    });
    const createdPokemon = await pokemon.save();

    return {
      ...createdPokemon._doc,
      _id: createdPokemon._id.toString(),
      createdAt: createdPokemon.createdAt.toISOString(),
      updatedAt: createdPokemon.updatedAt.toISOString()
    };
  },
  createAllPokemon: async function({ allPokemonInput }) {

    const normalizedInput = allPokemonInput.map(p => Object.assign({}, p));
    const allPokemonSaved = await Promise.all(
        normalizedInput.map(pokemonInput => this.createPokemon({ pokemonInput }))
    );

    return allPokemonSaved;

  },
  updatePokemon: async function({ id, pokemonInput }) {
    const existingPokemon = await Pokemon.findById(id);
    if (!existingPokemon) {
      const error = new Error('No pokemon found!');
      error.code = 404;
      throw error;
    }

    if (checkError(pokemonInput)) {
      const error = new Error('Pokemon Invalid input.');
      error.code = 422;
      throw error;
    }

    existingPokemon.captured = pokemonInput.captured;
    existingPokemon.name = pokemonInput.name;
    existingPokemon.imgUrl = pokemonInput.imgUrl;
    existingPokemon.idNumber = pokemonInput.idNumber;
    existingPokemon.pokemonTypes = pokemonInput.pokemonTypes;

    const updatedPokemon = await existingPokemon.save();
    return {
      ...updatedPokemon._doc,
      _id: updatedPokemon._id.toString(),
      createdAt: updatedPokemon.createdAt.toISOString(),
      updatedAt: updatedPokemon.updatedAt.toISOString()
    };
  },
  deletePokemon: async function({ id }) {
    const fetchedPokemon = await Pokemon.findById(id);
    if (!fetchedPokemon) {
      const error = new Error('No pokemon found!');
      error.code = 404;
      throw error;
    }

    await Pokemon.findByIdAndDelete(id);
    return true;
  }

};
