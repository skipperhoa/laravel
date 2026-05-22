import React from "react";

export default function Role({ roles }) {
    console.log(roles)

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
                                Users
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                Permissions
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
                        {roles.map((role) => (
                            <tr
                                key={role.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {role.id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {role.name}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {
                                        role.users.map(user => (
                                            <span key={user} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mr-1">
                                                {user}
                                            </span>
                                        ))
                                    }
                                </td>

                                <td className="px-6 py-4">
                                    {
                                        role.permissions.map(permission => (
                                            <span key={permission} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mr-1">
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
