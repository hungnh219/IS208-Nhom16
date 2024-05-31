import Sidebar from './Sidebar';
import {Link} from "react-router-dom"
import {useState} from "react"
import Modal from "react-modal";
const notify=[
    {id:"khfdhkslf",
    title:"Giới thiệu kỳ thi đánh giá Năng lực tiếng Anh theo Khung năng lực Ngoại ngữ 6 bậc dùng cho Việt Nam (VSTEP)",
    content:"Phòng ĐTĐH gửi đến các bạn thông báo của Trường Đại học Khoa học Xã hội và Nhân văn về việc Giới thiệu kỳ thi đánh giá Năng lực tiếng Anh theo Khung năng lực Ngoại ngữ 6 bậc dùng cho Việt Nam (VSTEP). Thông tin chi tiết theo file đính kèm."},
    {id:"reirwiruewi",
    title:"Thông báo về việc ngừng sử dụng kết quả bài thi ngoại ngữ quốc tế IELST Indicator và TOEFL iBT Home Edition",
    content:"Phòng ĐTĐH thông báo về việc ngừng sử dụng kết quả bài thi ngoại ngữ quốc tế IELST Indicator và TOEFL iBT Home Edition để xét đạt chuẩn quá trình và xét công nhận chuẩn đầu ra tốt nghiệp trình độ đại học kể từ ngày 13/12/2022."}
]
const Home=()=>{
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [idPost,setIdPost]=useState("")
    const content=notify.find((item)=>{return item.id===idPost})
    return <div className="flex bg-[#e6e6ee] w-[100%] min-h-[100vh] ">
        <Sidebar/>
        <div className=" basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
            <div>
                <div className="text-center border-b-[2px] text-[20px] font-bold">THÔNG BÁO</div>
                <div>
                    {
                   notify.map((noti)=>{
                     return <div key={noti.id} className="px-[16px] pb-[4px] hover:text-[blue] text-[#44a2ff] text-[20px] font-bold">
                        <div onClick={()=>{
                            setIdPost(noti.id)
                            setModalIsOpen(true)}}>{noti.title}</div>
                     </div>
                     })
                    }
                   <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Example Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            boxShadow: "0px 0px 10px #e2e2e2",
            border: "none",
            width: "850px",
            height: "500px",
            position: "relative",
          },
        }}
      >
        <div className="p-[16px] ">
          <div className="py-[4px]">
            <div className="font-bold border-b-[1px] border-black text-center">NỘI DUNG </div>
            
          </div>

          <div className="py-[4px] h-[300px]">
            <label className="font-bold">{content?.content}</label>
           
          </div>

        </div>

        <button
          onClick={() => setModalIsOpen(false)}
          className="absolute top-[15px] right-[20px] hover:text-[blue]"
        >
          Đóng
        </button>
      </Modal>
                  
                </div>
            </div>
        </div>
    </div>
}
export default Home;