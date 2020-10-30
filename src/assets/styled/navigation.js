import styled from "styled-components";

export const NavBar = styled.nav`
  height: 3.875em;
  background-color: white;
  display: flex;
  align-content: center;
  border-bottom: 1px solid #e0e0e0;
  grid-column: 1 / last-line;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  
  .logo {
    grid-column: 2 / 3;
  }
`;

export const Sidebar = styled.div`
  position: absolute;
  left: -200px;
  padding-top: 1rem;
  border-radius: 8px;
  display: inline-block;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  padding-bottom: 1em;

  @media ${({ theme }) => theme.mediaQueries.minWidth768} {
    grid-column: 2 / span 3;
    position: static;
  }

  @media ${({ theme }) => theme.mediaQueries.minWidth1024} {
    grid-column: 2 / span 2;
  }
`;

export const SidebarHeader = styled.div`
  margin-bottom: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
`;
