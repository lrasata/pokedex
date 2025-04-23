import {Box, Typography} from "@mui/material";
import PokemonCardContainer from "../containers/PokemonCardContainer.tsx";
import pokeballLogo from "../assets/pokeball.png";

const MainLayout = () => {
    return <>
        <Box display="flex" flexDirection="column" textAlign="center" alignItems="center" paddingY={6}>
            <img src={pokeballLogo} alt="pokeball logo" width="100px" />
            <Typography variant="h1" component="h1" my={4}>Pokedex</Typography>
            <PokemonCardContainer />
        </Box>

    </>
}

export default MainLayout;