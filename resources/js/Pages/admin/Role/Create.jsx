import React from 'react'
import { Link } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
export default function Create({ permissions}) {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    permissions: [],
  });
  const submit = (e) => {
    e.preventDefault();
    console.log(data)
     post('/admin/roles');
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
        <h1 className="text-2xl font-bold mb-6">Create Role</h1>
        <form className="max-w-md" method="POST" onSubmit={submit}>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name" onChange={(e) => setData('name', e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                    required
                />
            </div>
            <div>
                <label htmlFor="" className="py-1 text-xl block">
                    Permissions
                </label>
                <div className="bg-[#07132A] rounded-2xl p-2 max-w-xl">
                    <div className=" flex flex-row flex-wrap gap-5">
                        {permissions.map((permission) => (
                            <label
                                key={permission.id}
                                className="flex items-center justify-between py-2 cursor-pointer gap-2"
                            >
                                <span className="text-white font-semibold text-sm">
                                    {permission.name}
                                </span>

                                <input
                                    type="checkbox"

                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setData("permissions", [
                                                ...(data.permissions || []),
                                                permission.name,
                                            ]);
                                        } else {
                                            setData(
                                                "permissions",
                                                data.permissions.filter(
                                                    (p) => p !== permission.name,
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
                        Create Role
                    </button>
            </div>

        </form>

    </div>
  )
}
