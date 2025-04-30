import {Box, Card, CardContent, CardMedia, Chip, Typography, CardMediaProps} from "@mui/material";
import {POKEMON_TYPE_COLOURS} from "../constants/constants.ts";
import CaptureChip from "./CaptureChip.tsx";
import { styled } from '@mui/material/styles';

export interface IPokemon {
    _id: string;
    name: string;
    pokemonTypes: string[];
    imgUrl: string;
    idNumber: string;
    captured: boolean;
}

interface Props {
    pokemon: IPokemon;
    handleOnCapture: (pokemon: IPokemon) => void;
}

const StyledCard = styled(Card)`
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 2px solid black;
`;

const StyledBox = styled(Box)(({theme}) => (
    {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: theme.spacing(1),
    }
));

const StyledCardContent = styled(CardContent)(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
}))

interface StyledCardMediaProps extends CardMediaProps {
    component?: React.ElementType; // Add `component` prop to allow dynamic element change
    alt?: string;
}

const StyledCardMedia = styled(CardMedia)<StyledCardMediaProps>`
    max-height: 200px;
    width: auto;
    max-width: 100%;
`;

const PokemonCard = ({pokemon, handleOnCapture}: Props) => {

    const onClickCapture = () => {
        handleOnCapture({...pokemon, captured: !pokemon.captured});
    }

    return (
        <StyledCard>
            <StyledBox>
                <StyledCardMedia
                    component="img"
                    image={pokemon.imgUrl}
                    alt={pokemon.name}
                />
            </StyledBox>

            <StyledCardContent>
                <Typography variant="body2" gutterBottom>{`#${pokemon.idNumber}`}</Typography>
                <Typography
                    variant="h5"
                    component="p"
                    gutterBottom
                >
                    {pokemon.name}
                </Typography>
                <Box mb={2}>
                    {
                        pokemon.pokemonTypes.length > 0 && (
                            pokemon.pokemonTypes.map((type, index) => (
                                <Chip size="small" key={`${pokemon.name}-${type}-${index}`} label={type} sx={{ backgroundColor: POKEMON_TYPE_COLOURS.get(type), mr: 1}}/>
                            ))
                        )
                    }
                </Box>
                <CaptureChip captured={pokemon.captured} onClick={onClickCapture} />

            </StyledCardContent>
        </StyledCard>
    );
};

export default PokemonCard;