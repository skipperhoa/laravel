
import Form from './Form';
import { useForm } from '@inertiajs/react';

export default function Edit({ user, roles, permissions }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        password: '',
        roles: user.roles? user.roles.map(r => r) : [],
        permissions: user.permissions? user.permissions.map(p => p) : [],
    });
   /* console.log("user edit",user.permissions)
   const a = user.permissions.map(p => p)
   console.log("user edit4",a)
 */
const t = user.roles? user.roles.map(r => r) : []
console.log(t)
    const submit = (e) => {
        e.preventDefault();

        put(`/admin/users/${user.id}`);
    };

    return (

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">
                    Edit User
                </h1>

                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    submit={submit}
                    isEdit
                    user={user}
                    roles={roles}
                    permissions={permissions}
                />
            </div>

    );
}
