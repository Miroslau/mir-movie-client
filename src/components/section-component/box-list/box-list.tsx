import React, { FC } from "react";
import { Wrapper, Title } from "./box-list-styled";
import Item from "./item/item";

interface BoxListProps<T> {
  data: Array<T> | null;
  title: string;
  handleClick: (arg: any) => void;
  navigateClick?: () => void;
}
const BoxList: FC<BoxListProps<any>> = ({ data, title, handleClick, navigateClick }) => {
  return (
    <div>
      <Title onClick={navigateClick}>{title}</Title>
      <Wrapper>
        {data?.map((item) => (
            <Item key={item.id} item={item} handleClick={handleClick} />
        ))}
      </Wrapper>
    </div>
  );
};

export default React.memo(BoxList);
