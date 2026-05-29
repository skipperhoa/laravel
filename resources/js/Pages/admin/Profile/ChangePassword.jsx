import React ,{useState, useEffect} from 'react'
import { useForm } from '@inertiajs/react';
import { FaRegEye , FaRegEyeSlash } from "react-icons/fa";
export default function ChangePassword({success}) {
  const {data, setData, put, errors, processing} = useForm({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  })
const [eye,setEye] = useState({
    current_password:true,
    new_password:true,
    new_password_confirmation:true
})

useEffect(()=>{
    console.log(eye)
},[eye])
  /*
  route('admin.users.change-password')
  phải cài plugin : https://github.com/tighten/ziggy
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    put("/admin/users/change-password", {
      onSuccess: () => {
        setData({
          current_password: '',
          new_password: '',
          password_confirmation: '',
        });
      },
    });
  };
  return (
    <>
     <form className="rounded-2xl bg-white p-6 shadow-sm"  onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Change Password
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Update your account password.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Current Password
                            </label>

                         <div className="relative">
                              <input
                                type={eye.current_password?"password":"text"}
                                placeholder="Current password"
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            />
                             <span className='absolute top-4 right-4 h-full' onClick={()=>setEye({...eye,['current_password']:!eye.current_password})}>
                                {
                                    eye.current_password?<FaRegEyeSlash size={20} />: <FaRegEye size={20}/>
                                }
                             </span>
                        </div>

                             {errors.current_password && (
                                <p className="text-red-500 text-sm mt-1">{errors.current_password}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={eye.new_password?"password":"text"}
                                    placeholder="New password"
                                    value={data.new_password}
                                    onChange={(e) => setData('new_password', e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                                />
                                <span className='absolute top-4 right-4 h-full' onClick={()=>setEye({...eye,['new_password']:!eye.new_password})}>
                                    {
                                        eye.new_password?<FaRegEyeSlash size={20} />: <FaRegEye size={20}/>
                                    }
                                </span>
                            </div>
                             {errors.new_password && (
                                <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>

                          <div className="relative">
                                 <input
                                         type={eye.new_password_confirmation?"password":"text"}
                                        value={data.new_password_confirmation}
                                        placeholder="Confirm password"
                                        onChange={(e) => setData('new_password_confirmation', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                                    />
                            <span className='absolute top-4 right-4 h-full' onClick={()=>setEye({...eye,['new_password_confirmation']:!eye.new_password_confirmation})}>
                                    {
                                        eye.new_password_confirmation?<FaRegEyeSlash size={20} />: <FaRegEye size={20}/>
                                    }
                                </span>
                            </div>
                            {errors.new_password_confirmation && (
                                <p className="text-red-500 text-sm mt-1">{errors.new_password_confirmation}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                            Change Password
                        </button>
                    </div>
      </form>

    </>
  )
}
