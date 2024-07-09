import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { Preview } from "react-dnd-preview";
import DraggableItem from "./components/DraggableItem/DraggableItem";
import DroppableBox from "./components/DroppableBox";
import { useState } from "react";
import foodList from "./components/constant";
import Pyramid from "./components/Pyramid/Pyramid";
import HighScoreCounter from "./components/HighScoreCounter";
import PlayerModal from "./components/PlayerModal";

import "./App.css";
export default function App() {
  const [points, setPoints] = useState(0);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const [modalOpen, setModalOpen] = useState(false);
  const handleNewPlayer = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };
  const handleSubmit = (name) => {
    console.log(name);
    setModalOpen(false);
  };

  const [items, setItems] = useState(
    foodList.map((image, index) => ({
      id: `item${index + 1}`,
      x: Math.random() * (screenWidth / 2),
      y: Math.random() * screenHeight * 0.6,
      img: image.src,
      category: image.category,
    }))
  );

  const updateItemPosition = (id, x, y) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, x, y } : item))
    );
  };

  const generatePreview = ({ itemType, item, style }) => {
    return (
      <div style={{ ...style, height: "80px", width: "80px" }}>
        <img
          src={item.img}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend} options={{ enableMouseEvents: true }}>
      <div className="h-screen w-screen flex bg-black flex-col">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold p-4 title">Food Pyramid Game</h1>
          {/* new player */}
          <div className="flex justify-end me-3  ">
            <button className="new-player-btn" onClick={handleNewPlayer}>
              <span className="arrow mt-[-8px] me-3">→</span> New Player
            </button>
            <PlayerModal
              isOpen={modalOpen}
              onClose={handleClose}
              onSubmit={handleSubmit}
            />
          </div>
        </div>
        <div className="flex rounded-b-lg bg-black justify-end px-4">
          <div className="flex">
            <p className="bg-black p-2 px-6 title"> Score : </p>
            <HighScoreCounter />
          </div>
        </div>
        <div className="relative w-full bg-gray-100 flex-row-reverse flex flex-grow">
          {items.map((item) => (
            <DraggableItem
              key={item.id}
              id={item.id}
              x={item.x}
              y={item.y}
              img={item.img}
              category={item.category}
            />
          ))}
          <div className="h-full p-8 flex w-1/2 flex-col">
            <h1 className="text-2xl font-bold mb-4 mt-[-30px] text-center w-full">
              Food Pyramid
            </h1>
            <div className="flex-grow h-full w-full flex">
              <Pyramid
                updateItemPosition={updateItemPosition}
                setPoints={setPoints}
              />
            </div>
          </div>
          {/* <div className="flex flex-col">
            {foodCategory.map((category) => (
              <DroppableBox
                key={category}
                updateItemPosition={updateItemPosition}
                boxName={category}
                setPoints={setPoints}
              />
            ))}
          </div> */}
          <Preview generator={generatePreview} />
        </div>
      </div>
    </DndProvider>
  );
}
