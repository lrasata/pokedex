const validator = require('validator');

const Pokemon = require('../models/pokemon');
const {checkError} = require("../util/util");

module.exports = {
  pokemons: async function({ page }, req) {
    if (!page) {
      page = 1;
    }
    const perPage = 2;
    const totalPokemons = await Pokemon.find().countDocuments();
    const pokemons = await Pokemon.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage);
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
  pokemon: async function({ id }) {
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
  updatePokemon: async function({ id, pokemonInput }, req) {
    const fetchedPokemon = await Pokemon.findById(id);
    if (!fetchedPokemon) {
      const error = new Error('No pokemon found!');
      error.code = 404;
      throw error;
    }

    if (checkError(pokemonInput)) {
      const error = new Error('Pokemon Invalid input.');
      error.code = 422;
      throw error;
    }

    fetchedPokemon.captured = pokemonInput.captured;
    fetchedPokemon.name = pokemonInput.name;
    fetchedPokemon.imgUrl = pokemonInput.imgUrl;
    fetchedPokemon.pokemonTypes = pokemonInput.pokemonTypes;

    const updatedPokemon = await fetchedPokemon.save();
    return {
      ...updatedPokemon._doc,
      _id: updatedPokemon._id.toString(),
      createdAt: updatedPokemon.createdAt.toISOString(),
      updatedAt: updatedPokemon.updatedAt.toISOString()
    };
  },
};
