import {useState} from "react"
import Sidebar from './Sidebar';

const Schedule=()=>{
    const scheduleData = [
        ["7:00-7:45", "10A2", "10A3", "10A4", "", "", ""],
        ["7:50-8:35", "10A2", "10A3", "10A4", "", "", ""],
        ["8:40-9:25", "10A2", "10A3", "10A4", "11A5", "", ""],
        ["9:40-10:25", "10A2", "10A3", "10A4", "", "11A6", ""],
        ["10:30-11:15", "", "10A3", "10A4", "10A2", "", "11A7"],
        // ...
      ];
    const [semester, setSemester] =useState(1);
    const [year,setYear]=useState("2023-2024")
    const handleChangeSemester = (e) => {
      setSemester(e.target.value);
    };
    const handleChangeYear = (e) => {
        setYear(e.target.value);
      };
    return <div className="flex bg-[#e6e6ee] w-[100%] h-[100vh]">
        <Sidebar/>
        <div className="basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
        <div className="flex justify-center">
      <label className="font-bold mr-[8px]">Học kì</label>
      <select value={semester} onChange={handleChangeSemester} className="border-[1px] border-[black]"> 
          <option value={1}>1</option>
          <option value={2}>2</option>
      </select>
      <label className="font-bold mr-[8px] ml-[16px]">Năm học</label>
      <select value={year} onChange={handleChangeYear} className="border-[1px] border-[black]"> 
          <option value={"2022-2023"}>2022-2023</option>
          <option value={"2023-2024"}>2023-2024</option>
      </select>
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
            {scheduleData.map((row, index) => (
                <tr key={index}>
                {row.map((cell, idx) => (
                    <td key={idx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
            </div>
        </div>
    </div>
}
export default Schedule;