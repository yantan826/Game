import { useSelector } from "react-redux";
import { selectHighestScorePersonDetails } from "../slices/scoreSlice";
import { useEffect, useState,useRef } from "react";


const TableScore = ({ isOpen, onClose}) => {
    const highestScorePersonDetails = useSelector(selectHighestScorePersonDetails);
    const modalRef = useRef(null);

 
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
    


    return (
        // modal for player to quick glance at score and high score
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
            <div 
            ref={modalRef}
            className="flex flex-col items-center justify-center bg-white">
          
                <h1 className="text-2xl font-bold p-4 text-black bg-white ">
                    Highest Score: {highestScorePersonDetails.score}
                </h1>
                <h1 className="text-2xl font-bold p-4 text-black bg-white ">
                    Highest Score Person: {highestScorePersonDetails.name}
                </h1>
                <h1 className="text-2xl font-bold p-4 text-black bg-white ">
                    Details: {highestScorePersonDetails.details}
                </h1>
            </div>
        </div>
    );
}


export default TableScore;