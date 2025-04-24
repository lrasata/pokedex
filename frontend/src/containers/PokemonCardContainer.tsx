import {useEffect, useState} from "react";
import {fetchData, GET_POKEMONS_QUERY} from "../utils/utils.ts";
import {Grid} from "@mui/material";
import PokemonCard, {IPokemonCard} from "../components/PokemonCard.tsx";

const PokemonCardContainer = () => {
    const [pokemons, setPokemons] = useState<IPokemonCard[]>([]);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await fetchData(GET_POKEMONS_QUERY, { });
                setPokemons(data);
            } catch (err) {
                console.error('Error fetching Pokémon:', err);
            }
        }

        loadData();
    }, []);

    return <>
        <Grid container
              spacing={2}
              justifyContent="center"
              display="flex"
              flexGrow={1}
              alignItems="stretch"
              padding={2}
              mb={5}>
            {
                pokemons.map((pokemon) => (
                    <Grid size={{ xs:12, sm:6, md:3 }} key={pokemon.name}>
                        <PokemonCard {...pokemon}/>
                    </Grid>
                ))
            }

        </Grid>
    </>
}

export default PokemonCardContainer;