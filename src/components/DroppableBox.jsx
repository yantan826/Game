import React from 'react';
import { useDrop } from 'react-dnd';

const DroppableBox = () => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: () => ({ name: 'DroppableBox' }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`w-96 h-96 border-4 border-dashed ${isOver ? 'bg-red-300' : 'bg-red-500'} flex items-center justify-center absolute bottom-0 right-0`}
    >
      Drop Here
    </div>
  );
};

export default DroppableBox;
