import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ReactQuill from "react-quill";
import Modal from "react-modal";
import "react-quill/dist/quill.snow.css";
Modal.setAppElement("#root");
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];
const post = [
  {
    id: 1,
    title:"Giới thiệu kỳ thi đánh giá Năng lực tiếng Anh theo Khung năng lực Ngoại ngữ 6 bậc dùng cho Việt Nam (VSTEP)",
    content:"Phòng ĐTĐH gửi đến các bạn thông báo của Trường Đại học Khoa học Xã hội và Nhân văn về việc Giới thiệu kỳ thi đánh giá Năng lực tiếng Anh theo Khung năng lực Ngoại ngữ 6 bậc dùng cho Việt Nam (VSTEP). Thông tin chi tiết theo file đính kèm.",
  },
  {
    id: 2,
    title:"Thông báo về việc ngừng sử dụng kết quả bài thi ngoại ngữ quốc tế IELST Indicator và TOEFL iBT Home Edition",
    content:"Phòng ĐTĐH thông báo về việc ngừng sử dụng kết quả bài thi ngoại ngữ quốc tế IELST Indicator và TOEFL iBT Home Edition để xét đạt chuẩn quá trình và xét công nhận chuẩn đầu ra tốt nghiệp trình độ đại học kể từ ngày 13/12/2022."},

  // Add more classes as needed
];
const Notification = () => {
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [modalCreateIsOpen, setModalCreateIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [id,setId]=useState("");
  const [posts,setPosts]=useState(post)
  const [newPost,setNewPost]=useState({title:"",content:""})
  const handleChange = (value) => {
    setText(value);
    const p=[...posts]
    p[index].content=value
    setPosts(p)
  };
  let index
  posts.forEach((post,idx)=>{if(post.id===id)index=idx})
  return (
    <div className="flex bg-[#e6e6ee] w-[100%] min-h-[100vh] ">
      <Sidebar />
      <div className=" basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
        <div className="flex justify-center mt-[24px]">
          <table className="text-center table-notification border-collapse">
            <thead>
              <tr>
                <th>Id</th>
                <th className="w-[500px]">Tiêu đề</th>
                <th className="w-[300px]">Nội dung</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{posts[index]?.title}</td>
                  <td className="multiline-ellipsis">
                    <div className="overflow-hidden h-[50px]">
                      {posts[index]?.content}
                    </div>
                  </td>
                  <td>
                    <button
                      className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
                      onClick={() => {
                        setModalUpdateIsOpen(true);
                        setTitle(row.title);
                        console.log(row.title)
                        setText(row.content);
                        setId(row.id)
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[red] text-[white] shadow-xl "
                      onClick={() => {
                        setModalDeleteIsOpen(true);
                        setId(row.id)
                      }}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end px-[32px] mt-[24px]">
          <button className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]" 
          onClick={()=>{
            setModalCreateIsOpen(true)
          }
          
            }>
            Thêm thông báo
          </button>
          </div>
      </div>
      <Modal
        isOpen={modalUpdateIsOpen}
        onRequestClose={() => setModalUpdateIsOpen(false)}
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
            <div className="font-bold">Tiêu đề: </div>
            <input className="border-[1px] border-black w-full"
            value={title} 
            onChange={(e)=>{setTitle(e.target.value)
              const p=[...posts]
              p[index].title=e.target.value
              setPosts(p)
            }}></input>
          </div>

          <div className="py-[4px] overflow-scroll h-[300px]">
            <label className="font-bold">Nội dung thông báo</label>
            <ReactQuill
              value={text}
              onChange={handleChange}
              modules={modules}
              formats={formats}
            />
          </div>
          <div className="flex justify-end mt-[32px]">
            <button className="px-[16px] py-[4px] ml-[16px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
            onClick={()=>{
              setModalUpdateIsOpen(false)
              }}>Lưu</button>
            </div> 
        </div>

        <button
          onClick={() => setModalUpdateIsOpen(false)}
          className="absolute top-[15px] right-[20px] hover:text-[blue]"
        >
          Đóng
        </button>
      </Modal>
      <Modal
        isOpen={modalDeleteIsOpen}
        onRequestClose={() => setModalDeleteIsOpen(false)}
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
            width: "500px",
            height: "200px",
            position: "relative",
          },
        }}
      >
        <div className="p-[16px] ">
          <div className="py-[4px] text-center">
           Bạn có chắc chắn muốn xóa không ?
          
          </div>

          <div className="flex justify-center mt-[32px]">
            <button className="px-[16px] py-[4px] ml-[16px] hover:opacity-[0.8] bg-[red] text-[white] shadow-xl mr-[8px]"
             onClick={()=>{
              setModalDeleteIsOpen(false)
              const p=[...posts]
              p.splice(index, 1);
              setPosts(p)
            }}
             >Xóa</button>
            <button className="px-[16px] py-[4px] ml-[16px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
            onClick={()=>{setModalDeleteIsOpen(false)}}>Hủy bỏ</button>
            </div> 
        </div>

        <button
          onClick={() => setModalDeleteIsOpen(false)}
          className="absolute top-[15px] right-[20px] hover:text-[blue]"
        >
          Đóng
        </button>
      </Modal>
      <Modal
        isOpen={modalCreateIsOpen}
        onRequestClose={() => setModalCreateIsOpen(false)}
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
            <div className="font-bold">Tiêu đề: </div>
            <input className="border-[1px] border-black" 
            onChange={(e)=>{setNewPost({...newPost, title: e.target.value})}}
            ></input>
          </div>

          <div className="py-[4px] overflow-scroll h-[300px]">
            <label className="font-bold">Nội dung thông báo</label>
            <ReactQuill
              onChange={(value)=>{setNewPost({...newPost, content: value})}}
              modules={modules}
              formats={formats}
            />
          </div>
          <div className="flex justify-end mt-[32px]">
            <button className="px-[16px] py-[4px] ml-[16px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
            onClick={()=>{setModalCreateIsOpen(false)
              const p=[...posts]
              p.push({id:posts.length+1,title:newPost.title,content:newPost.content})
              setPosts(p)
            }}>Lưu</button>
            </div> 
        </div>

        <button
          onClick={() => setModalCreateIsOpen(false)}
          className="absolute top-[15px] right-[20px] hover:text-[blue]"
        >
          Đóng
        </button>
      </Modal>
    </div>
  );
};

export default Notification;
