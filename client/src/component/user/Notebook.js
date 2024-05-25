import Sidebar from './Sidebar';
import {useState} from "react";
import Modal from 'react-modal';


Modal.setAppElement('#root');
const Notebook=()=>{
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const scheduleData = [
        [2, 3, "Toán", "42/45", "Nguyễn Văn A"],
        [2, 4, "Lí", "43/45", "Nguyễn Văn B"],
        // ...
      ];
    const [day,setDay]=useState(2)
    const [week,setWeek]=useState(1)
    const [semester, setSemester] =useState(1);
    const [year,setYear]=useState("2023-2024")
    const handleChangeSemester = (e) => {
      setSemester(e.target.value);
    };
    const handleChangeYear = (e) => {
        setYear(e.target.value);
      };
      const handleChangeDay = (e) => {
        setDay(e.target.value);
      };
      const handleChangeWeek = (e) => {
        setWeek(e.target.value);
      };
    return <div className="flex bg-[#e6e6ee] w-[100%] h-[100vh]">
        <Sidebar/>
        <div className="basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
        <div className="flex justify-center">
        <label className="font-bold mr-[8px] ml-[16px]">Thứ</label>
      <select value={day} onChange={handleChangeDay} className="border-[1px] border-[black]"> 
          <option value={2}> 2</option>
          <option value={3}> 3</option>
          <option value={4}> 4</option>
          <option value={5}> 5</option>
          <option value={6}> 6</option>
          <option value={7}> 7</option>
      </select>
      <label className="font-bold mr-[8px] ml-[16px]">Tuần</label>
      <select value={week} onChange={handleChangeWeek} className="border-[1px] border-[black]"> 
          {
            Array.from({ length: 36 }, (_, index) => (
                <option value={index+1}>{index+1}</option>
              ))
          }
          
      </select>
      <label className="font-bold mr-[8px] ml-[16px]">Học kì</label>
      <select value={semester} onChange={handleChangeSemester} className="border-[1px] border-[black]"> 
          <option value={"1"}>1</option>
          <option value={"2"}>2</option>
      </select>
      <label className="font-bold mr-[8px] ml-[16px]">Năm học</label>
      <select value={year} onChange={handleChangeYear} className="border-[1px] border-[black]"> 
          <option value={"2022-2023"}>2022-2023</option>
          <option value={"2023-2024"}>2023-2024</option>
      </select>
    </div>
          
    
  
    <div className="flex justify-center mt-[24px]">

    <table className="table-notebook border-collapse">
          <thead>
            <tr>
              <th>Thứ</th>
              <th>Tiết </th>
              <th>Môn học</th>
              <th>Sỉ số</th>
              <th>Giáo viên</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((row, index) => (
                <tr key={index}>
                <td >{row[0]}</td>
                <td >{row[1]}</td>
                <td >{row[2]}</td>
                <td >{row[3]}</td>
                <td >{row[4]}</td>
                <td >
                    <button className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
                    onClick={() => setModalIsOpen(true)}>Xem</button>
                    <button className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[red] text-[white] shadow-xl "
                    onClick={() => setModalIsOpen(true)}>Sửa</button>
                </td>
              
              </tr>
            ))}
          </tbody>
        </table>
            </div>
        </div>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <h2>Hello</h2>
        <button onClick={() => setModalIsOpen(false)}>Close Modal</button>
      </Modal>
    </div>
}
export default Notebook;