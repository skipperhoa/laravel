import React from 'react'
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
export default function Edit({ roles, permission }) {
  const { data, setData, put, processing, errors } = useForm({
    name: permission.name,
    roles: permission.roles,
  });
  console.log(permission)
  const submit = (e) => {
    e.preventDefault();
    console.log(data)
     put(`/admin/permissions/${permission.id}`);
  }
  return (
    <div>
        <div>
            {errors.name && (
                <div className="mb-4 p-2 rounded-lg bg-red-100">
                    <div className="text-sm text-red-700">{errors.name}</div>
                </div>
            )}
        </div>
        <h1 className="text-2xl font-bold mb-6">Edit Permission</h1>
        <form className="max-w-md" method="POST" onSubmit={submit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    name="name" value={data.name} onChange={(e) => setData('name', e.target.value)}
                    id="name"
                    className="w-full border rounded-lg px-4 py-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="" className="py-1 text-xl block">
                    Roles
                </label>
                <div className="bg-[#07132A] rounded-2xl p-2 max-w-xl">
                    <div className=" flex flex-row flex-wrap gap-5">
                        {roles.map((role) => (
                            <label
                                key={role.id}
                                className="flex items-center justify-between py-2 cursor-pointer gap-2"
                            >
                                <span className="text-white font-semibold text-sm">
                                    {role.name}
                                </span>

                                <input
                                    type="checkbox"
                                    defaultChecked={
                                        data.roles && data.roles.includes(role.name)
                                    }
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setData("roles", [
                                                ...(data.roles || []),
                                                role.name,
                                            ]);
                                        } else {
                                            setData(
                                                "roles",
                                                data.roles.filter(
                                                    (r) => r !== role.name,
                                                ),
                                            );
                                        }
                                    }}
                                    className="w-4 h-4 accent-indigo-500"
                                />
                            </label>
                        ))}
                    </div>
                </div>

            </div>
            <div className="mt-4">

                    <button
                        type="submit"
                       disabled={processing}
                        className="px-5 py-2 bg-blue-600 text-white rounded-lg"
                    >
                        Update Permission
                    </button>
            </div>

        </form>

    </div>
  )
}
