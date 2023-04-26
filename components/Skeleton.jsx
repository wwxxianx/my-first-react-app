import React from 'react'

const Skeleton = () => {
  return (
      <div className="animate-pulse space-y-2">
          <div className="flex gap-2 items-center">
              <div className="w-[50px] h-[50px] rounded-full bg-slate/20"></div>
              <div className="w-[70%] space-y-1">
                  <div className=" w-[50%] h-2 bg-slate/20 rounded"></div>
                  <div className=" w-[30%] h-2 bg-slate/20 rounded"></div>
              </div>
              <div className="ml-auto w-[30px] h-[30px] bg-slate/20 rounded-full"></div>
          </div>
          <div className="flex gap-2 items-center">
              <div className="w-[50px] h-[50px] rounded-full bg-slate/20"></div>
              <div className="w-[70%] space-y-1">
                  <div className=" w-[50%] h-2 bg-slate/20 rounded"></div>
                  <div className=" w-[30%] h-2 bg-slate/20 rounded"></div>
              </div>
              <div className="ml-auto w-[30px] h-[30px] bg-slate/20 rounded-full"></div>
          </div>
          <div className="flex gap-2 items-center">
              <div className="w-[50px] h-[50px] rounded-full bg-slate/20"></div>
              <div className="w-[70%] space-y-1">
                  <div className=" w-[50%] h-2 bg-slate/20 rounded"></div>
                  <div className=" w-[30%] h-2 bg-slate/20 rounded"></div>
              </div>
              <div className="ml-auto w-[30px] h-[30px] bg-slate/20 rounded-full"></div>
          </div>
      </div>
  );
}

export default Skeleton