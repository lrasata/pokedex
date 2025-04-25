import {graphQLRequest} from "./graphQLRequest.ts";

export const GET_POKEMONS_QUERY = `
  query GetPokemons($page: Int, $name: String, $idNumber: String, $pokemonTypes: [String]) {
    getPokemons(page: $page, name: $name, idNumber: $idNumber, pokemonTypes: $pokemonTypes) {
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

export async function fetchPokemons({ page, name, idNumber, pokemonTypes }: { page?: number; name?: string; idNumber?: string; pokemonTypes?: string[] }) {
    try {
        const variables = {
            ...(page !== undefined && { page }),
            ...(name !== undefined && { name }),
            ...(idNumber !== undefined && { idNumber }),
            ...pokemonTypes !== undefined && { pokemonTypes },
        }
        const data = await graphQLRequest(GET_POKEMONS_QUERY, variables);
        return data.getPokemons;
    } catch (err) {
        console.error('Error fetching Pokémon:', err);
    }
}