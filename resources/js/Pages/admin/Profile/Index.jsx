import React from "react";
import ChangePassword from "./ChangePassword";
import { usePage ,router} from "@inertiajs/react";
import UserInfo from './UserInfo'
export default function Index({ user}) {
    console.log("User:", user);
    const {success, message} = usePage().props.flash;

    const sessions = [
        {
            id: 1,
            user_agent: "Chrome - Windows 11",
            token: "a8sd7a98sd7a",
            time: "2026-05-25 10:30",
        },
        {
            id: 2,
            user_agent: "Safari - iPhone 15",
            token: "x9as8d7asd11",
            time: "2026-05-25 08:12",
        },
        {
            id: 3,
            user_agent: "Firefox - Ubuntu",
            token: "f77asd8asd22",
            time: "2026-05-24 22:41",
        },
    ];

    const removeSessionId =(id)=>{
        router.get(`/admin/users/sessions/${id}/delete`)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-7xl space-y-6">

                {/* PROFILE */}
                <UserInfo user = {user} />

                {/* CHANGE PASSWORD */}
                <ChangePassword success={success}/>

                {success && (
                        <div className="mt-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
                            {success}
                        </div>
                    )}
                     {message && (
                        <div className="mt-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
                            {message}
                        </div>
                    )}



                {/* LOGIN HISTORY */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                Login Device History
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Manage your active sessions and devices.
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                        ID
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                        User Agent
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                        ip
                                    </th>

                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                        Time
                                    </th>

                                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                                        Remove
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {user?.sessions.map((session) => (
                                    <tr
                                        key={session.id}
                                        className={`border-b border-gray-100 hover:bg-gray-50 ${session.is_current_device?"bg-green-100":""}`}
                                    >
                                        <td className="px-4 py-4 text-sm text-gray-700">
                                            {session.id}
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-700">
                                            {session.user_agent}
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-700">
                                            <span className="rounded-lg bg-gray-100 px-3 py-1 font-mono text-xs">
                                                {session.ip_address}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-700">
                                            {session.time}
                                        </td>

                                       <td className="px-4 py-4 text-center">
                                            <button onClick={()=>removeSessionId(session.id)} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600">
                                                Remove
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
