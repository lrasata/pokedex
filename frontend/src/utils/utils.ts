import {API_BACKEND_URL} from "../constants/constants.ts";

export const GET_POKEMONS_QUERY = `
  query GetPokemons {
    getPokemons(page: 1) {
        totalPokemons
        pokemons {
            _id
            name
            captured
            imgUrl
            pokemonTypes
        }
    }
}
`;

export async function fetchData(query: any, variables: any) {
    const response = await fetch(`${API_BACKEND_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    const result = await response.json();

    if (result.errors) {
        throw new Error(result.errors.map((err: { message: any; }) => err.message).join(', '));
    }

    return result.data.getPokemons.pokemons;
}