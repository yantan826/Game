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
    <div className=" flex pyramid-container relative ">
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

    </div>
  );
};
function capitalizeFirstLetterOfAllWords(string) {
  return string.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
}
export default Pyramid;
