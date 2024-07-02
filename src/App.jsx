import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "./components/DraggableItem";
import DroppableBox from "./components/DroppableBox";
import { useState } from "react";
export default function App() {
  const [items, setItems] = useState({
    item1: { x: 20, y: 50 },
    item2: { x: 50, y: -200 },
  });

  const updateItemPosition = (id, x, y) => {
    setItems((prevItems) => ({
      ...prevItems,
      [id]: { x, y },
    }));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Drag and Drop Example</h1>
        <div className="relative w-full h-full">
          {Object.keys(items).map((id) => (
            <DraggableItem
              key={id}
              id={id}
              x={items[id].x}
              y={items[id].y}
              updatePosition={updateItemPosition}
            />
          ))}
          <DroppableBox />
        </div>
      </div>
    </DndProvider>
  );
}
