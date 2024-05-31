import Sidebar from './Sidebar';
import {useState} from "react";
import Modal from 'react-modal';


Modal.setAppElement('#root');
const Notebook=()=>{
    const [modalShowIsOpen, setModalShowIsOpen] = useState(false);
    const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
    const [modalAttendIsOpen, setModalAttendIsOpen] = useState(false);
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
        day: 2,
        lesson: 2,
        subject: "Toán",
        classNumber: "42/45",
        teacher: "Nguyễn Văn A",
        evaluate:"Tốt",
        content:"Đại số",
        comment:"Năng nổ"
      },
      {
        day: 2,
        lesson: 3,
        subject: "Toán",
        classNumber: "42/45",
        teacher: "Nguyễn Văn A",
        evaluate:"Khá",
        content:"Thống kê",
        comment:"Học tốt"
      },
      {
        day: 3,
        lesson: 2,
        subject: "Lí",
        classNumber: "42/45",
        teacher: "Nguyễn Văn B",
        evaluate:"Tốt",
        content:"Vợ chồng a phủ",
        comment:"Tốt"
      },
   
       
      ];
    const listStudents=[
      {name:"Nguyễn Văn A",attend:true},
      {name:"Nguyễn Văn Af",attend:false},
      {name:"Nguyễn Văn Ad",attend:true},
      {name:"Nguyễn Văn A",attend:true},
      {name:"Nguyễn Văn Ad",attend:false},
      {name:"Nguyễn Văn As",attend:true},
      {name:"Nguyễn Văn Ae",attend:true},
      {name:"Nguyễn Văn Ay",attend:false},
    ]  
    const groupDays = groupBy(scheduleData, item => item.day);
    const [classes,setClasses]=useState(2)
    const [days,setDays]=useState(2)
    const [week,setWeek]=useState(1)
    const [attend,setAttend]=useState(listStudents)
    const [comment,setComment]=useState("")
    const [lesson,setLesson]=useState(1)
    const [content,setContent]=useState("")
    const [notebook,setNotebook]=useState(groupDays)
    let indexComment;
    let indexContent;
    notebook[days].forEach((item,idx)=>{if(item.lesson==lesson)indexComment=idx})
    notebook[days].forEach((item,idx)=>{if(item.lesson==lesson)indexContent=idx})
    const attendStudentCount=attend.filter((student) =>{
      return student.attend;
    }).length;
      const handleChangeClass = (e) => {
        setClasses(e.target.value);
      };
      const handleChangeWeek = (e) => {
        setWeek(e.target.value);
      };
    return <div className="flex bg-[#e6e6ee] w-[100%] min-h-[100vh]">
        <Sidebar/>
        <div className="basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
        <div className="flex justify-center">
        <label className="font-bold mr-[8px] ml-[16px]">Lớp</label>
      <select value={classes} onChange={handleChangeClass} className="border-[1px] border-[black]"> 
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
      <label className="font-bold mr-[8px] ml-[16px]">Tuần</label>
      <select value={week} onChange={handleChangeWeek} className="border-[1px] border-[black]"> 
          {
            Array.from({ length: 36 }, (_, index) => (
                <option value={index+1}>{index+1}</option>
              ))
          }
          
      </select>
      <label className="font-bold mr-[8px] ml-[16px]">Năm học: 2023-2024</label>
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
                <td >{item.classNumber}</td>
                <td >{item.teacher}</td>
                <td >{item.evaluate}</td>
                <td >
                    <button className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
                    onClick={() => setModalShowIsOpen(true)}>Xem</button>
                    <button className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[red] text-[white] shadow-xl "
                    onClick={() => {
                    setModalUpdateIsOpen(true)
                    setComment(item.comment)
                    setContent(item.content)
                    setDays(item.day)
                    setLesson(item.lesson)
                  }
                    }>Sửa</button>
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
              <span>42/45</span>
              <button className="px-[16px] py-[4px] ml-[16px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
              onClick={()=>{setModalAttendIsOpen(true)}}>Điểm danh</button>
            </div>
            <div className="py-[4px]">
              <label className="font-bold">Nội dung bài học</label>
              <textarea className="w-[100%] h-[100px] px-[8px] py-[8px] mt-[8px] rounded bg-[#ececec]"
              onChange={(e)=>{setNotebook((prev)=>{
                let index=0;
                const note={...prev};
                note[days].forEach((item,idx)=>{if(item.lesson==lesson)index=idx})
                note[days][index].content=e.target.value;
                return note;
              })}}>{notebook[days][indexContent]?.content}</textarea>
            </div>
            <div className="py-[4px]">
              <label className="font-bold">Nhận xét</label>
              <textarea className="w-[100%] h-[100px] px-[8px] py-[8px] mt-[8px] rounded bg-[#ececec]"
              onChange={(e)=>{setNotebook((prev)=>{
                let index=0;
                const note={...prev};
                note[days].forEach((item,idx)=>{if(item.lesson==lesson)index=idx})
                note[days][index].comment=e.target.value;
                return note;
              })}}>{notebook[days][indexComment]?.comment}</textarea>
    
            </div>
            <div className="flex justify-end mt-[32px]">
            <button className="px-[16px] py-[4px] ml-[16px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
            onClick={()=>{setModalUpdateIsOpen(false)}}>Lưu</button>
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
              <span>{attendStudentCount}/45</span>
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