const {buildSchema} = require('graphql');

module.exports = buildSchema(`
    enum PokemonType {
      Bug
      Dark
      Dragon
      Electric
      Fairy
      Fighting
      Fire
      Flying
      Ghost
      Grass
      Ground
      Ice
      Normal
      Poison
      Psychic
      Rock
      Steel
      Water
    }
    
    type Pokemon {
      _id: String!
      name: String!
      captured: Boolean!
      imgUrl: String!
      pokemonTypes: [PokemonType!]!
    }
    
    type PokemonData {
        pokemons: [Pokemon!]!
        totalPokemons: Int!
    }

    input PokemonInputData {
      name: String!
      captured: Boolean!
      imgUrl: String!
      pokemonTypes: [PokemonType!]!
    }

    type RootQuery {
        getPokemons(page: Int): PokemonData!
        getPokemonById(id: ID!): Pokemon!
    }

    type RootMutation {
        updatePokemon(id: ID!, pokemonInput: PokemonInputData!): Pokemon!
        createPokemon(pokemonInput: PokemonInputData!): Pokemon!
        createAllPokemon(allPokemonInput: [PokemonInputData!]!): [Pokemon!]!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
