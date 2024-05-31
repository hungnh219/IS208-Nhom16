import React, { useState } from "react";
import dataStudent from "../../data/student.json";
const GroupSplitter = () => {
  const [classes, setClasses] = useState("");
  const [input, setInput] = useState("");
  const [groupCount, setGroupCount] = useState(2);
  const [groups, setGroups] = useState([]);
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
  const splitIntoRandomGroups = () => {
    const members = input.split("\n").filter((name) => name.trim() !== "");
    const shuffledMembers = shuffleArray(members);

    const numMembersPerGroup = Math.floor(members.length / groupCount);
    const remainder = members.length % groupCount;

    let result = [];
    let startIndex = 0;
    for (let i = 0; i < groupCount; i++) {
      let numMembers = numMembersPerGroup;
      if (i < remainder) {
        numMembers++;
      }
      result.push(shuffledMembers.slice(startIndex, startIndex + numMembers));
      startIndex += numMembers;
    }

    setGroups(result);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const groupClass = groupBy(dataStudent, (item) => item.class);
  return (
    <div className="flex flex-col justify-center items-center gap-[24px]">
      <div className="flex justify-center items-center gap-[24px] ">
        <div>
          <h1>Danh sách học sinh</h1>
          <textarea
            rows="10"
            cols="30"
            placeholder="Nhập vào tên học sinh từng dòng một."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className=" bg-[#eae9e9] shadow-xl p-[16px]"
          />
        </div>
        <div className="flex flex-col">
        <div>
          <label >Chọn lớp:</label>
          <select className="border-black border-[1px] ml-[8px]"
             onChange={(e) => {
              setClasses(e.target.value);
              const classList=groupClass[e.target.value].map((seg) => {
                return seg.firstName +" "+seg.lastName + "\n";
              }).join("");;
              setInput(classList)
            }}
            value={classes}>
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
          <div className="py-[16px]">
            <label>
              Số lượng nhóm:
              <input
                type="number"
                value={groupCount}
                min="2"
                onChange={(e) => setGroupCount(e.target.value)}
                className=" ml-[8px] border-[1px] border-[black] w-[50px] text-center"
              />
            </label>
          </div>
          <button
            onClick={splitIntoRandomGroups}
            className="shadow-xl px-[16px] py-[8px] text-[white] bg-[#266eff]"
          >
            Chia nhóm
          </button>
        </div>
      </div>
      {groups.length > 0 && (
        <div className="flex justify-center items-center gap-[24px] ">
          {groups.map((group, index) => (
            <div key={index} className="p-[16px] bg-[#ededed] shadow-xl">
              <h3 className="font-bold">Group {index + 1}</h3>
              <ul>
                {group.map((member, idx) => (
                  <li key={idx}>{member}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupSplitter;
