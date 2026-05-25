import React,{ useState, useEffect} from 'react'
import { Link, router, useForm, usePage, Form } from "@inertiajs/react";
import AlertModal from "../components/ui/modal/alert-modal"
// const csrf_token = document.cookie
//     .split("; ")
//     .find((r) => r.startsWith("XSRF-TOKEN="))
//     ?.split("=")[1];
export default function Login() {
    const { auth,flash } = usePage().props;
    console.log("Auth", auth)
    console.log("flash", flash)
    const [open, setOpen] = useState(false)
    const [status,setStatus] = useState(false)
    const [message, setMessage] =  useState(null)
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });
    const eventAlert = (value)=>setOpen(value)
    const postLogin = (e) => {
        e.preventDefault();
        console.log("Data gửi đi", data)
       // return;
        post("/login", {
            onSuccess: () => {
                setMessage("Đăng nhập thành công")
                setStatus(false)
            },

            onError: (errors) => {
                let msg = Object.values(errors).join(' ');
                console.log("lỗi",errors)
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
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 mt-2">Login to your account</p>
                </div>

                <form className="space-y-5" onSubmit={postLogin}>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            onChange={(e) => setData("email", e.target.value)}
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
                            name="password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                        {errors.password && (
                            <div className="text-red-500">
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-600">
                            <input
                                type="checkbox"
                                className="rounded" onChange={(e) => setData("remember", e.target.checked)}
                                name="remember"
                            ></input>
                            Remember me
                        </label>

                        <a href="#" className="text-blue-500 hover:underline">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm mt-6">
                    Don't have an account?
                    <Link
                        href="/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Register
                    </Link>
                </p>
            </div>
             {open && <AlertModal message={message} status={status} eventAlert={eventAlert} path_name={status?"/login":"/"}/>}
        </div>
    );
}
