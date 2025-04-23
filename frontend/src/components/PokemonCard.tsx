import {Card, CardContent, CardMedia, Typography} from "@mui/material";

export interface IPokemonCard {
    name: string;
    type: string;
    imgUrl: string;
}
const PokemonCard = ({ name, type, imgUrl}: IPokemonCard) => {
    return <Card sx={{ justifyItems: "center" }}>
        <CardMedia
            component="img"
            image={imgUrl}
            alt="Ivysaur"
            sx={{ width: "65%" }}
        />
        <CardContent>
            <Typography variant="h5" component="p" gutterBottom>
                {name}
            </Typography>
            <Typography variant="body2" component="p">
                {type}
            </Typography>
        </CardContent>

    </Card>
}

export default PokemonCard;