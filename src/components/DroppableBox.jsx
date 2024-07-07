import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

const DroppableBox = ({ updateItemPosition, boxName, setPoints }) => {
  const ref = useRef(null);
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'ITEM',
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

  drop(ref);

  return (
    <div
      ref={ref}
      className={`w-96 flex-1 hover:z-20 border-4 border-dashed ${isOver ? 'bg-red-300' : 'bg-red-500'} ${canDrop  ? 'z-10':'z-auto'} flex items-center justify-center`}
    >
      {canDrop ? 'Release to drop' : `Drag an item here in ${boxName}`}
    </div>
  );
};

export default DroppableBox;
