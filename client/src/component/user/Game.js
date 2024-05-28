import Sidebar from './Sidebar';
import SpinWheel from "./SpinWheel"
import GroupSplit from "./GroupSplit";
import {useState} from "react"
const Game=()=>{
    const [game,setGame]=useState(1)
    return <div className="flex bg-[#e6e6ee] w-[100%] min-h-[100vh]">
        <Sidebar/>
        <div className="basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
            <div >
                <div className="flex gap-[16px] justify-center pt-[24px] pb-[50px]">
                <button className={`px-[16px] py-[8px] shadow-xl hover:bg-[#e8e8e8] ${
                                   game === 1 ? 'bg-[#e8e8e8]' : 'bg-white'}`}
              
                onClick={()=>{setGame(1)}}>
                Vòng quay may mắn
               </button>
               <button className={`px-[16px] py-[8px] shadow-xl hover:bg-[#e8e8e8] ${
                                  game === 2 ? 'bg-[#e8e8e8]' : 'bg-white' }`}
               onClick={()=>{setGame(2)}}>
                Chia nhóm
               </button>
                </div>

              {game===1 &&  <SpinWheel/>}
              {game===2 && <GroupSplit/>}
            </div>
        </div>
    </div>
}
export default Game;