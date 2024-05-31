// import React, { useState } from 'react';
// import { SpinWheel } from 'spin-wheel-game';

// const getRandomColor = () => {
//   const r = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   return `rgb(${r}, ${g}, ${b})`;
// };

// const MySpinWheel = () => {
//     let data;
//     if(localStorage.getItem("wheel")){
//         data=JSON.parse(localStorage.getItem("wheel"));
//     }
//     else data=[
//         { segmentText: 'Option 1', segColor: getRandomColor() },
//         { segmentText: 'Option 2', segColor: getRandomColor() },
//         { segmentText: 'Option 3', segColor: getRandomColor() },
//       ]
//   const [segments, setSegments] = useState(data);
//   localStorage.setItem("wheel",JSON.stringify(segments))
//   const initText=data.map((seg)=>{
//     return seg.segmentText+"\n";
//   })
//   const [newSegmentsText, setNewSegmentsText] = useState(initText);
//   const handleSpinFinish = (result) => {
//     console.log(`Spun to: ${result}`);
//   };

//   const addSegments = () => {
//     const newSegmentsArray = newSegmentsText.split('\n').filter(text => text.trim() !== '');
//     const newSegments = newSegmentsArray.map(text => ({ segmentText: text, segColor: getRandomColor() }));
//     setSegments(newSegments);
//     window.location.reload()
//   };
  
//   const spinWheelProps = {
//     segments,
//     onFinished: handleSpinFinish,
//     primaryColor: 'black',
//     contrastColor: 'white',
//     buttonText: 'Spin',
//     isOnlyOnce: false,
//     size: 200,
//     upDuration: 100,
//     downDuration: 800,
//     fontFamily: 'Arial',
//     arrowLocation: 'top',
//     showTextOnSpin: true,
//     isSpinSound: true,
//   };

//   return (
//     <div className="flex justify-center items-center gap-[24px]">
//         <SpinWheel {...spinWheelProps} />
//       <div className="input-container">
//         <textarea
//         value={newSegmentsText}
//           onChange={(e) => setNewSegmentsText(e.target.value)}
//           placeholder="Enter segments, one per line"
//         />
//         <button onClick={addSegments}>Chỉnh sửa</button>
//       </div>
//     </div>
//   );
// };

// export default MySpinWheel;
import React, { useState, useEffect } from "react";
import { SpinWheel } from "spin-wheel-game";
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const MySpinWheel = () => {
  const [classes, setClasses] = useState("");
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/student/getAll`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        console.log('check', data)
        setStudentData(data.students);
      } catch (error) {
        console.error('Login error:', error);
      }
    };
    fetchData();
  }, []);

  const groupBy = (array, keyGetter) => {
    return array.reduce((result, item) => {
      // Lấy giá trị của key dựa trên hàm keyGetter
      const key = keyGetter(item);
      // Nếu chưa có nhóm nào cho key này, tạo nhóm mới
      if (!result[key]) {
        result[key] = [];
      }
      // Thêm item vào nhóm tương ứng
      result[key].push(item);
      return result;
    }, {});
  };
  const groupClass = groupBy(studentData, (item) => item.class);

  let data;
  if (localStorage.getItem("wheel")) {
    data = JSON.parse(localStorage.getItem("wheel"));
  } else
    data = [
      { segmentText: "Option 1", segColor: getRandomColor() },
      { segmentText: "Option 2", segColor: getRandomColor() },
      { segmentText: "Option 3", segColor: getRandomColor() },
    ];
  const [segments, setSegments] = useState(data);
  localStorage.setItem("wheel", JSON.stringify(segments));
  const initText = data.map((seg) => {
    return seg.segmentText + "\n";
  }).join("");
  const [newSegmentsText, setNewSegmentsText] = useState(initText);
  const handleSpinFinish = (result) => {
    console.log(`Spun to: ${result}`);
  };

  const addSegments = () => {
    const newSegmentsArray = newSegmentsText
      .split("\n")
      .filter((text) => text.trim() !== "");
    const newSegments = newSegmentsArray.map((text) => ({
      segmentText: text,
      segColor: getRandomColor(),
    }));
    setSegments(newSegments);
    window.location.reload();
  };

  useEffect(() => {
    console.log('Updated notebook data:', classes);
  }, [classes]);

  const spinWheelProps = {
    segments,
    onFinished: handleSpinFinish,
    primaryColor: "black",
    contrastColor: "white",
    buttonText: "Spin",
    isOnlyOnce: false,
    size: 200,
    upDuration: 100,
    downDuration: 800,
    fontFamily: "Arial",
    arrowLocation: "top",
    showTextOnSpin: true,
    isSpinSound: true,
  };

  return (
    <div className="flex justify-center items-center gap-[24px]">
      <SpinWheel {...spinWheelProps} />
      <div className="input-container">
        <div className="mb-[16px]">
          Chọn lớp:
          <select
            className="border-black border-[1px] ml-[8px]"
            onChange={(e) => {
              setClasses(e.target.value);
              const segmentTextClass=groupClass[e.target.value].map((seg) => {
                return seg.lastName +" "+seg.firstName + "\n";
              }).join("");;
              setNewSegmentsText(segmentTextClass)
            }}
            value={classes}
          >
            <option value={""}>None</option>
            <option value={"10C1"}>10C1</option>
            <option value={"10C2"}>10C2</option>
            <option value={"10C3"}>10C3</option>
            <option value={"10C4"}>10C4</option>
            <option value={"11B1"}>11B1</option>
            <option value={"11B2"}>11B2</option>
            <option value={"11B3"}>11B3</option>
            <option value={"11B4"}>11B4</option>
            <option value={"12A1"}>12A1</option>
            <option value={"12A2"}>12A2</option>
            <option value={"12A3"}>12A3</option>
            <option value={"12A4"}>12A4</option>
          </select>
        </div>
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
