import {Chip} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

interface Props {
    captured: boolean;
    onClick: () => void;
}
const CaptureChip = ({ captured, onClick}: Props) => {
    return <>
        {captured ? (
            <Chip icon={<DoneIcon />} label="Captured" color="success" onClick={onClick} variant="outlined" />
        ) : <Chip icon={<CatchingPokemonIcon />} label="Capture" onClick={onClick} color="secondary" variant="outlined" />}
    </>

}

export default CaptureChip;