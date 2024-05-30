import React, { useState } from "react";
import { SpinWheel } from "spin-wheel-game";
import dataStudent from "../../data/student.json";
const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const MySpinWheel = () => {
  const [classes, setClasses] = useState("");
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
  const groupClass = groupBy(dataStudent, (item) => item.class);

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
                return seg.firstName +" "+seg.lastName + "\n";
              }).join("");;
              setNewSegmentsText(segmentTextClass)
            }}
          >
            <option value={""}>None</option>
            <option value={"10A1"}>10A1</option>
            <option value={"10A2"}>10A2</option>
            <option value={"10A3"}>10A3</option>
            <option value={"10A4"}>10A4</option>
            <option value={"11A1"}>11A1</option>
            <option value={"11A2"}>11A2</option>
            <option value={"11A3"}>11A3</option>
            <option value={"11A4"}>11A4</option>
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
