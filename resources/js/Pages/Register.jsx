import React, {useState} from "react";
import {  Link, router , useForm , usePage} from "@inertiajs/react";
import AlertModal from "../components/ui/modal/alert-modal"

export default function Register() {
    const [open, setOpen] = useState(false)
    const [status,setStatus] = useState(false)
    const [message, setMessage] =  useState(null)
    const { data, setData, post, processing, errors} = useForm({
        name: "",
        email: "",
        password: "",
        remember: false,
    });
    const eventAlert = (value)=>setOpen(value)
    const postRegister = (e) => {
        e.preventDefault();
        post("/register",{

            onSuccess: () => {
                setMessage("Đăng ký thành công")
                setStatus(false)
            },
            onError: (errors) => {
                console.log("Lỗi:", errors);
                let msg = Object.values(errors).join(' ');
                setMessage(msg)
                setStatus(true)
            },
            onFinish: () => {
                console.log("Request hoàn tất");
                setOpen(true)
            },
        });
        
       
    };
    return (
        <div className="flex flex-col items-center justify-center mt-10 relative">
            <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Register to start your journey
                    </p>
                </div>

                <form
                    className="space-y-5"
                    onSubmit={postRegister}
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"  onChange={e => setData('name', e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.name && (
                            <div className="text-red-500">{errors.name}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email" onChange={e => setData('email', e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.email && (
                            <div className="text-red-500">{errors.email}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                             name="password" onChange={e => setData('password', e.target.value)}
                            placeholder="Create password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.password && (
                            <div className="text-red-500">{errors.password}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                           name="password_confirmation" onChange={e => setData('password_confirmation', e.target.value)}
                            placeholder="Confirm password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.password_confirmation && (
                            <div className="text-red-500">{errors.password_confirmation}</div>
                        )}
                    </div>

                    <div className="flex items-start gap-2 text-sm text-gray-600">
                        <input type="checkbox" className="mt-1 rounded" />

                        <p>
                            I agree to the
                            <a
                                href="#"
                                className="text-blue-600 hover:underline"
                            >
                                Terms & Conditions
                            </a>
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
                    >
                        Create Account
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Already have an account?
                    <Link
                        href="/login"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
           {open && <AlertModal message={message} status={status} eventAlert={eventAlert} path_name={status?"/register":"/login"}/>}
        </div>
    );
}
