import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableItem from "./components/DraggableItem";
import DroppableBox from "./components/DroppableBox";
import Pyramid from "./components/Pyramid/Pyramid";
import { useState } from "react";
import foodList from "./components/constant";
// categories eat_most eat_more eat_moderate eat_less

export default function App() {
  const [points, setPoints] = useState(0);
  // get the screen width and height
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const foodCategory = ["eat_most", "eat_more", "eat_moderate", "eat_less"];

  const [items, setItems] = useState(
    foodList.map((image, index) => ({
      id: `item${index + 1}`, // Assuming you want to keep a unique id
      x: Math.random() * (screenWidth / 2),
      y: Math.random() * screenHeight * 0.8,
      img: image.src, // Assuming each image object has a src property
      category: image.category,
    }))
  );

  const updateItemPosition = (id, x, y) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, x, y } : item))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className=" h-screen w-screen flex flex-col ">
        <h1 className="text-2xl font-bold mb-4">Drag and Drop Example</h1>
        <p>Points: {points}</p>
        <div className="relative  w-full bg-gray-100 flex-row-reverse flex flex-grow">
          {Object.keys(items).map((id) => (
            <DraggableItem
              key={id}
              id={items[id].id}
              x={items[id].x}
              y={items[id].y}
              img={items[id].img}
              category={items[id].category}
            />
          ))}
          <div className="flex flex-col">
            {foodCategory.map((category) => (
                <DroppableBox
                  key={category}
                  updateItemPosition={updateItemPosition}
                  boxName={category}
                  setPoints={setPoints}
                />
              ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
