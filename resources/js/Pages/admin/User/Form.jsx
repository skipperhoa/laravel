export default function Form({
    data,
    setData,
    errors,
    submit,
    processing,
    isEdit = false,
    user = null,
    roles = [],
    permissions = [],
}) {


    const dataRolePermission = [
        {
            "role":"admin",
            "permissions":['manage users', 'manage roles', 'manage permissions']
        },
        {
            "role":"writer",
            "permissions":['manage posts', 'manage comments']
        },
        {
            "role":"Dev",
            "permissions":['delete user', 'edit user']
        }
    ]

    return (
        <form
            onSubmit={submit}
            className="bg-white p-6 rounded-xl shadow space-y-5"
        >
            <div>
                <label className="block mb-2 font-medium">Name</label>

                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                />

                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
            </div>

            <div>
                <label className="block mb-2 font-medium">Email</label>

                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                />

                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
            </div>

            <div>
                <label className="block mb-2 font-medium">Password</label>

                <input
                    type="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                />

                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </p>
                )}

                {isEdit && (
                    <p className="text-sm text-gray-500 mt-1">
                        Leave blank if not changing password.
                    </p>
                )}
            </div>

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
                                defaultChecked={
                                    data.permissions &&
                                    data.permissions.includes(permission.name)
                                }
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

            <div>
                <label className="block mb-2 font-medium">Roles</label>

                {/*  <select
                    multiple
                    value={data.roles || []}
                    onChange={(e) =>
                        setData(
                            'roles',
                            Array.from(
                                e.target.selectedOptions,
                                (option) => option.value
                            )
                        )
                    }
                    className="w-full border rounded-lg px-4 py-2"
                >
                    {roles.map((role) => (
                        <option key={role.id} value={role.name} selected={data.roles && data.roles.includes(role.name)}>
                            {role.name}
                        </option>
                    ))}
                </select>

                {errors.roles && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.roles}
                    </p>
                )} */}
            </div>

            <button
                type="submit"
                disabled={processing}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
                {isEdit ? "Update User" : "Create User"}
            </button>
        </form>
    );
}
