import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  padding: 60px 60px; 
`;

export const Movie = styled.div`
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
  transition: .5s ease-in-out;
  
`;

export const MiddleItem = styled.div`
  transition: .5s ease-in-out;
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
    opacity: .3;
  }

  &:hover ${MiddleItem} {
    opacity: 1;
  }
`;

export const Text = styled.div`
  background-color: #04AA6D;
  color: white;
  font-size: 16px;
  padding: 16px 32px;
`;

export const Item = styled.div`
  position: relative;
  width: 100%;
`;

export const Title = styled.h3`
  font-family: 'Lato';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #ffedc2;
  max-width: max-content;
`;

export const GenresBlock = styled.div`
  display: grid;
  padding-top: 15px;
  grid-template-columns: max-content minmax(3px, 18px) 53px;
  align-items: center;
`;

export const PlotBox = styled.div`
  padding-top: 50px;
  max-width: 580px;
  font-family: 'Lato';
`;

export const PlotTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
`;

export const Plot = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  padding-top: 10px;
  text-align: justify;
`;

export const MenuBlock = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  padding-top: 56px;
`;

export const ScoreBox = styled.div`
  padding: 15px;
  background: rgba(217, 217, 217, 0.1);
  border: 1px solid #A41B1B;
  border-radius: 8px;
`;

export const ScoreTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  padding-bottom: 15px;
`;

export const Score = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 43px;
  color: #ffedc2;
  text-align: center;
`;

export const ActorsBlock = styled.div`
  position: relative;
  padding-top: 45px;
  padding-bottom: 45px;
  width: 100%;
`;

export const ActorTitle = styled(ScoreTitle)`
  color: #ffedc2;
  text-align: left;
`;

export const FormContainer = styled.div`
  position: relative;
  display: grid;
  grid-gap: 30px;
`;