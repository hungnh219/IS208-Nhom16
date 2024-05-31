import {useState, useEffect} from "react"
import Sidebar from './Sidebar';

const Schedule=()=>{
  const [schedule, setSchedule] = useState([
                                            ["1", "", "", "", "", "", ""],
                                            ["2", "", "", "", "", "", ""],
                                            ["3", "", "", "", "", "", ""],
                                            ["4", "", "", "", "", "", ""],
                                            ["5", "", "", "", "", "", ""],
                                            ["6", "", "", "", "", "", ""],
                                            ["7", "", "", "", "", "", ""],
                                            ["8", "", "", "", "", "", ""],
                                            ["9", "", "", "", "", "", ""],
                                            ["10", "", "", "", "", "", ""],
                                        ]);
  const dayMapping = {
    "Thứ 2": 1,
    "Thứ 3": 2,
    "Thứ 4": 3,
    "Thứ 5": 4,
    "Thứ 6": 5,
    "Thứ 7": 6,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherId = localStorage.getItem('teacherId')

        const response = await fetch(`http://localhost:3000/api/lesson/getByTeacherId?teacherId=${teacherId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const teacherSchedule = data.message;

        const newSchedule = [...schedule];

        teacherSchedule.forEach(({ class: className, lessonDay, orderNumber }) => {
            const dayIndex = dayMapping[lessonDay];
            const orderIndex = parseInt(orderNumber) - 1;

            if (dayIndex !== undefined && orderIndex >= 0 && orderIndex < newSchedule.length) {
                newSchedule[orderIndex][dayIndex] = className;
            }
        });
        
        console.log('check', newSchedule)
        setSchedule(newSchedule);
      } catch (error) {
        console.error('Login error:', error);
      }
    };
    fetchData();
  }, []);

  const [semester, setSemester] =useState(1);
  const [year,setYear]=useState("2023-2024")
  const handleChangeSemester = (e) => {
    setSemester(e.target.value);
  };
  const handleChangeYear = (e) => {
      setYear(e.target.value);
    };
  return <div className="flex bg-[#e6e6ee] w-[100%] min-h-[100vh]">
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
            <th>Tiết/Thứ</th>
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