import React, { useEffect, useRef, useState } from "react";
import nutrionistImage from "../images/nutritionist.png";
const PlayerModal = ({ isOpen, onClose, onSubmit }) => {
  const modalRef = useRef();
  const [name, setName] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  let inputName = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col rounded-lg">
        <div className="flex ">
          <img
            src={nutrionistImage}
            alt="Nutritionist"
            // object fill
            className="bg-white object-contain grow"
            style={{  height: "180px" }}
          />
          <div className="flex flex-col justify-center items-center bg-white px-8">
            <h1 className="text-2xl font-bold p-4 text-black bg-white ">
              Welcome to
            </h1>
            <h1 className="text-2xl font-bold p-4 text-black bg-white ">
              Food Pyramid Game
            </h1>
          </div>
        </div>
        <div
          className="bg-white p-4 rounded"
          ref={modalRef}
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Enter your name:</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="border-2 border-gray-300"
            />
            <button type="submit" className="bg-blue-500 text-white p-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;
