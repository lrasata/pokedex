import {useEffect, useState} from "react";
import {Box, Grid, Typography} from "@mui/material";
import PokemonCard, {IPokemon} from "../components/PokemonCard.tsx";
import {updatePokemon} from "../utils/updatePokemon.tsx";
import SearchBar from "../components/SearchBar.tsx";
import {fetchPokemons} from "../utils/fetchPokemons.tsx";

const PokemonCardContainer = () => {
    const [pokemons, setPokemons] = useState<IPokemon[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [resultMessage, setResultMessage] = useState<string>("");

    const [inputSearch, setInputSearch] = useState<string>('');

    useEffect(() => {
        async function loadData() {
            const { pokemons, totalPokemons} = await fetchPokemons({});
            setPokemons(pokemons);
            setTotal(totalPokemons)
        }

        loadData();
    }, []);

    useEffect(() => {
        if (total === 0) {
            setResultMessage('No result for this search')
        }else if (total === 1){
            setResultMessage(`Showing 1 result`)
        } else {
            setResultMessage(`Showing ${total} results`)
        }

    }, [total]);

    const handleOnCapturePokemon = async (pokemonInput: IPokemon) => {
        const updatedPokemon = await updatePokemon(pokemonInput);
        const index = pokemons.findIndex(pokemon => pokemon._id === updatedPokemon._id)
        if (index > -1) {
            const listToUpdate = [...pokemons];
            listToUpdate[index] = {...updatedPokemon};
            setPokemons(listToUpdate);
        }
    }

    const handleInputSearch = async (searchText: string) => {
        setInputSearch(searchText);

        const cleanedSearchText = searchText.replace(/^#/,'');
        const hasOnlyDigits = /^\d+$/.test(cleanedSearchText);
        const { pokemons, totalPokemons} = await fetchPokemons(hasOnlyDigits ? {idNumber: cleanedSearchText} : {name: cleanedSearchText});
        setPokemons(pokemons);
        setTotal(totalPokemons);
    }

    return <>
        <SearchBar inputSearchText={inputSearch} handleSearch={handleInputSearch} />
        <Box my={2}>
            <Typography variant="subtitle1" color="textPrimary" component="p">{resultMessage}</Typography>
        </Box>

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