import React from "react";
// import  pyramid css in same directory
import "./Pyramid.css";

const Pyramid = () => {
  return (
    <div className="pyramid ">
      <div className="one flex  justify-center items-center">
        <p className="text-center text-black text-lg font-bold ms-[-20px] mt-[50px]">
          eat least
        </p>
      </div>
      <div className="two flex justify-center items-center">
        <p className="text-center text-white text-lg font-bold ms-[-20px]">
          eat moderately
        </p>
      </div>
      <div className="three flex justify-center items-center">
        <p className="text-center text-white text-lg font-bold ms-[-20px]">
          eat most
        </p>
      </div>
      <div className="four flex justify-center items-center">
        <p className="text-center text-white text-lg font-bold ms-[-20px]">
          eat more
        </p>
      </div>
    </div>
  );
}

export default Pyramid;
