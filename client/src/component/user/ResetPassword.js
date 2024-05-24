import React, { useState } from 'react';

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Kiểm tra xác nhận mật khẩu mới
    if (newPassword !== confirmPassword) {
      alert('Xác nhận mật khẩu mới không khớp!');
      return;
    }
    // Gửi yêu cầu thay đổi mật khẩu mới tới server
    console.log('Gửi yêu cầu thay đổi mật khẩu mới tới server');
    // Đặt lại trường mật khẩu sau khi gửi yêu cầu
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Thay Đổi Mật Khẩu Mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Mật Khẩu Mới:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleChangeNewPassword}
              required
              className="mt-1 p-2 block w-full rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Xác Nhận Mật Khẩu Mới:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChangeConfirmPassword}
              required
              className="mt-1 p-2 block w-full rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
            Thay Đổi Mật Khẩu
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
