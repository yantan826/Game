import React, { useRef,useEffect,useState } from "react";
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
  const playDropRightSound = () => {
    const sound = new Audio("/public/sounds/unlock.wav");
    sound.play();
  };

  const playDropWrongSound = () => {
    const sound = new Audio("/public/sounds/fail2.wav");
    sound.play();
  };

  const ref = useRef(null);
  const [pointsDisplay, setPointsDisplay] =  useState({ message: '', visible: false });
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newX = item.x + delta.x;
      const newY = item.y + delta.y;
      updateItemPosition(item.id, newX, newY);
      const latestItemList = store.getState().score.itemList;

      if (!latestItemList.includes(item.id)) {
        if (boxName === item.category) {
          setPoints((prevPoints) => prevPoints + 1000);
          setPointsDisplay({ message: '+1000', visible: true });
          playDropRightSound();
        } else {
          setPoints((prevPoints) => prevPoints - 1000);
          setPointsDisplay({ message: '-1000', visible: true });
          playDropWrongSound();
        }
        dispatch(addItemList(item.id));
      }
      console.log(latestItemList.length + 1, "length")
      if (latestItemList.length + 1 === 10) {
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

  useEffect(() => {
    if (pointsDisplay.visible) {
      const timer = setTimeout(() => {
        setPointsDisplay(prev => ({ ...prev, visible: false }));
      }, 1000); // Hide after 1 second

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [pointsDisplay.visible]); //

  drop(ref);

  return (
    <div ref={ref} className={`flex ${className} justify-center items-center relative ${canDrop ? "z-50" : "z-auto"} ${isOver ? "opacity-30" : "opacity-100"}`}>
    {pointsDisplay.visible && (
      <div style={{ 
        color: pointsDisplay.message.startsWith('-') ? 'red' : 'green', 
        position: 'absolute', 
        transition: 'opacity 1s' ,
        fontSize: '1.5rem',
        zIndex: 100,
        bottom: '0px',

      }}>
        {pointsDisplay.message}
      </div>
    )}
  </div>
  );
};

export default PyramidBox;
