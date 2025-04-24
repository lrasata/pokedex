import {useEffect, useState} from "react";
import {graphQLRequest, GET_POKEMONS_QUERY} from "../utils/graphQLRequest.ts";
import {Grid} from "@mui/material";
import PokemonCard, {IPokemon} from "../components/PokemonCard.tsx";
import {updatePokemon} from "../utils/updatePokemon.tsx";

const PokemonCardContainer = () => {
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await graphQLRequest(GET_POKEMONS_QUERY, {});
                setPokemons(data.getPokemons.pokemons);
            } catch (err) {
                console.error('Error fetching Pokémon:', err);
            }
        }

        loadData();
    }, []);

    const handleOnCapturePokemon = async (pokemonInput: IPokemon) => {
        const updatedPokemon = await updatePokemon(pokemonInput);
        const index = pokemons.findIndex(pokemon => pokemon._id === updatedPokemon._id)
        if (index > -1) {
            const listToUpdate = [...pokemons];
            listToUpdate[index] = {...updatedPokemon};
            setPokemons(listToUpdate);
        }
    }

    return <>
        <Grid container
              spacing={4}
              justifyContent="center"
              display="flex"
              flexGrow={1}
              alignItems="stretch"
              padding={2}
              width={"100%"}
              mb={5}>
            {
                pokemons.map((pokemon) => (
                    <Grid size={{ xs:12, sm:6, md:4 }} key={pokemon.name}>
                        <PokemonCard pokemon={pokemon} handleOnCapture={handleOnCapturePokemon}/>
                    </Grid>
                ))
            }

        </Grid>
    </>
}

export default PokemonCardContainer;