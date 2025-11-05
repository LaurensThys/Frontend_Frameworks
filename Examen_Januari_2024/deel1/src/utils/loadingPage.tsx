import styled from 'styled-components'

const LoadingPage = styled.span`
  width: 150px; /* control the size */
  aspect-ratio: 1;
  display: grid;
  mask: conic-gradient(from 22deg, #0003, #000);
  animation: load 1s steps(8) infinite;

  position: fixed;
  z-index: 999999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  flex-grow: 1;

  &,
  &:before {
    --_g: linear-gradient(#17177c 0 0) 50%; /* update the color here */
    background:
              var(--_g)/34% 8%  space no-repeat,
              var(--_g)/8%  34% no-repeat space;
  }

  &:before {
    content: "";
    transform: rotate(45deg);
  }

  @keyframes load {
    to { transform: rotate(1turn); }
  }
`

export default LoadingPage
