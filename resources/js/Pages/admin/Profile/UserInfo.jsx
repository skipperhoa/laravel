import React from 'react'
import { usePage ,router, useForm} from "@inertiajs/react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function UserInfo({user}) {
   const {data, setData, post, errors, processing} = useForm({
      avatar: user.avatar??"",
      name: user.name??"",
      email:  user.email??"",
      phone: user.phone??""
    })
  const modifyUser = () =>{
    e.preventDefault();
    console.log(data)
  }
  return (
    <form onSubmit={modifyUser}>
         <div className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="w-full flex flex-row items-center justify-end">
                    <button className="bg-amber-300 px-2 py-1 rounded-xl text-sm text-black flex flex-row items-center gap-2">
                        {processing && <span className="animate-spin"><AiOutlineLoading3Quarters/> </span>}
                        <span>{processing?"Processing...":"Save change"}</span>
                    </button>

                </div>
                <div className="flex flex-col gap-6 md:flex-row md:items-center">

                    {/* Avatar */}
                    <div className="flex flex-col items-center">
                        <img
                            src={user.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name) + "&background=random&size=128"}
                            alt="avatar"
                            className="h-32 w-32 rounded-full border-4 border-gray-200 object-cover"
                        />

                        <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                            Change Avatar
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Full Name
                            </label>

                            <input
                                type="text"
                                defaultValue={user.name}

                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                defaultValue={user.email}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Phone
                            </label>    `           `

                            <input
                                type="text"
                                defaultValue="0123456789"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Role
                            </label>

                            <input
                                type="text"
                                defaultValue={user.roles.map((role) => role).join(", ")}
                                className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 outline-none"
                                disabled
                            />
                        </div>
                    </div>
                </div>
        </div>
    </form>
  )
}
