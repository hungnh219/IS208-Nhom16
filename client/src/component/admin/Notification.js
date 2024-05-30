import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import ReactQuill from "react-quill";
import Modal from "react-modal";
import "react-quill/dist/quill.snow.css";
import { formGroupClasses } from "@mui/material";
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
    title: "Thông báo 1",
    content:
      "Nội dung thông báo 1 Nội dung thông báo 1Nội dung thông báo 1 Nội dung thông báo 1Nội dung thông báo 1 Nội dung thông báo 1 Nội dung thông báo 1Nội dung thông báo 1",
  },
  {
    id: 1,
    title: "Thông báo 2",
    content: "Nội dung thông báo 2",
  },
  {
    id: 1,
    title: "Thông báo 3",
    content: "Nội dung thông báo 3",
  },
  // Add more classes as needed
];
const Notification = () => {
  const [modalUpdateIsOpen, setModalUpdateIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const handleChange = (value) => {
    setText(value);
  };
  return (
    <div className="flex bg-[#e6e6ee] w-[100%] min-h-[100vh] ">
      <Sidebar />
      <div className=" basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
        <div className="flex justify-center mt-[24px]">
          <table className="text-center table-notification border-collapse">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tiêu đề</th>
                <th className="w-[300px]">Nội dung</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {post.map((row, index) => (
                <tr key={index}>
                  <td>{row.id}</td>
                  <td>{row.title}</td>
                  <td className="multiline-ellipsis">
                    <div className="overflow-hidden h-[50px]">
                      {row.content}
                    </div>
                  </td>
                  <td>
                    <button
                      className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
                      onClick={() => {
                        setModalUpdateIsOpen(true);
                        setTitle(row.title);
                        setText(row.content);
                      }}
                    >
                      Sửa
                    </button>
                    <button
                      className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[red] text-[white] shadow-xl "
                      onClick={() => {
                        setModalDeleteIsOpen(true);
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
            <input className="border-[1px] border-black" value={title}></input>
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
            onClick={()=>{setModalUpdateIsOpen(formGroupClasses)}}>Lưu</button>
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
             onClick={()=>{setModalDeleteIsOpen(false)}}>Xóa</button>
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
    </div>
  );
};

export default Notification;
