import {Box, Card, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import {POKEMON_TYPE_COLOURS} from "../constants/constants.ts";
import CaptureChip from "./CaptureChip.tsx";

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

const PokemonCard = ({pokemon, handleOnCapture}: Props) => {

    const onClickCapture = () => {
        handleOnCapture({...pokemon, captured: !pokemon.captured});
    }

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                border: "2px solid black"
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 1,
                }}
            >
                <CardMedia
                    component="img"
                    image={pokemon.imgUrl}
                    alt={pokemon.name}
                    sx={{
                        maxHeight: 200,
                        width: "auto",
                        maxWidth: "100%"
                    }}
                />
            </Box>

            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    paddingY: 2,
                }}
            >
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

            </CardContent>
        </Card>
    );
};

export default PokemonCard;