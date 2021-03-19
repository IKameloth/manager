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
  background: #f7f9fc;
  animation: 1s ${fadeIn} ease-in;

  @media screen and (min-width: 1024px) {
    display: flex;
    width: 100vw;
    height: 100vh;
  }

  /* TABLET */
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    left: 0;
    top: 0;
    position: absolute;
    width: 100vw;
  }

  /* SMARTPHONE */
  @media screen and (max-width: 767px) {
    left: 0;
    top: 0;
    position: absolute;
    width: 100vw;
  }
`;

export const H1 = styled.h1`
  span {
    color: #2962ff;
  }
`;

export const Form = styled.form`
  background: #fff;

  @media screen and (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 30%;

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 80%;
      height: 90vh;
    }
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;
    height: 100vh;
    width: 50vw;

    .content {
      padding-top: 25px;
      height: 100vh;

      h1 {
        font-size: 2rem;
      }

      h3 {
        font-size: 2rem;
      }
    }
  }

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    align-items: center;

    .content {
      
      padding-top: 25px;
      height: 100vh;

      h1 {
        font-size: 2rem;
      }

      h3 {
        font-size: 2rem;
      }
    }

  }
`;

export const LoginImage = styled.img.attrs(props => ({
  src: BackgroundImage,
  alt: "Login Image",
}))`
  @media screen and (min-width: 1024px) {
    width: 100vw;
    align-self: center;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    max-width: 50%;
    height: auto;
    position: absolute;
    right: 0;
    top: 30%;
  }

  @media screen and (max-width: 767px) {
    display: none;
  }
`;

export const Forgot = styled.a`
  display: inline-block;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const LogoImage = styled.img.attrs(props => ({
  src: LogoAutentia,
  alt: "Logo Autentia",
}))`
  display: inline-block;
  height: 15px;
`;
