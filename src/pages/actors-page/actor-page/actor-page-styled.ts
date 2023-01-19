import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  padding: 60px 60px;
`;

export const Actor = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: minmax(auto, 300px) auto;
  grid-gap: 45px;
`;

export const Image = styled.img`
  opacity: 1;
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 6px;
  backface-visibility: hidden;
  transition: 0.5s ease-in-out;
`;

export const MiddleItem = styled.div`
  transition: 0.5s ease-in-out;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageBlock = styled.div`
  position: relative;
  width: 100%;
  cursor: pointer;

  &:hover ${Image} {
    opacity: 0.3;
  }

  &:hover ${MiddleItem} {
    opacity: 1;
  }
`;

export const Item = styled.div`
  position: relative;
  width: 100%;
`;

export const FullName = styled.h3`
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #ffedc2;
  max-width: max-content;
`;
