import {IPokemon} from "../components/PokemonCard.tsx";
import {graphQLRequest} from "./graphQLRequest.ts";

export const UPDATE_POKEMON_MUTATION = `
    mutation UpdatePokemon($id: ID!, $input: PokemonInputData!) {
        updatePokemon(id: $id, pokemonInput: $input) {
            _id
            name
            captured
            imgUrl
            pokemonTypes
            idNumber
        }
    }
`;

export async function updatePokemon(pokemon: IPokemon) {
    try {
        const variables = {
            id: pokemon._id,
            input: {
                name: pokemon.name,
                captured: pokemon.captured,
                imgUrl: pokemon.imgUrl,
                pokemonTypes: pokemon.pokemonTypes,
                idNumber: pokemon.idNumber,
            }
        };

        const data = await graphQLRequest(UPDATE_POKEMON_MUTATION, variables);
        return data.updatePokemon;
    } catch (err) {
        console.error('Error updating Pokémon:', err);
    }
}