import {graphQLRequest} from "./graphQLRequest.ts";

export const GET_POKEMONS_QUERY = `
  query GetPokemons($page: Int, $name: String) {
    getPokemons(page: $page, name: $name) {
      totalPokemons
      pokemons {
        _id
        name
        captured
        imgUrl
        pokemonTypes
        idNumber
      }
    }
  }
`;

export async function fetchPokemons({ page, name }: { page?: number; name?: string }) {
    try {
        const variables = {
            ...(page !== undefined && { page }),
            ...(name !== undefined && { name })
        }
        const data = await graphQLRequest(GET_POKEMONS_QUERY, variables);
        return data.getPokemons.pokemons;
    } catch (err) {
        console.error('Error fetching Pokémon:', err);
    }
}