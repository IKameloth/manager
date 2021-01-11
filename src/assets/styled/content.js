import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Main = styled.main`
  grid-column: 2 / 12;
  grid-row: 2 / 8;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.06);
  overflow-x: scroll;
  position: relative;
  animation: 0.5s ${fadeIn} ease-in;

  @media ${({ theme }) => theme.mediaQueries.minWidth768} {
    grid-column: 5 / 12;
  }

  @media ${({ theme }) => theme.mediaQueries.minWidth1024} {
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

export const TableMain = styled.table`
  width: 100%;
  tr {
    &:hover {
      .buttons {
        opacity: 1;
      }
    }
  }
`;

export const THead = styled.thead`
  th {
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
`;

export const TBody = styled.tbody`
  td {
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
`;

export const BodyFooter = styled.div`
  width: 100%;
  position: absolute;
  height: 4rem;
  background: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  bottom: 0px;
`;

export const FooterResults = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: $text-black-medium-emphasis;
  text-align: right;
  display: flex;
  align-items: center;
  p {
    margin-right: 0.5rem;
  }
`;

export const FooterPagination = styled.div`
  display: flex;
  align-items: center;
  .input-group {
    margin: 0rem 0.4rem;
  }
`;

export const FooterTotal = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: $text-black-medium-emphasis;
  text-align: right;
`;

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  p {
    line-height: 32px;
    background: white;
    font-weight: 500;
    font-size: 13.47px;
    color: hsb(210, 8, 46, 1);
    letter-spacing: 0.5px;
    padding: 0rem 0.4rem;
    span {
      color: hsb(210, 20, 16, 1);
    }
  }
`;

export const InputPrepend = styled.div`
  margin-right: -1px;
  i {
    border-radius: 0.25rem 0 0 0.25rem;
  }
`;

export const InputAppend = styled.div`
  margin-left: -1px;
  i {
    border-radius: 0 0.25rem 0.25rem 0;
  }
`;

