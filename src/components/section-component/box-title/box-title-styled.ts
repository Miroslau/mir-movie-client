import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  padding: 140px 0 24px 88px;
  max-width: 714px;
  width: 100%;
  @media screen and (max-width: 1770px) {
    padding: 40px 0 24px 88px;
  }
`;

export const Title = styled.p`
  font-family: Oswald;
  font-style: normal;
  fonw-weight: bold;
  font-size: 45px;
  color: white;
`;

export const SubTitle = styled.p`
  padding-top: 20px;
  font-family: Outfit;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  color: white;
`;
