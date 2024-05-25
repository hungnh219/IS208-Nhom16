import React, { useState } from 'react';
import { SpinWheel, ISpinWheelProps } from 'spin-wheel-game';

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const MySpinWheel = () => {
    let data;
    if(localStorage.getItem("wheel")){
        data=JSON.parse(localStorage.getItem("wheel"));
    }
    else data=[
        { segmentText: 'Option 1', segColor: getRandomColor() },
        { segmentText: 'Option 2', segColor: getRandomColor() },
        { segmentText: 'Option 3', segColor: getRandomColor() },
      ]
  const [segments, setSegments] = useState(data);
  localStorage.setItem("wheel",JSON.stringify(segments))
  const initText=data.map((seg)=>{
    return seg.segmentText+"\n";
  })
  const [newSegmentsText, setNewSegmentsText] = useState(initText);
  const handleSpinFinish = (result) => {
    console.log(`Spun to: ${result}`);
  };

  const addSegments = () => {
    const newSegmentsArray = newSegmentsText.split('\n').filter(text => text.trim() !== '');
    const newSegments = newSegmentsArray.map(text => ({ segmentText: text, segColor: getRandomColor() }));
    setSegments(newSegments);
    window.location.reload()
  };
  
  const spinWheelProps = {
    segments,
    onFinished: handleSpinFinish,
    primaryColor: 'black',
    contrastColor: 'white',
    buttonText: 'Spin',
    isOnlyOnce: false,
    size: 200,
    upDuration: 100,
    downDuration: 800,
    fontFamily: 'Arial',
    arrowLocation: 'top',
    showTextOnSpin: true,
    isSpinSound: true,
  };

  return (
    <div className="flex justify-center items-center gap-[24px]">
        <SpinWheel {...spinWheelProps} />
      <div className="input-container">
        <textarea
        value={newSegmentsText}
          onChange={(e) => setNewSegmentsText(e.target.value)}
          placeholder="Enter segments, one per line"
        />
        <button onClick={addSegments}>Chỉnh sửa</button>
      </div>
    </div>
  );
};

export default MySpinWheel;
