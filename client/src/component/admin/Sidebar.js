import React from 'react';
import { useLocation,Link,useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
const Sidebar = () => {
    const location = useLocation();
    const navigate=useNavigate();
    const pathname = location.pathname;
    const page = pathname.split("/")[2];
    return (
        <div className="flex flex-col w-64 bg-[white] h-screen fixed shadow-xl ">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
            <Stack direction="row" spacing={2}>
              <Avatar>A</Avatar>
            </Stack>
            </div>
            <nav className="flex-1 overflow-y-auto">
                <div className=" px-4 py-[12px]  text-sm font-semibold hover:bg-gray-300 "
                 style={page==="notification"?{backgroundColor:"rgb(209 213 219)"}:{}}>
                    <Link to="/admin/notification" className="block w-[100%]"> <img alt="icon"src="/icon/home.png" width="20px" className="inline-block mr-[8px]"></img>Thông báo</Link>
                </div>
                <div className=" px-4 py-[12px]  text-sm font-semibold hover:bg-gray-300 "
                style={page==="scheduled"?{backgroundColor:"rgb(209 213 219)"}:{}}>
                    <Link to="/admin/scheduled" className="block w-[100%]"> <img alt="icon" src="/icon/schedule.png" width="20px" className="inline-block mr-[8px]"></img>Thời khóa biểu</Link>
                </div>
                <div className=" px-4 py-[12px]  text-sm font-semibold hover:bg-gray-300 "
                style={page==="user"?{backgroundColor:"rgb(209 213 219)"}:{}}>            
                    <Link to="/admin/user" className="block w-[100%]"> <img alt="icon" src="/icon/notebook.png" width="20px" className="inline-block mr-[8px]"></img>Tài khoản</Link>
                </div>           
                <div className=" px-4 py-[12px]  text-sm font-semibold hover:bg-gray-300 "
                style={page==="notebook"?{backgroundColor:"rgb(209 213 219)"}:{}}>            
                    <Link to="/admin/notebook" className="block w-[100%]"> <img alt="icon" src="/icon/notebook.png" width="20px" className="inline-block mr-[8px]"></img>Sổ đầu bài</Link>
                </div>  
            </nav>
            <div className="flex items-center justify-center h-16 border-t border-gray-700">
                <button className="px-4 py-[12px] text-white font-semibold bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600"
                onClick={()=>{navigate("/")}}>Logout</button>
            </div>
        </div>
    );
};

export default Sidebar;
