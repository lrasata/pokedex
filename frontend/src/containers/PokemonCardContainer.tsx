import {useEffect, useState} from "react";
import {Box, Button, Grid, Typography, useMediaQuery, useTheme} from "@mui/material";
import PokemonCard, {IPokemon} from "../components/PokemonCard.tsx";
import {updatePokemon} from "../utils/updatePokemon.tsx";
import SearchBar from "../components/SearchBar.tsx";
import {fetchPokemons} from "../utils/fetchPokemons.tsx";
import MultipleSelect from "../components/MultipleSelect.tsx";
import {POKEMON_TYPE_COLOURS} from "../constants/constants.ts";

const PokemonCardContainer = () => {
    const theme = useTheme();
    const isMobile =  useMediaQuery(theme.breakpoints.down("sm"));

    const [pokemons, setPokemons] = useState<IPokemon[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [resultMessage, setResultMessage] = useState<string>("");

    const [inputSearch, setInputSearch] = useState<string>('');
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

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
            setResultMessage(`Showing ${pokemons.length} results out of ${total}`)
        }

    }, [pokemons]);

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
        const cleanedSearchText = searchText.replace(/^#/,'');
        setInputSearch(cleanedSearchText);

        const hasOnlyDigits = /^\d+$/.test(cleanedSearchText);
        let filters = hasOnlyDigits ? {idNumber: cleanedSearchText} : {name: cleanedSearchText};

        const hasSelectedTypes = selectedOptions.length > 0;
        // @ts-ignore
        filters = hasSelectedTypes ? {...filters, pokemonTypes: selectedOptions} : {...filters}

        const { pokemons, totalPokemons} = await fetchPokemons(filters);
        setPokemons(pokemons);
        setTotal(totalPokemons);
    }

    const handleOnSelectType = async () => {
        let filters = {};
        const hasSearch = inputSearch.trim() !== '';
        const hasOnlyDigits = /^\d+$/.test(inputSearch);

        if (selectedOptions.length > 0) {
            filters = { pokemonTypes : selectedOptions }
        }

        if (hasSearch) {
            if (hasOnlyDigits) {
                filters = {...filters, idNumber: inputSearch};
            } else {
                filters = {...filters, name: inputSearch};
            }
        }

        const response = await fetchPokemons(filters);
        const { pokemons, totalPokemons } = response;

        setPokemons(pokemons);
        setTotal(totalPokemons);
    }

    useEffect(() => {
        handleOnSelectType();

    }, [selectedOptions]);

    const handleOnLoadMore = async () => {
        const {pokemons, totalPokemons} = await fetchPokemons({ page: currentPage + 1});

        setCurrentPage( prevState => prevState + 1);
        setPokemons(prevState => [...prevState, ...pokemons]);
        setTotal(totalPokemons)
    }

    return <>
        <Grid container spacing={2} width={"100%"}>
            <Grid size={{ xs: 12, md: 8 }}>
                <SearchBar inputSearchText={inputSearch} handleSearch={handleInputSearch} />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
                <MultipleSelect options={Array.from(POKEMON_TYPE_COLOURS.keys())} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            </Grid>
        </Grid>

        <Box my={2} width="100%">
            <Typography variant="subtitle1" color="textPrimary" component="p" textAlign="left">{resultMessage}</Typography>
        </Box>

        <Grid container
              spacing={4}
              justifyContent="center"
              display="flex"
              flexGrow={1}
              alignItems="stretch"
              width={"100%"}
              mb={3}>
            {
                pokemons.map((pokemon, index) => (
                    <Grid size={{ xs:12, sm:6, md:4 }} key={`${pokemon._id}-${pokemon.name}-${index}`}>
                        <PokemonCard pokemon={pokemon} handleOnCapture={handleOnCapturePokemon}/>
                    </Grid>
                ))
            }
        </Grid>
        {
            pokemons.length < total  && <Button variant="contained" fullWidth={isMobile} onClick={handleOnLoadMore}>Load more</Button>
        }

    </>
}

export default PokemonCardContainer;