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
  z-index: 0.1;
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

  @media (max-width: 768px) {
    grid-row: 2 / 9;
    margin-bottom: 30px;
    margin-right: -17px;
  }
`;

export const MainHeader = styled.div`
  display: flex;
  padding-top: 2em;
  padding-right: 1.5em;
  padding-left: 1.5em;
  padding-bottom: 1.5em;
  margin-bottom: 2em;

  @media (max-width: 768px) {
    text-align: center;
  }
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
  tr {
    vertical-align: middle;
    padding-left: 1.5em;
    padding-right: 1.5em;
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
      opacity: 1;
      justify-content: flex-end;
    }
  }
`;

export const BodyFooterContent = styled.div`
  position: relative;
  
  .body__footer {
    width: 100%;
    position: absolute;
    height: 4rem;
    background: #f5f5f5;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 0 1.5rem;
    bottom: 0;
    display: -webkit-box;
    display: flex;
  }

  .footer__results {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: #6c7175;
    text-align: right;
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    p {
      margin-right: 0.5rem;
    }
  }

  .input-group {
    display: -webkit-box;
    display: flex;
    position: relative;
    flex-wrap: wrap;
    -webkit-box-align: stretch;
    align-items: stretch;

    p {
      line-height: 32px;
      background: #fff;
      font-weight: 500;
      font-size: 13.47px;
      color: #6c7175;
      letter-spacing: 0.5px;
      padding: 0 0.4rem;

      span {
        color: #212529;
      }
    }
  }

  .input-group-prepend {
    margin-right: -1px;

    i {
      border-radius: 0.25rem 0 0 0.25rem;
    }
  }

  .input-group-text {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 0.25rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #5b636b;
    text-align: center;
    white-space: nowrap;
    background-color: #fff;
    cursor: pointer;
    -webkit-transition: all 0.25s cubic-bezier(0.27, 0.01, 0.38, 1.06);
    transition: all 0.25s cubic-bezier(0.27, 0.01, 0.38, 1.06);

    &:hover {
      background: #f5f5f5;
    }
  }

  .input-group-number {
    position: relative;
    z-index: 2;
    margin: 0;
    border: none;
    background: #fff;
    width: 2rem;
    padding: 0 0.4rem;
    font-size: 13.47px;
    color: #6c7175;
    letter-spacing: 0.5px;
  }

  .btn,
  .input-group-number {
    text-align: center;
    font-weight: 500;
  }

  .input-group-append {
    margin-left: -1px;

    i {
      border-radius: 0 0.25rem 0.25rem 0;
    }
  }

  .footer__pagination {
    display: -webkit-box;
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    .input-group {
      margin: 0 0.4rem;
    }
  }

  .btn-white {
    background-color: #fff;
    border-radius: 4px;

    i {
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #6c7175;
      padding: 0.25rem 0.75rem;
    }

    &:hover {
      background: #f5f5f5;
    }
  }
`;

export const BodyFooter = styled.div`
  width: 100%;
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
  color: #6c7175;
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
    font-size: 12px;
    line-height: 16px;
    color: #6c7175;
    text-align: right;
    display: flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #5b636b;
    text-align: center;
    white-space: nowrap;
    background-color: white;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.27, 0.01, 0.38, 1.06);
    margin-right: -1px;
  i {
    border-radius: 0.25rem 0 0 0.25rem;
  }

  .fas {
    font-family: "Font Awesome 5 Pro";
  }
`;

export const InputAppend = styled.div`
  margin-left: -1px;
  i {
    border-radius: 0 0.25rem 0.25rem 0;
  }
`;

export const ContainerElement = styled.div`
  margin-top: 15%;

  div {
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  i {
    font-size: 100px;
    color: #0f4fff;
  }
`;

