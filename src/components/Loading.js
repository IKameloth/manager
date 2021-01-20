import React from "react";
import styled from "styled-components";

const LoadingIcon = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 40px 40px;

    &:after {
      content: " ";
      display: block;
      position: absolute;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #2962ff;
      margin: -4px 0 0 -4px;
    }

    &:nth-child(1) {
      animation-delay: -0.036s;

      &:after {
        top: 63px;
        left: 63px;
      }
    }

    &:nth-child(2) {
      animation-delay: -0.072s;

      &:after {
        top: 68px;
        left: 56px;
      }
    }

    &:nth-child(3) {
      animation-delay: -0.108s;

      &:after {
        top: 71px;
        left: 48px;
      }
    }

    &:nth-child(4) {
      animation-delay: -0.144s;

      &:after {
        top: 72px;
        left: 40px;
      }
    }

    &:nth-child(5) {
      animation-delay: -0.18s;

      &:after {
        top: 71px;
        left: 32px;
      }
    }

    &:nth-child(6) {
      animation-delay: -0.216s;

      &:after {
        top: 68px;
        left: 24px;
      }
    }

    &:nth-child(7) {
      animation-delay: -0.252s;

      &:after {
        top: 63px;
        left: 17px;
      }
    }

    &:nth-child(8) {
      animation-delay: -0.288s;

      &:after {
        top: 56px;
        left: 12px;
      }
    }
  }

  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

`;

const ContentLoading = styled.div`
  z-index: 0.1;
  grid-column: 5 / 12;
  border-radius: 8px;
  background: inherit;
  position: relative;
  text-align: center;
  justify-content: center;
  margin-top: 5px;

  i {
    font-size: 100px;
    color: red;
  }

  .field {
    width: 50%;
    height: 50%;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }

  @media (max-width: 1024px) {
    margin-top: 0;
    grid-column: 6 / 12;
    grid-row: 2 / 3;
  }

  @media (max-width: 768px) {
    margin-top: 0;
    margin-right: 0px;
    grid-column: 3 / 12;
    grid-row: 2 / 7;
  }
`;

const Loading = () => {
  return(
    <ContentLoading className="columns is-centered">
      <div className="column">
        <div className="field">
          <LoadingIcon>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </LoadingIcon>
        </div>
      </div>
    </ContentLoading>
  )
}

export default Loading;
