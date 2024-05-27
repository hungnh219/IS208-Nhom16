
import './App.css';
import {Routes,Route} from "react-router-dom"
import Login from './component/user/Login';
import Home from './component/user/Home';
import Schedule from './component/user/Schedule';
import Game from './component/user/Game';
import Notebook from './component/user/Notebook';
import ForgotPassword from './component/user/ForgotPassword';
import ResetPassword from './component/user/ResetPassword';
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
      </Routes>
    </div>
  );
}

export default App;
