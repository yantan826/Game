import React from "react";
// import  pyramid css in same directory
import "./Pyramid.css";
import PyramidBox from "./PyramidBox";
import { useState } from "react";
const pyramidLayer = [
  {
    title: "eat least",
    className: "one",
  },
  {
    title: "eat moderately",
    className: "two",
  },
  {
    title: "eat more",
    className: "three",
  },
  {
    title: "eat most",
    className: "four",
  },
];

const Pyramid = ({ updateItemPosition, setPoints }) => {
  const [zBool, setZBool] = useState(false);

  return (
    <div className=" flex pyramid-container relative">
      <div className={`pyramid 
        ${zBool ? "z-20" :"z-auto" }`}>
        {pyramidLayer.map((layer) => (
          <PyramidBox
            key={layer.title}
            className={layer.className}
            boxName={layer.title}
            updateItemPosition={updateItemPosition}
            setPoints={setPoints}
            setZBool={setZBool}
          />
        ))}
      </div>
      <div className="absolute flex h-full right-0">
        <div className="flex flex-col justify-between p-8">
          {pyramidLayer.map((layer) => (
            <p
              className="text-center text-slate-800 text-lg lg:text-xl font-bold p-4 m-2 hover:text-gray-700 transition-colors duration-300"
              key={layer.title}
            >
              {capitalizeFirstLetterOfAllWords(layer.title)}
           
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
function capitalizeFirstLetterOfAllWords(string) {
  return string.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
export default Pyramid;
