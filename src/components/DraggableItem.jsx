import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ id, x, y, updatePosition }) => {
  const ref = useRef(null);

  const [, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id, x, y },
  }), [id, x, y]);

  drag(ref);

  return (
    <div
      ref={ref}
      className="w-20 h-20 bg-blue-500 text-white flex items-center justify-center cursor-move absolute z-10"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {id}
    </div>
  );
};

export default DraggableItem;
