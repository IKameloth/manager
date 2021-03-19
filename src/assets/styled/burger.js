import styled from "styled-components";

export const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  left: 20px;
  display: none;
  justify-content: space-around;
  flex-flow: column nowrap;
  z-index: 6;

  @media (max-width: 768px) {
    display: flex;
  }

  div {
    display: none;
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? "red" : "#2962ff"};
    border-color: transparent;
    transform-origin: 1px;
    transition: all 0.3s linear;

    @media (max-width: 768px) {
      display: flex;
    }

    &:nth-child(1) {
      transform: ${({open}) => open ? "rotate(45deg)" : "rotate(0)"};
    }

    &:nth-child(2) {
      transform: ${({open}) => open ? "translateX(100%)" : "translateX(0)"};
      opacity: ${({open}) => open ? 0 : 1};
    }

    &:nth-child(3) {
      transform: ${({open}) => open ? "rotate(-45deg)" : "rotate(0)"};
    }
  }
`;