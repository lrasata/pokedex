import {graphQLRequest} from "./graphQLRequest.ts";

export const GET_POKEMONS_QUERY = `
  query GetPokemons($page: Int, $name: String, $idNumber: String) {
    getPokemons(page: $page, name: $name, idNumber: $idNumber) {
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

export async function fetchPokemons({ page, name, idNumber }: { page?: number; name?: string; idNumber?: string }) {
    try {
        const variables = {
            ...(page !== undefined && { page }),
            ...(name !== undefined && { name }),
            ...(idNumber !== undefined && { idNumber })
        }
        const data = await graphQLRequest(GET_POKEMONS_QUERY, variables);
        return data.getPokemons;
    } catch (err) {
        console.error('Error fetching Pokémon:', err);
    }
}