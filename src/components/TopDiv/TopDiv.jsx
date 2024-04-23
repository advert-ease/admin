export function TopDiv(){
    return(
        <div className="h-[25vh] w-full bg-slate-50 rounded-xl shadow-xl px-[50px] flex justify-between">
        <div className="flex items-center justify-center h-26 w-26 gap-[100px]">
          <img src="adicon.svg" alt="Image 1" className="w-full" />
          {/* <div className=" text-gray-400 flex">Total customer</div> */}  
          <div className="flex flex-col items justify-center">
          <p className="flex  text-gray-400 font-semibold w-[10vw]">Total customer</p>
            
          <div className="  font-[500] text-[40px] ">
            5,430
            </div>
        </div>
        </div>

        <div className="h-26 w-26 flex items-center justify-center gap-[60px]">
        <div className="h-[100px] w-[1px] bg-slate-300  "></div>
        <div className="flex gap-[100px]">
          <img src="adicon1.svg" alt="Image 2" className="w-full" />
          <div className="flex flex-col items justify-center">
          <p className=" text-gray-400 font-semibold w-[10vw]">Active Devices</p>
          <div className="  font-[500] text-[40px] ">1,800</div>
        </div>
        </div>
        </div>
    
        <div className=" h-26 w-26 flex items-center gap-[100px] ">
        <div className="h-[100px] w-[1px] bg-slate-300"></div>
        <div className="flex gap-[80px]">
          <img src="adicon2.svg" alt="Image 3" className="w-full " />
          <div className="flex flex-col items justify-center ">
          <p className=" w-[10vw] text-gray-400  font-semibold">
            InActive Devices</p>
          <div className=" font-[500] text-[40px]">856</div>
          
          </div>
          </div>
        </div>
      </div>
    )
}