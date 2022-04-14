import { makeStyles } from "@mui/styles";
import theme from "./theme";
import HomeImg from "../assets/images/home-img.svg";

export const useHomeStyles = makeStyles(() => ({
  paper: {
    padding: theme.spacing(1),
    maxWidth: '800px',
    borderRadius: '10px',
    boxShadow: '0px 9px 18px rgba(0, 0, 0, 0.18), 0px 5.5px 5px rgba(0, 0, 0, 0.24)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  },
  container: {
    alignItems: 'center',
    margin: '30px 20px 30px 20px',
  },
  img: {
    backgroundImage: `url(${HomeImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    width: 180,
    height: 175
  },
}));

