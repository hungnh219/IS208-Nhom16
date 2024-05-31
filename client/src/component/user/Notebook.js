import Sidebar from './Sidebar';
import {useState, useEffect} from "react"
import Modal from 'react-modal';


Modal.setAppElement('#root');
const Notebook=()=>{
    const [modalShowIsOpen, setModalShowIsOpen] = useState(false);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [modalAttendIsOpen, setModalAttendIsOpen] = useState(false);

    const [notebookData, setNotebookData] = useState({})
    const [notebookShowed, setNotebookShowed] = useState([])
    // const [notebookShowed, setNotebookShowed] = useState(notebookData['11B1']['02'])

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/notebook/getAll`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          
          console.log('check', data)
          console.log('check b4 01', data.notebookData['11B4']['01'])
          setNotebookData(data.notebookData);
          setNotebookShowed(data.notebookData['11B4']['01']);
        } catch (error) {
          console.error('Login error:', error);
        }
      };
      fetchData();
    }, []);
    useEffect(() => {
      console.log('Updated notebook data:', notebookData);
    }, [notebookData]);
    useEffect(() => {
      console.log('Updated notebookShowed:', notebookShowed);
    }, [notebookShowed]);
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
    const scheduleData = [
      {
        day: "Thứ 2",
        lesson: 2,
        subject: "Toán",
        // quantity: "42/45",
        teacher: "Nguyễn Văn A",
        comment:"Tốt"
      },
      // {
      //   day: 2,
      //   lesson: 3,
      //   subject: "Toán",
      //   // quantity: "42/45",
      //   teacher: "Nguyễn Văn A",
      //   comment:"Lớp rất ồn, không tập trung"
      // },
      // {
      //   day: "Thứ 2",
      //   lesson: 2,
      //   subject: "Lí",
      //   // quantity: "42/45",
      //   teacher: "Nguyễn Văn B",
      //   comment:"Tốt"
      // },
      // {
      //   day: 3,
      //   lesson: 4,
      //   subject: "Lí",
      //   // quantity: "42/45",
      //   teacher: "Nguyễn Văn B",
      //   comment:"Tốt"
      // },
       
      ];
    const listStudents=[
      {name:"Nguyễn Văn A",attend:true},
      {name:"Nguyễn Văn Af",attend:false},
      {name:"Nguyễn Văn Ad",attend:true},
      {name:"Nguyễn Văn A",attend:true},
      {name:"Nguyễn Văn Ad",attend:false},
      {name:"Nguyễn Văn As",attend:true},
      {name:"Nguyễn Văn Ae",attend:true},
      {name:"Nguyễn Văn A123",attend:false},
      {name:"Nguyễn Văn 321312312",attend:false},
      {name:"Nguyễn Văn A321312",attend:false},
      {name:"Nguyễn Văn Ay",attend:false},
      {name:"Nguyễn Văn Ay",attend:false},
      {name:"Nguyễn Văn Ay",attend:false},
      {name:"Nguyễn Văn Ay",attend:false},
    ]  

    // console.log('note book c2', notebookData["12A1"]["02"])
    // console.log(typeof notebookData["10C2"]["01"])
    const groupDays = groupBy(notebookShowed, item => item.day);
    const [classes,setClasses]=useState(2)
    const [week,setWeek]=useState(1)
    const [semester, setSemester] =useState(1);
    const [year,setYear]=useState("2023-2024")
    const [attend,setAttend]=useState(listStudents)
    const attendStudentCount=attend.filter((student) =>{
      return student.attend;
    }).length;
    const handleChangeSemester = (e) => {
      setSemester(e.target.value);
    };
    const handleChangeYear = (e) => {
        setYear(e.target.value);
      };
      const handleChangeClass = (e) => {
        console.log('check', typeof(e.target.value))
        console.log('check', e.target.value)
        setClasses(e.target.value);
      };
      const handleChangeWeek = (e) => {
        console.log('check', typeof(e.target.value))
        console.log('check', e.target.value)
        setWeek(e.target.value);
      };
    return <div className="flex bg-[#e6e6ee] w-[100%] min-h-[100vh]">
        <Sidebar/>
        <div className="basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
        <div className="flex justify-center">
        <label className="font-bold mr-[8px] ml-[16px]">Lớp</label>
      <select value={classes} onChange={handleChangeClass} className="border-[1px] border-[black]"> 
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
              {/* <th>Sỉ số</th> */}
              <th>Giáo viên</th>
              <th>Đánh giá</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupDays).map((key, index) => {
          return groupDays[key].map((item,id)=>{        
            return  <tr key={index}>
                  {id===0?<td rowspan={groupDays[key].length}>{item.day}</td>:""}
                <td >{item.lesson}</td>
                <td >{item.subject}</td>
                {/* <td >{item.quantity}</td> */}
                <td >{item.teacher}</td>
                <td >{item.comment}</td>
                <td >
                    <button className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
                    onClick={() => setModalShowIsOpen(true)}>Xem</button>
                    <button className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[red] text-[white] shadow-xl "
                    onClick={() => setModalUpdateIsOpen(true)}>Sửa</button>
                </td>
              
              </tr>
          })
 
            })}
          </tbody>
        </table>
            </div>
        </div>
        <Modal
        isOpen={modalShowIsOpen}
        onRequestClose={() => setModalShowIsOpen(false)}
        contentLabel="Example Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            boxShadow:"0px 0px 10px #e2e2e2",
            border:"none",
            width:"500px",
            height:"500px",
            position:"relative"
          },
        }}
      >
        <div className="p-[16px] ">
            <div className="py-[4px]">
              <label className="font-bold">Lớp học: </label>
              <span>10A2</span>
            </div>
            <div className="py-[4px]">
              <label className="font-bold">Môn: </label>
              <span>10A2</span>
            </div>
            <div className="py-[4px]">
              <label className="font-bold">Giáo viên: </label>
              <span>10A2</span>
            </div>
            <div className="py-[4px]">
              <label className="font-bold">Sỉ số: </label>
              <span>10A2</span>
            </div>
            <div className="py-[4px]">
              <label className="font-bold">Nội dung bài học</label>
              <div className="w-[100%] h-[100px] px-[8px] py-[8px] mt-[8px] rounded bg-[#ececec]">Đại số tích phân</div>
            </div>
            <div className="py-[4px]">
              <label className="font-bold">Nhận xét</label>
              <div className="w-[100%] h-[100px] px-[8px] py-[8px] mt-[8px] rounded bg-[#ececec]">Lớp học tốt</div>
    
            </div>
        </div>
    
        <button onClick={() => setModalShowIsOpen(false)}
        className="absolute top-[15px] right-[20px] hover:text-[blue]">Đóng</button>
      </Modal>
      <Modal
        isOpen={modalUpdateIsOpen}
        onRequestClose={() => setModalUpdateIsOpen(false)}
        contentLabel="Example Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            boxShadow:"0px 0px 10px #e2e2e2",
            border:"none",
            width:"500px",
            height:"500px",
            position:"relative"
          },
        }}
      >
        <div className="p-[16px] ">
            <div className="py-[4px]">
              <label className="font-bold">Sỉ số: </label>
              <span>{attendStudentCount}/{listStudents.length}</span>
              <button className="px-[16px] py-[4px] ml-[16px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
              onClick={()=>{setModalAttendIsOpen(true)}}>Điểm danh</button>
            </div>
            <div className="py-[4px]">
              <label className="font-bold">Nội dung bài học</label>
              <textarea className="w-[100%] h-[100px] px-[8px] py-[8px] mt-[8px] rounded bg-[#ececec]">Đại số tích phân</textarea>
            </div>
            <div className="py-[4px]">
              <label className="font-bold">Nhận xét</label>
              <textarea className="w-[100%] h-[100px] px-[8px] py-[8px] mt-[8px] rounded bg-[#ececec]">Lớp học tốt</textarea>
    
            </div>
            <div className="flex justify-end mt-[32px]">
            <button className="px-[16px] py-[4px] ml-[16px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]">Lưu</button>
            </div> 
        </div>
  
        <button onClick={() => setModalUpdateIsOpen(false)}
        className="absolute top-[15px] right-[20px] hover:text-[blue]">Đóng</button>
      </Modal>
      <Modal
        isOpen={modalAttendIsOpen}
        onRequestClose={() => setModalAttendIsOpen(false)}
        contentLabel="Example Modal"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            boxShadow:"0px 0px 10px #e2e2e2",
            border:"none",
            width:"500px",
            height:"500px",
            position:"relative"
          },
        }}
      >
        <div className="p-[16px] ">
          <div className="font-bold">Điểm danh</div>
            <div className="py-[4px]">
              <label className="font-bold">Sỉ số: </label>
              <span>{attendStudentCount}/{listStudents.length}</span>
            </div>
           <div className="overflow-y-scroll overflow-x-hidden h-[350px] mt-[24px]">
            <table className="w-[400px]">
              <thead>
                <tr>
                  <th className="px-[16px]">STT</th>
                  <th className="px-[16px]">Họ và tên</th>
                  <th className="px-[16px]">Vắng</th>
                </tr>
              </thead>
              <tbody>
                {attend.map((student,index)=>{
                  return <tr>
                  <td className="text-center">{index+1}</td>
                  <td className="text-center">{student.name}</td>
                  <td className="text-center">
                    <input className="w-[20px] h-[20px]"type="checkbox" checked={!student.attend} 
                    onClick={()=>{setAttend((prev)=>{
                      return prev.map((item,idx)=>{

                        if(idx===index){
                          item.attend=!item.attend
                        }
                        return item;
                      })
                    });
                    }}/>
                  </td>
                </tr>
                })}

              </tbody>
            </table>
           </div>
           
       
        </div>
  
        <button onClick={() => setModalAttendIsOpen(false)}
        className="absolute top-[15px] right-[20px] hover:text-[blue]">Đóng</button>
      </Modal>
    </div>
}
export default Notebook;