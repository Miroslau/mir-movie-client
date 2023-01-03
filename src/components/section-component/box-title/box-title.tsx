import React, { FC } from "react";
import { Container, Title, SubTitle } from "./box-title-styled";

interface BoxTitle {
  title: string | undefined;
  subTitle?: string;
  padding: string;
}

const BoxTitle: FC<BoxTitle> = ({ title = "", subTitle = "", padding }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </Container>
  );
};

export default BoxTitle;
