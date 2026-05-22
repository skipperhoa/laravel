import React from "react";
import { Link , usePage, router} from "@inertiajs/react";
export default function Index({ permissions }) {
    const { flash } = usePage().props;

    const deletePermission = (id) => {
        if (confirm('Bạn có chắc chắn muốn xóa quyền này?')) {
            router.delete(`/admin/permissions/${id}/delete`);
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
                <Link href={`/admin/permissions/create`} className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition m-4 inline-block">
                    Create Permission
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
                                Roles
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
                        {permissions.map((permission) => (
                            <tr
                                key={permission.id}
                                className="border-t hover:bg-gray-50 transition"
                            >
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {permission.id}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-700">
                                    {permission.name}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {
                                        permission.users.map(user => (
                                            <span key={user} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mr-1">
                                                {user}
                                            </span>
                                        ))
                                    }
                                </td>

                                <td className="px-6 py-4">
                                    {
                                        permission.roles.map(role => (
                                            <span key={role} className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 mr-1">
                                                {role}
                                            </span>
                                        ))
                                    }

                                </td>

                                <td className="px-6 py-4 text-center">
                                    <Link href={`/admin/permissions/${permission.id}/edit`} className="px-4 py-2 rounded-lg bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium transition">
                                        Edit
                                    </Link>
                                </td>

                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => deletePermission(permission.id)}
                                        className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
                                    >
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
