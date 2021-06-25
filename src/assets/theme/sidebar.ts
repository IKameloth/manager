import styled, { keyframes } from "styled-components";

interface Props {
  open: boolean;
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const NavBar = styled.nav`
height: 3.875em;
background-color: #fff;
display: -webkit-box;
display: flex;
align-content: center;
border-bottom: 1px solid #e0e0e0;
grid-column: 1 / last-line;
display: grid;
grid-template-columns: repeat(12, 1fr);

.logo {
  grid-column: 2/3;
}

@media (max-width: 768px) {
  .logo {
    grid-column: 6 / 8;
    width: max-content;
    justify-content: center;
  }
}

@media (max-width: 360px) {
  .logo {
    grid-column: 5 / 7;
    width: max-content;
    justify-content: center;
  }
}
`;

export const Sidebar = styled.div<Props>`
  position: absolute;
  left: -200px;
  padding-top: 1rem;
  border-radius: 8px;
  display: inline-block;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  padding-bottom: 1em;

  .sidebar-header {
    margin-bottom: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;

    h4 {
      font-size: 1rem;
      font-weight: 300;
      color: rgb(110, 110, 110);
      margin-bottom: 0.5rem;
    }

    button {
      border: none;
      background-color: transparent;
      color: rgb(50, 115, 220);
      font-weight: 300;
      font-size: 0.75rem;
      text-decoration: none;
      margin-left: 1rem;
      padding: 0.5rem 0.5rem;
      cursor: pointer;
      border-radius: 0.25rem;
      &:hover {
        background: rgb(240, 244, 255);
      }
    }
  }

  .nav {
    display: flex;
    flex-direction: column;
    padding-bottom: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    border-bottom: 1px solid rgb(232, 232, 232);
    margin-bottom: 2rem;

    a {
      border-radius: 8px;
      padding: 0.625rem;
      text-decoration: none;
      font-weight: 300;
      color: rgb(110, 110, 110);
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
      cursor: pointer;
      transition: background 0.2s ease;
      border: 1px solid transparent;
      
      &:last-child {
        margin-bottom: 0rem;
      }

      i {
        width: 20px;
        text-align: center;
        margin-right: 0.25rem;
      }

      &:hover {
        background: rgb(245, 245, 245);
      }
    }
  }

  .links-selector {
    color: rgb(41, 98, 255);
    background: rgb(240, 244, 255);
    border: 1px solid rgb(195, 211, 255);
  }

  .links {
    border-radius: 8px;
    padding: 0.625rem;
    text-decoration: none;
    font-weight: 300;
    color: rgb(110, 110, 110);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: background 0.2s ease;
    border: 1px solid transparent;

    &:last-child {
      margin-bottom: 0rem;
    }

    i {
      width: 20px;
      text-align: center;
      margin-right: 0.25rem;
    }

    &:hover {
      background: rgb(245, 245, 245);
    }
  }

  .link-logout {
    border-radius: 8px;
    padding: 0.625rem;
    text-decoration: none;
    font-weight: 300;
    color: rgb(110, 110, 110);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    transition: background 0.2s ease;
    border: 1px solid transparent;
    background-color: #fff;

    &:hover {
      background: rgb(245, 245, 245);
    }
  }

  .profile-avatar {
    height: 32px;
    width: 32px;
    background-color: #c3d3ff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5em;
  }

  .profile-name {
    font-size: 16px;
    color: #222a44;
    display: block;
    line-height: 0.75;
  }

  .profile-role {
    font-size: 12px;
    color: #6e6e6e;
  }

  .footer-profile {
    display: flex;
    justify-content: space-between;
    padding-left: 1em;
    padding-right: 1em;
    a {
      margin-left: auto;
    }
  }

  @media screen and (min-width: 1024px) {
    animation: 1s ${fadeIn} ease-in;
    grid-column: 2 / span 3;
    position: static;
  }

  @media screen and (min-width: 768px) and (max-width: 1023px) {
    animation: 1s ${fadeIn} ease-in;
    grid-column: 2 / span 3;
    position: static;
  }

  @media screen and (max-width: 768px) {
    z-index: 6;
    transform: ${({open}) => open ? "translateX(100%)" : "translate(0)"};
    transition: transform 0.3s ease-in-out;
    top: 61px;
    left: -300px;
    height: 100%;
    width: 300px;
    position: fixed;
    flex-flow: column nowrap;
    padding-top: 1rem;
    border-radius: 0px 15px;
  }
`;
