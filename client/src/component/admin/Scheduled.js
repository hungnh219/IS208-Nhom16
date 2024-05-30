import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const teacher = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "nva@gmail.com",
    role: "user",
    status: 1,
  },
  {
    id: 1,
    name: "Nguyễn Văn B",
    email: "nvb@gmail.com",
    role: "user",
    status: 1,
  },
  {
    id: 1,
    name: "Nguyễn Văn C",
    email: "nvc@gmail.com",
    role: "user",
    status: 1,
  },
  // Add more classes as needed
];
const scheduleData = [
  ["7:00-7:45", "10A2", "10A3", "10A4", "", "", ""],
  ["7:50-8:35", "10A2", "10A3", "10A4", "", "", ""],
  ["8:40-9:25", "10A2", "10A3", "10A4", "11A2", "", ""],
  ["9:40-10:25", "10A2", "10A3", "10A4", "", "11A3", ""],
  ["10:30-11:15", "", "10A3", "10A4", "10A2", "", "11A1"],
  // ...
];
const day = ["2", "3", "4", "5", "6", "7"];
const ScheduleEditor = () => {
  const [schedule, setSchedule] = useState(scheduleData);
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [classes, setClasses] = useState("");
  const [change, setChange] = useState(false);
  const [click, setClick] = useState({ row: null, cell: null });
  console.log(click)
  return (
    <div className="flex bg-[#e6e6ee] w-[100%] min-h-[100vh] ">
      <Sidebar />
      <div className=" basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
        <div className="flex justify-center">
          <label className="mr-[8px]">Giáo viên :</label>
          <select className="border-black border-[1px]">
            {teacher.map((item) => {
              return <option>{item.name}</option>;
            })}
          </select>

          <div></div>
        </div>
        <div className="flex justify-center mt-[24px]">
          <table className="table-schedule border-collapse">
            <thead>
              <tr>
                <th>Thời gian</th>
                <th>Thứ Hai</th>
                <th>Thứ Ba</th>
                <th>Thứ Tư</th>
                <th>Thứ Năm</th>
                <th>Thứ Sáu</th>
                <th>Thứ Bảy</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, idx) =>
                    idx > 0 ? (
                      <td
                        onClick={() => {
                          setChange(false)
                          setTime(row[0]);
                          setDate(day[idx - 1]);
                          setClasses(row[idx]);
                          setClick({ row:row[0], cell:day[idx-1] });
                        }}
                        key={idx}
                        style={{border: click.row===row[0] && click.cell===day[idx-1] ? "4px solid black":"3px solid #ddd"}}
                      >
                        {cell}
                      </td>
                    ) : (
                      <td key={idx}>{cell}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-start gap-[16px] mt-[32px] px-[40px]">
          <div className="font-bold">Thứ: {date}</div>
          <div className="font-bold">Thời gian: {time}</div>
          <div className="font-bold">
            Lớp:
            <select
              className="border-[1px] border-black"
              value={classes}
              onChange={(e) => {
                setChange(true);
                setClasses(e.target.value);
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
        </div>
        <div className="flex justify-end px-[32px]">
          <button
            className=" px-[16px] py-[4px] ml-[16px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
            onClick={() => {
              if (change) {
                toast.success("Thay đổi thành công!", {
                  autoClose: 1000,
                });
                setSchedule((prev) => {
                  return prev.map((item) => {
                    if (item[0] === time) {
                      item[day.indexOf(date) + 1] = classes;
                    }
                    return item;
                  });
                });
              } else
                toast.error("Vui lòng thay đổi trước khi cập nhật!", {
                  autoClose: 1000,
                });
            }}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleEditor;
