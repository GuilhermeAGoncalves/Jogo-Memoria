// @flow
import { GridItemType } from "../../types/GridItemType";
import * as C from "./GridCell.style";
import B7WebSVG from "../../svgs/b7.svg";
import { items } from "../../data/items";

type Props = {
  item: GridItemType;
  onClick: () => void;
};

export const GridCell = ({ item, onClick }: Props) => {
  return (
    <C.Container
      showBackground={item.permanentShown || item.shown}
      onClick={() => onClick()}
    >
      {!item.permanentShown && !item.shown && (
        <C.Icon src={B7WebSVG} alt={"Imagem Padrão"} />
      )}
      {(item.permanentShown || item.shown) && item.item !== null && (
        <C.Icon src={items[item.item].icon} alt={items[item.item].name} />
      )}
    </C.Container>
  );
};
