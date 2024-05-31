
import './App.css';
import {Routes,Route} from "react-router-dom"
import Login from './component/user/Login';
import Home from './component/user/Home';
import Schedule from './component/user/Schedule';
import Game from './component/user/Game';
import Notebook from './component/user/Notebook';
import ForgotPassword from './component/user/ForgotPassword';
import ResetPassword from './component/user/ResetPassword';
import Notification from "./component/admin/Notification"
import Scheduled from "./component/admin/Scheduled"
import NotebookAdmin from "./component/admin/NotebookAdmin"
import User from "./component/admin/User"
import { ToastContainer} from 'react-toastify';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/schedule" element={<Schedule/>}></Route>
        <Route path="/game" element={<Game/>}></Route>
        <Route path="/notebook" element={<Notebook/>}></Route>
        <Route path="/forgot_password" element={<ForgotPassword/>}></Route>
        <Route path="/reset_password" element={<ResetPassword/>}></Route>
        <Route path="/admin/notification" element={<Notification/>}></Route>
        <Route path="/admin/scheduled" element={<Scheduled/>}></Route>
        <Route path="/admin/user" element={<User/>}></Route>
        <Route path="/admin/notebook" element={<NotebookAdmin/>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
