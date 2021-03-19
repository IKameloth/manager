import styled from "styled-components";

export const Avatar = styled.span`
  height: 64px;
  width: 64px;
  background-color: #c3d3ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5em;
  animation: fadeIn ease 5s;

  @keyframes fadeIn{
    0% {
      opacity:0;
    }
    100% {
      opacity:1;
    }
  }
`;