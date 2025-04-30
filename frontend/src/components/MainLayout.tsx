import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";
import PokemonCardContainer from "../containers/PokemonCardContainer.tsx";
import pokeballLogo from "../assets/pokeball.png";
import { styled } from '@mui/material/styles';

const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignItems: "center",
    // paddingY: theme.spacing(6), Emotion's styled function doesn't understand MUI's sx shorthands like paddingY, paddingX
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
}));



const MainLayout = () => {
    const theme =  useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    return <>
        <StyledBox>
            <img src={pokeballLogo} alt="pokeball logo" width={isMobile ?  "70px" : "100px"} />
            <Typography variant="h1" component="h1" my={4}>Pokedex</Typography>
            <PokemonCardContainer />
        </StyledBox>
    </>
}

export default MainLayout;