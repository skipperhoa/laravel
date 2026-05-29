import React, { useState, useEffect } from "react";
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
    dataRolePermission = [],
}) {
    const [permissionsToRoles, setPermissionsToRoles] = useState([]);
    const [permissionsToUser,setPermissionsToUser] = useState([]);
    const [check,setCheck] = useState(false);

    useEffect(() => {
        if (isEdit && user) {
            let tempPermissions = [];
            user.roles.forEach((role) => {
                const rolePerm = dataRolePermission.find((r) => r.role === role);
                if (rolePerm) {
                    tempPermissions.push(...rolePerm.permissions);
                }
            });
            setPermissionsToRoles([...new Set(tempPermissions)]);
            // xóa các permission đã có trong roles, khỏi permissions riêng của user
            const individualPerms = user.permissions.filter(
                (p) => !tempPermissions.includes(p),
            );
            setData("permissions", individualPerms);
            console.log("co")
            setPermissionsToUser(individualPerms)
        }
    }, [isEdit, user, dataRolePermission]);

    const getPermissionsForRole = (roleName, checked) => {
        if (checked) {

            const role = dataRolePermission.find((r) => r.role === roleName);

            let tempPermissions = [...permissionsToRoles];

            if (role) {

                tempPermissions.push(...role.permissions);

                setPermissionsToRoles([...new Set(tempPermissions)]);

              //  setCheck(true)

                const individualPerms = data.permissions.filter(
                    (p) => !tempPermissions.includes(p),
                );

                setData('permissions',individualPerms);


            }
        } else {

            setData('permissions',permissionsToUser);

            const remainingRoles = data.roles.filter((r) => r !== roleName);

            let tempPermissions = [];

            remainingRoles.forEach((role) => {
                const perm = dataRolePermission.find((r) => r.role === role);

                if (perm) {
                    tempPermissions.push(...perm.permissions);

                }
            });

            setPermissionsToRoles([...new Set(tempPermissions)]);
        }


    };

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
                                    getPermissionsForRole(
                                        role.name,
                                        e.target.checked,
                                    );
                                }}
                                className="w-4 h-4 accent-indigo-500"
                            />
                        </label>
                    ))}
                </div>
                <div className="mt-2">
                    {permissionsToRoles.length > 0 && (
                        <div className="text-sm text-black m-1 text-white">
                            Permissions for selected roles:
                            {permissionsToRoles.map((perm, index) => (
                                <span
                                    key={index}
                                    className="font-medium m-1 inline-block text-indigo-600 bg-white p-1 text-sm rounded"
                                >
                                    {perm}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <label htmlFor="" className="py-1 text-xl block">
                Permissions
            </label>
            <div className="bg-[#07132A] rounded-2xl p-2 max-w-xl">
                <div className=" flex flex-row flex-wrap gap-5">
                    {permissions.map((permission) => {
                        if (permissionsToRoles.includes(permission.name)) {
                            return null; // Skip permissions that are already included via roles
                        }
                        return (
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
                                /*  disabled={
                                        !permissionsToRoles.includes(
                                            permission.name,
                                        )
                                    } */
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
                        )
                    })}

                </div>
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
