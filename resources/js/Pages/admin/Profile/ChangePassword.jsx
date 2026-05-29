import React from 'react'
import { useForm } from '@inertiajs/react';
export default function ChangePassword({success}) {
  const {data, setData, put, errors, processing} = useForm({
    current_password: '',
    new_password: '',
    new_password_confirmation: '',
  })
  console.log(errors)
  /*
  route('admin.users.change-password')
  phải cài plugin : https://github.com/tighten/ziggy
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    put("/admin/users/change-password", {
      onSuccess: () => {
        setData({
          current_password: '',
          new_password: '',
          password_confirmation: '',
        });
      },
    });
  };
  return (
    <>
     <form className="rounded-2xl bg-white p-6 shadow-sm"  onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Change Password
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Update your account password.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Current Password
                            </label>

                            <input
                                type="password"
                                placeholder="Current password"
                                value={data.current_password}
                                onChange={(e) => setData('current_password', e.target.value)}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            />
                             {errors.current_password && (
                                <p className="text-red-500 text-sm mt-1">{errors.current_password}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                New Password
                            </label>

                            <input
                                type="password"
                                placeholder="New password"
                                value={data.new_password}
                                onChange={(e) => setData('new_password', e.target.value)}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            />
                             {errors.new_password && (
                                <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                value={data.new_password_confirmation}
                                placeholder="Confirm password"
                                onChange={(e) => setData('new_password_confirmation', e.target.value)}
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            />
                            {errors.new_password_confirmation && (
                                <p className="text-red-500 text-sm mt-1">{errors.new_password_confirmation}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit" className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                            Change Password
                        </button>
                    </div>
      </form>

    </>
  )
}
