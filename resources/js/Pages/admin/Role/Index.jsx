import React from "react";
import { Link , usePage, router} from "@inertiajs/react";
export default function Index({ roles }) {
    const { flash } = usePage().props;
    console.log(roles)
      const deleteRole = (id) => {
            if (confirm('Bạn có chắc chắn muốn xóa role này?')) {
                router.delete(`/admin/roles/${id}/delete`);
            }
        };
    return (
        <div className="p-6">
               {flash.success && (
                     <div className="mb-4 p-2 rounded-lg bg-green-100">
                        <div className="text-sm">{flash.success}</div>
                    </div>
                )}

            <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
                 <Link href={`/admin/roles/create`} className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition m-4 inline-block">
                    Create Role
                </Link>
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
                                            <span key={user} className="px-3 py-1 m-1 inline-block rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mr-1">
                                                {user}
                                            </span>
                                        ))
                                    }
                                </td>

                                <td className="px-6 py-4">
                                    {
                                        role.permissions.map(permission => (
                                            <span key={permission} className="px-3 py-1 inline-block m-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mr-1">
                                                {permission}
                                            </span>
                                        ))
                                    }

                                </td>

                                <td className="px-6 py-4 text-center">
                                    <Link href={`/admin/roles/${role.id}/edit`} className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium transition">
                                        Edit
                                    </Link>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => deleteRole(role.id)}
                                    className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition">
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
