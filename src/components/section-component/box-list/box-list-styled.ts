import styled from "styled-components";

export const Wrapper = styled.div`
  background: rgba(103, 101, 113, 0.34);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 24px;
  backdrop-filter: blur(10px);
  padding: 15px 19px;
  display: flex;
  gap: 29px;
  align-items: center;
`;

export const Title = styled.p`
  font-family: Oswald;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
  color: white;
  padding: 20px 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: rgba(250, 71, 118, 0.5);
    font-size: 40px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
  }
`;
