import React, { useRef, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import './DraggableItem.css';

const DraggableItem = ({ id, x, y, img, category }) => {
  const ref = useRef(null);
  const preventScrollRef = useRef(false);
  usePreventScroll(preventScrollRef);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id, x, y, img, category },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: () => {
      preventScrollRef.current = false; // Re-enable scrolling when drag ends
    }
  }), [id, x, y, img, category]);

  drag(ref);

  useEffect(() => {
    if (isDragging) {
      document.body.classList.add('cursor-grabbing');
      preventScrollRef.current = true; // Prevent scrolling when dragging starts
    } else {
      document.body.classList.remove('cursor-grabbing');
    }

    return () => {
      document.body.classList.remove('cursor-grabbing');
      preventScrollRef.current = false; // Ensure scrolling is enabled when component unmounts
    };
  }, [isDragging]);

  return (
    <div
      ref={ref}
      className="w-20 h-20 dragbox text-white flex dragbox items-center justify-center absolute"
      style={{ left: `${x}px`, top: `${y}px`, cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <img src={img} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </div>
  );
};

export default DraggableItem;


function usePreventScroll(preventScrollRef) {
  useEffect(() => {
    const preventScrolling = (e) => {
      if (preventScrollRef.current) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventScrolling, {
      passive: false,
    });

    return () => {
      document.removeEventListener('touchmove', preventScrolling);
    };
  }, [preventScrollRef]);
}