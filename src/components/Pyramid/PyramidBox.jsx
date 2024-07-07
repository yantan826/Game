import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { useEffect } from "react";
const PyramidBox = ({ updateItemPosition, boxName, setPoints, className,setZBool }) => {
  const ref = useRef(null);
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newX = item.x + delta.x;
      const newY = item.y + delta.y;
      updateItemPosition(item.id, newX, newY);
      if (boxName === item.category) {
        setPoints((prevPoints) => prevPoints + 1);
      } else {
        setPoints((prevPoints) => prevPoints - 1);
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
      ${canDrop ? "z-20" : "z-auto"} 
      ${isOver ? "opacity-30" : "opacity-100"}
      `}
    >
     
    </div>
  );
};

export default PyramidBox;