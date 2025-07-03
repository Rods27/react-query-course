import styled, { keyframes } from 'styled-components';

const rotateLoadingCircle = keyframes`
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }

  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }

  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }

  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }

  100% {
    transform: rotate(360deg);
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: end;
  padding-right: 20px;
  top: -50px;
`;

export const Loader = styled.div`
  position: fixed;
  width: 20px;
  height: 20px;
  border: 3px solid goldenrod;
  border-radius: 50%;
  animation: ${rotateLoadingCircle} 1.2s steps(50) infinite;
`;
