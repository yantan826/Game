import React, { useRef,useEffect } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { addItemList } from "../../slices/scoreSlice";
import store from "../../store";
const PyramidBox = ({
  updateItemPosition,
  boxName,
  setPoints,
  className,
  setZBool,
  onGameOver,
}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newX = item.x + delta.x;
      const newY = item.y + delta.y;
      updateItemPosition(item.id, newX, newY);
      const latestItemList = store.getState().score.itemList;
      console.log("itemList2", latestItemList);

      if (!latestItemList.includes(item.id)) {
        if (boxName === item.category) {
          setPoints((prevPoints) => prevPoints + 1000);
        } else {
          setPoints((prevPoints) => prevPoints - 1000);
        }
        dispatch(addItemList(item.id));
      }
      console.log(latestItemList.length + 1, "length")
      if (latestItemList.length + 1 === 2) {
        onGameOver();
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    if (canDrop) {
      setZBool(true);
    } else {
      setZBool(false);
    }
  }, [canDrop]);

  drop(ref);

  return (
    <div
      ref={ref}
      className={`flex ${className} justify-center items-center
      ${canDrop ? "z-50" : "z-auto"} 
      ${isOver ? "opacity-30" : "opacity-100"}
      `}
    ></div>
  );
};

export default PyramidBox;
