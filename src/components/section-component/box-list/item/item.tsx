import React, { FC } from "react";
import { movieType } from "../../../../types/moive-type";
import { Image } from "./item-styled";
import emptyImg from "../../../../assets/emptyImg.png";
interface ItemProps {
  item: movieType;
  handleClick: (arg: any) => void;
}
const Item: FC<ItemProps> = ({ item, handleClick }) => {
  return (
    <Image
      onClick={handleClick?.bind(this, item)}
      src={item.posterUrl ? item.posterUrl : emptyImg}
      alt="poster"
    />
  );
};

export default Item;
