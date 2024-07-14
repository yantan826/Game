import React, { useRef, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { addItemList } from "../../slices/scoreSlice";
import store from "../../store";

const PyramidBox = ({
  updateItemPosition,
  boxName,
  setPoints,
  className,
  setZBool,
  onGameOver,
}) => {
  const dispatch = useDispatch();

  const dropRightSoundRef = useRef(null);
  const dropWrongSoundRef = useRef(null);
  const [soundsEnabled, setSoundsEnabled] = useState(false);

  const initializeSounds = () => {
    dropRightSoundRef.current = new Audio("/sounds/unlock.wav");
    dropWrongSoundRef.current = new Audio("/sounds/fail2.wav");

    // Load the sounds
    const loadSound = (soundRef) => {
      soundRef.current.play().then(() => {
        soundRef.current.pause();
        soundRef.current.currentTime = 0;
      }).catch((error) => {
        console.error("Sound load failed:", error);
      });
    };

    loadSound(dropRightSoundRef);
    loadSound(dropWrongSoundRef);
    setSoundsEnabled(true);
  };

  const handleUserInteraction = () => {
    initializeSounds();
    document.removeEventListener("click", handleUserInteraction);
  };

  useEffect(() => {
    document.addEventListener("click", handleUserInteraction);
    return () => {
      document.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  const playDropRightSound = () => {
    if (soundsEnabled) {
      dropRightSoundRef.current.play().catch((error) => {
        console.error("Play drop right sound failed:", error);
      });
    }
  };

  const playDropWrongSound = () => {
    if (soundsEnabled) {
      dropWrongSoundRef.current.play().catch((error) => {
        console.error("Play drop wrong sound failed:", error);
      });
    }
  };

  const ref = useRef(null);
  const [pointsDisplay, setPointsDisplay] = useState({ message: '', visible: false });
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const newX = item.x + delta.x;
      const newY = item.y + delta.y;
      updateItemPosition(item.id, newX, newY);
      const latestItemList = store.getState().score.itemList;

      if (!latestItemList.includes(item.id)) {
        if (boxName === item.category) {
          setPoints((prevPoints) => prevPoints + 3000);
          setPointsDisplay({ message: '+3000', visible: true });
          playDropRightSound();
        } else {
          setPoints((prevPoints) => prevPoints - 3000);
          setPointsDisplay({ message: '-3000', visible: true });
          playDropWrongSound();
        }
        dispatch(addItemList(item.id));
      }
      if (latestItemList.length + 1 === 5) {
        onGameOver();
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    if (canDrop) {
      setZBool(true);
    } else {
      setZBool(false);
    }
  }, [canDrop]);

  useEffect(() => {
    if (pointsDisplay.visible) {
      const timer = setTimeout(() => {
        setPointsDisplay(prev => ({ ...prev, visible: false }));
      }, 1000); // Hide after 1 second

      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [pointsDisplay.visible]);

  drop(ref);

  return (
    <div className="relative">
      {!soundsEnabled && (
        <button 
          onClick={initializeSounds} 
          className="absolute top-0 left-0 z-50 p-2 bg-blue-500 text-white"
        >
          Enable Sounds
        </button>
      )}
      <div ref={ref} className={`flex ${className} justify-center items-center relative ${canDrop ? "z-50" : "z-auto"} ${isOver ? "opacity-30" : "opacity-100"}`}>
        {pointsDisplay.visible && (
          <div style={{ 
            color: pointsDisplay.message.startsWith('-') ? 'red' : 'green', 
            position: 'absolute', 
            transition: 'opacity 1s',
            fontSize: '1.5rem',
            zIndex: 100,
            bottom: '0px',
          }}>
            {pointsDisplay.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default PyramidBox;