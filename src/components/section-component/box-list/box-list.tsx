import React, { FC } from "react";
import { Container } from "./box-list-styled";
import Item from "./item/item";

interface BoxListProps<T> {
  data: Array<T> | null;
  handleClick: (arg: any) => void;
}
const BoxList: FC<BoxListProps<any>> = ({ data, handleClick }) => {
  return (
    <Container>
      {data?.map((item) => (
        <Item key={item.id} item={item} handleClick={handleClick} />
      ))}
    </Container>
  );
};

export default BoxList;
