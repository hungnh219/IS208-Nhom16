import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Gửi yêu cầu khôi phục mật khẩu tới server
    console.log('Gửi yêu cầu khôi phục mật khẩu tới email:', email);
    // Đặt lại trường email sau khi gửi yêu cầu
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Quên Mật Khẩu</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleChange}
              required
              className="mt-1 p-2 block w-full rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Gửi Yêu Cầu
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
