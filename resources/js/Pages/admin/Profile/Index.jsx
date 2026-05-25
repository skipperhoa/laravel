import React from "react";

export default function Index({ user}) {
    console.log("User:", user);

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

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-7xl space-y-6">

                {/* PROFILE */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
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
                                </label>

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

                {/* CHANGE PASSWORD */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
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

                            <input
                                type="password"
                                placeholder="Current password"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                New Password
                            </label>

                            <input
                                type="password"
                                placeholder="New password"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                            Change Password
                        </button>
                    </div>
                </div>

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
                                        Token
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
                                {sessions.map((session) => (
                                    <tr
                                        key={session.id}
                                        className="border-b border-gray-100 hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-4 text-sm text-gray-700">
                                            {session.id}
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-700">
                                            {session.user_agent}
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-700">
                                            <span className="rounded-lg bg-gray-100 px-3 py-1 font-mono text-xs">
                                                {session.token}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4 text-sm text-gray-700">
                                            {session.time}
                                        </td>

                                        <td className="px-4 py-4 text-center">
                                            <button className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600">
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
