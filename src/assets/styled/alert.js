import styled from "styled-components";

export const Notification = styled.div`
  z-index: 101 !important;
  position: absolute;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  left: 50%;
  top: 15vh;

  @media (max-width: 768px) {
    top: 0;
    width: 100%;
  }

  .notification { 
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    left: 50%;
    align-items: center;
    justify-content: center;
    animation: fade 0.3s ease-in-out;
  }

  @keyframes fade {
     from {
        opacity: 0;
      }
     to {
        opcaity: 1;
      }
    }
`;
