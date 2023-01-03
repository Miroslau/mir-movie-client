import styled from "styled-components";

interface ItemProps {
  image: string;
}

export const Image = styled.img`
  max-width: 182px;
  width: 100%;
  height: auto;
  border: 4px solid transparent;
  border-radius: 24px;
  transition: 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    border: 4px solid rgba(250, 71, 118, 0.5);
    transform: scale(1.3);
    border-radius: 24px;
    transition: 0.3s ease-in-out;
  }
`;
