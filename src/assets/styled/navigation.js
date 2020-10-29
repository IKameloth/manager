import styled from "styled-components";

const logo = styled.a`
  grid-column: 2 / 3;
`;

export const NavBar = styled(logo)`
  height: 3.875em;
  background-color: white;
  display: flex;
  align-content: center;
  border-bottom: 1px solid #e0e0e0;
  grid-column: 1 / last-line;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

