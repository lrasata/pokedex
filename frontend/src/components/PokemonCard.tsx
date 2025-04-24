import {Box, Card, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import {POKEMON_TYPE_COLOURS} from "../constants/constants.ts";

export interface IPokemonCard {
    name: string;
    pokemonTypes: string[];
    imgUrl: string;
    idNumber: string;
}

const PokemonCard = ({name, idNumber, pokemonTypes, imgUrl}: IPokemonCard) => {
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
                    justifyContent: "center"
                }}
            >
                <CardMedia
                    component="img"
                    image={imgUrl}
                    alt={name}
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
                <Typography variant="body2" gutterBottom>{`#${idNumber}`}</Typography>
                <Typography
                    variant="h5"
                    component="p"
                    gutterBottom
                >
                    {name}
                </Typography>
                <Box>
                    {
                        pokemonTypes.length > 0 && (
                            pokemonTypes.map((type, index) => (
                                <Chip key={`${name}-${type}-${index}`} label={type} variant="outlined" sx={{ backgroundColor: POKEMON_TYPE_COLOURS.get(type), mr: 1}}/>
                            ))
                        )
                    }
                </Box>

            </CardContent>
        </Card>
    );
};

export default PokemonCard;