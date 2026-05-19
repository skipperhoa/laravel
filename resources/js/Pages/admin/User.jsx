import React from "react";

export default function User({ users }) {
    console.log(users)
    
    return (
        <div className="p-6">
            <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                ID
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Email
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Roles
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Permission
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                Edit
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                                Delete
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {user.id}
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {user.name}
                                </td>

                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {user.email}
                                </td>

                                <td className="px-6 py-4">
                                    {
                                        user.roles.map(role => (
                                            <span key={role} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mr-1">
                                                {role}
                                            </span>
                                        ))
                                    }
                                   
                                </td>

                                <td className="px-6 py-4">
                                    {
                                        user.permissions.map(permission => (
                                            <span key={permission} className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 mr-1">
                                                {permission}
                                            </span>
                                        ))
                                    }
                                   
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <button className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium transition">
                                        Edit
                                    </button>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <button className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}