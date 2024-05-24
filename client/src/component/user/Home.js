import Sidebar from './Sidebar';
const Home=()=>{
    return <div className="flex bg-[#e6e6ee] w-[100%] h-[100vh] ">
        <Sidebar/>
        <div className="flex basis-[100%] bg-[white] ml-[300px] mt-[24px] mr-[24px] p-[16px] rounded-[8px] shadow-xl">lịch thời khóa biểu</div>
    </div>
}
export default Home;