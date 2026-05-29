
import Form from './Form';
import { useForm } from '@inertiajs/react';

export default function Create({ roles, permissions, dataRolePermission }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        roles: [],
        permissions: [],
        dataRolePermission: dataRolePermission || [],
    });

    const submit = (e) => {
        e.preventDefault();
       // console.log(data)
        post('/admin/users');
    };

    return (

            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">
                    Create User
                </h1>

                <Form
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    submit={submit}
                    roles={roles}
                    permissions={permissions}
                    dataRolePermission={dataRolePermission}
                />
            </div>

    );
}
