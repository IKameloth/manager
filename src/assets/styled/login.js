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
  display: flex;
  animation: 1s ${fadeIn} ease-in;
`;

export const H1 = styled.h1`
  span {
    color: #2962ff;
  }
`;

export const H3 = styled.h3`

`;

export const Form = styled.form`
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 30%;
  .content{
    width: 80%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;

export const LoginImage = styled.img.attrs(props => ({
  src: BackgroundImage,
  alt: "Login Image",
}))`
  width: 100vw;
  align-self: center;
`;

export const Forgot = styled.a`
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
`;