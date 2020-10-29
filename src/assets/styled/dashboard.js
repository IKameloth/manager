import styled from "styled-components";

export const Main = styled.main`
  grid-column: 2 / 12;
  grid-row: 2 / 8;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  overflow-x: scroll;
  position: relative;

  @media ${({ theme }) => theme.mediaQueries.minWidth768} {
    grid-column: 5 / 12;
  }
  @media ${({ theme }) => theme.mediaQueries.minWidth1024}{
    grid-column: 4 / 12;
  }
`;

export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 2em;
  padding-right: 1.5em;
  padding-left: 1.5em;
  margin-bottom: 2em;
`;

export const MainContent = styled.table`
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  th, td {
    vertical-align: middle;
    padding-left: 1.5em;
    padding-right: 1.5em;
    .tag {
      margin-right: 8px;
    }
    .buttons {
      opacity: 0;
      justify-content: flex-end;
    }
  }

  tr {
    &:hover {
      .buttons {
        opacity: 1;
      }
    }
  }
`;

