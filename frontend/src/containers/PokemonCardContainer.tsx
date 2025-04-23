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
        <Grid container spacing={2}>
            {
                pokemons.map((pokemon) => (
                    <Grid size={3}>
                        <PokemonCard name={pokemon.name} imgUrl={pokemon.imgUrl} type={pokemon.type}/>
                    </Grid>
                ))
            }

        </Grid>
    </>
}

export default PokemonCardContainer;