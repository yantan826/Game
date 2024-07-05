import React, { useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';

const DroppableBox = ({ updateItemPosition }) => {
  const ref = useRef(null);
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newX = item.x + delta.x 
      const newY = item.y + delta.y 
      updateItemPosition(item.id, newX, newY);
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
      className={`w-96 h-96 border-4 border-dashed ${isOver ? 'bg-red-300' : 'bg-red-500'} flex items-center justify-center `}
    >
      {canDrop ? 'Release to drop' : 'Drag an item here'}
    </div>
  );
};

export default DroppableBox;
