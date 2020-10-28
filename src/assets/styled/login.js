import styled, {keyframes} from "styled-components"
import BackgroundImage from "../images/img-login.svg"
import LogoAutentia from "../images/autentia-logo.svg"


const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  background: #f7f9fc;
  display: grid;
  grid-template-columns: 1fr;
  animation: 1s ${fadeIn} ease-in;
  
  @media screen and (min-width: 40em) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 72em) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const H1 = styled.h1`
  margin-top: 8rem;
  margin-bottom: 6rem !important;
  span {
    color: #2962ff;
  }
`;

export const H3 = styled.h3`
  margin-bottom: 2rem !important;
`;

export const Form = styled.form`
  grid-column: initial;
  background: #fff;
  padding-left: 3.125vw;
  padding-right: 3vw;

  @media screen and (min-width: 40em) {
    grid-column: 1 / 3;
  }
  @media screen and (min-width: 72em) {
    grid-column: 1 / span 3;
  }
`;

export const LoginImage = styled.img.attrs(props => ({
  src: BackgroundImage,
  alt: "Login Image",
}))`
  width: 100%;
  grid-column: initial;
  align-self: center;
  display: none;
  
  @media screen and (min-width: 40em) {
    grid-column: 3 / 5;
    display: inline;
    object-fit: cover;
    height: 70%;
    object-position: 2vw;
  }
  @media screen and (min-width: 72em) {
    grid-column: 4 / last-line;
    display: inline;
  }
`;

export const Forgot = styled.a`
  margin-top: 0.5rem;
  margin-bottom: 2.5rem;
  display: inline-block;
`;

export const LogoImage = styled.img.attrs(props => ({
  src: LogoAutentia,
  alt: "Logo Autentia",
}))`
  display: block;
  margin-bottom: 1rem;
`;

export const SectionLink = styled.div`
  margin-bottom: 12rem !important;
`;