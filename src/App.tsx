import { useEffect, useState } from "react";
import * as C from "./App.styles";

import logoImage from "./assets/logo-200.png";
import Restart from "./svgs/restart.svg";

import { Button } from "./components/Button/Button.component";
import { InfoItem } from "./components/InfoItem/InfoItem.component";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import { GridCell } from "./components/GridCell/GridCell.component";
import { formatTimeElapsed } from "./utils/formatTime";

const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [showCount, setShowCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [playing, timeElapsed]);

  useEffect(() => {
    if (showCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true);

      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          let tmpGrid = [...gridItems];

          for (let i in tmpGrid) {
            if (tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;

              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid);
          setShowCount(0);
        } else {
          setTimeout(() => {
            let tmpGrid = [...gridItems];

            for (let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }

            setGridItems(tmpGrid);
            setShowCount(0);
          }, 500);
        }

        setMoveCount((moveCount) => (moveCount += 1));
      }
    }
  }, [showCount, gridItems]);

  useEffect(() => {
    if (
      moveCount > 0 &&
      gridItems.every((item) => item.permanentShown === true)
    ) {
      setPlaying(false);
    }
  }, [gridItems, moveCount]);

  const resetAndCreateGrid = () => {
    setTimeElapsed(0);
    setMoveCount(0);
    setShowCount(0);

    let tempGrid: GridItemType[] = [];
    for (let i = 0; i < items.length * 2; i++) {
      tempGrid.push({
        item: null,
        shown: false,
        permanentShown: false,
      });
    }

    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tempGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tempGrid[pos].item = i;
      }
    }

    setGridItems(tempGrid);
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {
    if (playing && index !== null && showCount < 2) {
      let tmpGrid = [...gridItems];

      if (
        tmpGrid[index].permanentShown === false &&
        tmpGrid[index].shown === false
      ) {
        tmpGrid[index].shown = true;
        setShowCount(showCount + 1);
      }
      setGridItems(tmpGrid);
    }
  };

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink href="#">
          <img src={logoImage} width="200" alt="logo" />
        </C.LogoLink>

        <C.InfoArea>
          <InfoItem value={formatTimeElapsed(timeElapsed)}>Tempo</InfoItem>
          <InfoItem value={`${moveCount.toString()}`}>Contador</InfoItem>
        </C.InfoArea>

        <Button onClick={resetAndCreateGrid} icon={Restart}>
          Reiniciar
        </Button>
      </C.Info>

      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridCell
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
