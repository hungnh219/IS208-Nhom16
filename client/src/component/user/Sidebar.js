import React from 'react';
import {useState} from "react"
import { useLocation,Link,useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
const Sidebar = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const pathname = location.pathname;
    const page = pathname.split("/")[1];
    return (
        <div className="flex flex-col w-64 bg-[white] h-screen fixed shadow-xl ">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
            <Stack direction="row" spacing={2}>
              <Avatar>U</Avatar>
            </Stack>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <div className=" px-4 py-2  text-sm font-semibold hover:bg-gray-300 "
                 style={page=="home"?{backgroundColor:"rgb(209 213 219)"}:{}}>
                    <Link to="/home" className="block w-[100%]"> <img src="./icon/home.png" width="20px" className="inline-block mr-[8px]"></img>Trang chủ</Link>
                </div>
                <div className=" px-4 py-2  text-sm font-semibold hover:bg-gray-300 "
                style={page=="schedule"?{backgroundColor:"rgb(209 213 219)"}:{}}>
                    <Link to="/schedule" className="block w-[100%]"> <img src="./icon/schedule.png" width="20px" className="inline-block mr-[8px]"></img>Thời khóa biểu</Link>
                </div>
                <div className=" px-4 py-2  text-sm font-semibold hover:bg-gray-300 "
                style={page=="notebook"?{backgroundColor:"rgb(209 213 219)"}:{}}>            
                    <Link to="/notebook" className="block w-[100%]"> <img src="./icon/notebook.png" width="20px" className="inline-block mr-[8px]"></img>Sổ đầu bài</Link>
                </div>
                <div className=" px-4 py-2  text-sm font-semibold hover:bg-gray-300 "
                style={page=="game"?{backgroundColor:"rgb(209 213 219)"}:{}}>
                    <Link to="/game" className="block w-[100%]">                    <img src="./icon/game.png" width="20px" className="inline-block mr-[8px]"></img>Game</Link>
                </div>
              
            </nav>
            <div className="flex items-center justify-center h-16 border-t border-gray-700">
                <button className="px-4 py-2 text-white font-semibold bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                onClick={()=>{navigate("/")}}>Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
