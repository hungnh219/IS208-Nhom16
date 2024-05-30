import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import axios from 'axios';
import Sidebar from "./Sidebar"
const sampleData = [
    {
      id:1,
      name:"Nguyễn Văn A",
      email:"nva@gmail.com",
      role:"user",
      status:1,
    },
    {
      id:1,
      name:"Nguyễn Văn B",
      email:"nvb@gmail.com",
      role:"user",
      status:1,
    },
    {
      id:1,
      name:"Nguyễn Văn C",
      email:"nvc@gmail.com",
      role:"user",
      status:1,
    },
    // Add more classes as needed
  ];
const User = () => {
  const [users, setUsers] = useState(sampleData);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  return (
    <div className="flex bg-[#e6e6ee] w-[100%] min-h-[100vh] ">
        <Sidebar/>
        <div className=" basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
        <div className="flex justify-center mt-[24px]">
          <table className="text-center table-notification border-collapse">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ và tên</th>
                <th>Email</th>
                <th>Role</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map((row, index) => (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{row.name}</td>
                  <td>{row.email}</td>
                  <td>{row.role}</td>
                  <td>
                    <button
                      className="px-[16px] py-[4px] hover:opacity-[0.8] bg-[#247afb] text-[white] shadow-xl mr-[8px]"
                      onClick={() => {
                       setUsers(()=>{
                        const newusers=[...users];
                        newusers[index].status=!newusers[index].status;
                        return newusers;
                       })
                      }}
                    >
                      {row.status?"Khóa tài khoản":"Mở khóa tài khoản"}
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
    </div>
  );
};

export default User;
