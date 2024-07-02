import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ id, x, y, updatePosition }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: 'ITEM',
    item: { id, x, y },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const dropResult = monitor.getDropResult();
        if (dropResult) {
            const delta = monitor.getDifferenceFromInitialOffset();
            if (delta) { // Check if delta is not null
              const left = Math.round(item.x + delta.x);
              const top = Math.round(item.y + delta.y);
              updatePosition(item.id, left, top);
            }
        }
      }
    },
  }), [id, x, y, updatePosition]);

  drag(ref);

  return (
    <div
      ref={ref}
      className="w-20 h-20 bg-blue-500 text-white flex items-center justify-center cursor-move absolute"
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      {id}
    </div>
  );
};

export default DraggableItem;
