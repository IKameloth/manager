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

export const LoginStyled = styled.main`
  animation: 1s ${fadeIn} ease-in;
  background: #f7f9fc;

  .h1 {
    span {
      color: #2962ff;
    }
  }

  .form {
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 30%;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 80%;
    height: 90vh;
  }

  /* DESKTOP */
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

    .form {
      justify-content: center;
      text-align: center;
      height: 100vh;
      width: 50vw;
    }

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

  /* SMARTPHONE */
  @media screen and (max-width: 767px) {
    position: absolute;
    width: 100vw;

    .form {
      justify-content: center;
      text-align: center;
      width: 100vw;
    }

    .content {
      padding-top: 25px;
      height: 100vh;
      z-index: 2;

      h1 {
        font-size: 2rem;
      }

      h3 {
        font-size: 2rem;
      }

      .label {
        border-radius: 5px;
        background-image: linear-gradient(to right top, #ffffff, #fcfcfc, #f9f9f9, #f7f7f7, #f4f4f4);
        opacity: 0.9;
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
    width: 100vw;
    height: auto;
    position: absolute;
    top: 30%;
    left: 50%;
  }

  @media screen and (max-width: 767px) {
    position: absolute;
    top: 30%;
    width: 100vw;
    z-index: 1;
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
