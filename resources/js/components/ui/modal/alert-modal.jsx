import { IoAlertCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { FaRegMessage } from "react-icons/fa6";
import {  router } from "@inertiajs/react";
export default function AlertModal({message,status,eventAlert,path_name}) {
  return (
    <div className="w-full h-full min-h-screen bg-gray-500/50 flex items-center justify-center p-4 absolute top-[50%] translate-y-[-50%]">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#18263B] p-8 shadow-2xl">
        
        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          { status ? <IoAlertCircleOutline size={30} color={'red'}/> : <FaCheck  size={30} color={'green'} />}
        </div>

        {/* Content */}
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-white">
           Thông báo
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-400">
            {message}
          </p>
        </div>

        {/* Button */}
        <button onClick={()=>{
            eventAlert(false)
           if(!status){
                router.visit(path_name)
            }

        }} className="mt-8 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90">
          Go back
        </button>
      </div>
    </div>
  );
}