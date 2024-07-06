import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';

const DraggableItem = ({ id, x, y, img, category }) => {
  const ref = useRef(null);

  const [, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id, x, y,img ,category},
  }), [id, x, y,img,category]);

  drag(ref);

  return (
    <div
      ref={ref}
      className="w-20 h-20  text-white flex   items-center justify-center cursor-move absolute z-10"      
      style={{ left: `${x}px`, top: `${y}px` }}
    >
      <img src={img}  style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
};

export default DraggableItem;