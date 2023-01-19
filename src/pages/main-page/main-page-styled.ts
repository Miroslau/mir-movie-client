import styled from "styled-components";

interface ContainerProps {
  image: string | null;
}

export const Container = styled.div<ContainerProps>`
  position: relative;
  background: linear-gradient(
      91.28deg,
      rgba(0, 0, 0, 0.25) 25%,
      rgba(0, 0, 0, 0) 82.23%
    ),
    url(${(props) => props.image});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  background-attachment: fixed;
`;

export const ContainerForMovies = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
