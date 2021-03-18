import styled from "styled-components";

export const SpanRoles = styled.span`
.tooltip {
  position: relative;
  background-color: red;
  width: 0px;

  &__item {
    position: absolute;
    min-width: 100px;
    padding: 20px;
    visibility: hidden;
    opacity: 0;
    background: white;
    transition: all .250s cubic-bezier(0, 0, 0.2, 1);
    color: #484848;
    border: 1px solid #cecece;
    border-radius: 3px;
    font-weight: 500;
    box-shadow: 0 2px 1px #bcbcbc;
    z-index: 4;
    &:after {
      content: "";
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }
  }
  &__initiator {
    cursor: pointer;
    z-index: 5;
  }
  
  &[data-direction="left"] {
    
    .tooltip__initiator:hover ~ .tooltip__item {
      transform: translate3d(0, -50%, 0);
      visibility: visible;
      opacity: 1;
      border-radius: 5px;
    }
    
    .tooltip__item {
      top: 50%;
      right: calc(100% + 1em);   
      transform: translate3d(15px, -50%, 0);

      &:after {
        top: 50%;
        right: -0.5em;
        transform: translate3d(0, -50%, 0);
        border-width: 0.5em 0 0.5em 0.5em;
        border-color: transparent transparent transparent white;
        -webkit-filter: drop-shadow(1px 2px 1px #bcbcbc);
        filter: drop-shadow(1px 2px 1px #bcbcbc);
      }
    }
  }
}
`;