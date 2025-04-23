import {Box, Typography} from "@mui/material";
import PokemonCardContainer from "../containers/PokemonCardContainer.tsx";

const MainLayout = () => {
    return <>
        <Box display="flex" flexDirection="column" textAlign="center" >
            <Typography variant="h1" component="h1" my={8}>Pokedex</Typography>
            <PokemonCardContainer />
        </Box>

    </>
}

export default MainLayout;