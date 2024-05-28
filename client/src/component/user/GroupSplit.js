import React, { useState } from "react";

const GroupSplitter = () => {
  const [input, setInput] = useState("");
  const [groupCount, setGroupCount] = useState("");
  const [groups, setGroups] = useState([]);

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
        <div>
          <label>
            Số lượng nhóm:
            <input
              type="number"
              value={groupCount}
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
