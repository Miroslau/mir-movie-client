import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import { Container, Title, SubTitle } from "./box-title-styled";

interface BoxTitle {
  title: string | undefined;
  subTitle?: string;
  padding: string;
}

const styles = {
  container: {
    maxWidth: "607px",
    width: "100%",
  },
  title: {
    fontFamily: "Oswald",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "45px",
    color: "white",
  },
  subTitle: {
    paddingTop: "15px",
    fontFamily: "Outfit",
    fontStyle: "normal",
    fontWeight: 500,
    fontSize: "18px",
    lineHeight: "27px",
    color: "white",
  },
};

const BoxTitle: FC<BoxTitle> = ({ title = "", subTitle = "", padding }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <SubTitle>{subTitle}</SubTitle>
    </Container>
  );
};

export default BoxTitle;
