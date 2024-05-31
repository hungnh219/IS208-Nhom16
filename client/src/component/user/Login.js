// src/Login.js
import React, { useState, useEffect } from 'react';
import {json, useNavigate} from "react-router-dom"
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/teacher/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password: password })
            });

            const data = await response.json();
            
            console.log(data)
            console.log(JSON.stringify({ email: username, password: password }))
            if (data.success) {
                localStorage.setItem('teacherId', data.teacherData._id)
                if(data.role == "Giáo viên" || data.role == "giáo viên")
                    navigate("/home");
                else
                    navigate("/admin/notification")
            }
        } catch (error) {
            console.error('Login error:', error);
        }
        // navigate("/home");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center">Đăng nhập</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 ">
                        Đăng nhập
                    </button>
                    <div type="submit" className="w-full py-2 px-4 text-indigo-600 bg-white font-semibold text-center cursor-pointer"
                    onClick={()=>{navigate("/forgot_password")}}>
                        Quên mật khẩu?
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
