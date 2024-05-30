import Sidebar from './Sidebar';
import PanelAdmin from "../admin/Sidebar"
import {Link} from "react-router-dom"
const notify=[
    {id:"khfdhkslf",content:"hello"},
    {id:"reirwiruewi",content:"nosoifdjifj"}
]
const Home=()=>{
    return <div className="flex bg-[#e6e6ee] w-[100%] min-h-[100vh] ">
        <Sidebar/>
        <div className=" basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">
            <div>
                <div className="text-center border-b-[2px] text-[20px] font-bold">THÔNG BÁO</div>
                <div>
                    {
                   notify.map((noti)=>{
                     return <div key={noti.id} className="px-[16px] pb-[4px] hover:text-[blue]">
                        <Link to={`./${noti.id}`}>Thông báo về việc học tiếng anh {noti.content}</Link>
                     </div>
                     })
                    }
                  
                  
                </div>
            </div>
        </div>
    </div>
}
export default Home;