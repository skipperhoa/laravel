import React ,{useState, useEffect} from 'react'
import { useForm, router, useHttp  } from '@inertiajs/react';
import { FaRegEye , FaRegEyeSlash } from "react-icons/fa";

export default function Authenticator({secretKey,google2fa_url,two_factor_enabled}) {
  const [faEnabled,set2faEnabled] = useState(two_factor_enabled)
  const [eye,setEye] = useState(true)
  const [message,setMessage] = useState(null)
  const [qrcode,setQrCode] = useState({
    'secretKey':secretKey??"",
    'google2fa_url ':google2fa_url??"",
  })
  const [otp,setOtp] = useState(null)
  const { data, setData ,get, post, submit } = useHttp({
        'secretKey':'',
        'validOtp':'',
  })
  useEffect(()=>{
    if(secretKey && google2fa_url){
        setQrCode({...qrcode,'secretKey':secretKey})
        setQrCode({...qrcode,'google2fa_url':google2fa_url})
        setData('secretKey',secretKey)
        setMessage("User đã bật xác thực đăng nhập 2FA");
    }
  },[secretKey,google2fa_url])

  /*
  route('admin.users.change-password')
  phải cài plugin : https://github.com/tighten/ziggy
  */
  const saveTwoFactorAuthentication = async (e) => {
    e.preventDefault();
    const response = await post('/admin/users/two-factor-authentication/save',{
        onSuccess: (response) => {
            console.log("a",response)
            setMessage(response.message)
            set2faEnabled(true)
        },
        onError: (errors) => {
            console.log(errors)
            setMessage("Xác thực không đúng")
            set2faEnabled(false)
        },
    })
  }
    const disableTwoFactorAuthentication = async (e) =>{
        e.preventDefault();
        const response = await post('/admin/users/two-factor-authentication/disable',{
            onSuccess: (response) => {
                console.log("a",response)
                setMessage(response.message)
                set2faEnabled(false)
                setQrCode({
                    'secretKey':"",
                    'google2fa_url':"",
                })
                setData('secretKey',"")
            },
            onError: (errors) => {
                console.log(errors)
                setMessage("Xác thực không đúng")
                set2faEnabled(true)
            },
        })
    }
  const generateSecretKey =  async (e) =>{
    e.preventDefault();
    const response = await post('/admin/users/generate-secret-key/create', {
        onSuccess: (response) => {
            //console.log("a",response)
            setQrCode(response)
            setData('secretKey',response.secretKey)
            setMessage("Tạo secret key thành công, vui lòng xác thực OTP để kích hoạt 2FA")

        },
        onError: (errors) => {
            console.log(errors)
            setMessage("Có lỗi xảy ra khi tạo secret key")
        },
    })

  }
  return (
    <>
     <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Kích hoạt đăng nhập 2FA
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                           Giúp bảo mật cho bạn
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
                        <div className="w-full flex flex-col md:flex-row xl:items-center gap-4 justify-start">
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                              Tạo  Secret key
                            </label>

                            <div className="relative">
                                <input
                                    type={eye?"password":"text"}
                                    placeholder="secret_key"
                                    value={qrcode?.secretKey}
                                    onChange={(e) => setData('secretKey', e.target.value)}
                                    className="w-full xl:w-[400px] rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                                />
                                <span className='absolute top-4 right-4 h-full' onClick={()=>setEye(!eye)}>
                                    {
                                        eye?<FaRegEyeSlash size={20} />: <FaRegEye size={20}/>
                                    }
                                </span>
                            </div>
                            <button onClick={generateSecretKey} className="w-auto bg-yellow-500 p-3 text-white text-sm rounded-xl">Tạo ngẫu nhiên</button>

                        </div>
                        <div className='w-auto max-w-[500px]'>

                            {
                                qrcode?.google2fa_url && <div className='flex flex-row items-center gap-2'>
                                    <img src={`${qrcode?.google2fa_url}` } />
                                    <div className="w-auto flex flex-col gap-2">
                                        {
                                         !faEnabled &&
                                            <div className="w-auto flex flex-row items-center gap-2">
                                                <input
                                                    type={"text"}
                                                    placeholder="Nhập OTP"
                                                    onChange={(e) => setData('validOtp',e.target.value)}
                                                    className="w-full xl:w-[200px] rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
                                                />
                                                <div className="w-auto">
                                                    <button onClick={saveTwoFactorAuthentication} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700">
                                                        Save
                                                    </button>
                                                </div>
                                             </div>

                                        }
                                        {
                                            faEnabled && <div>
                                                <p className='text-sm text-green-500'>{message}</p>
                                                <button className="bg-blue-600 text-white p-1 text-sm mt-2 rounded-lg" onClick={disableTwoFactorAuthentication}>
                                                    Tắt 2FA
                                                </button>
                                            </div>
                                        }
                                        {
                                            message && !google2fa_url && <p className='text-sm text-red-500'>{message}</p>
                                        }
                                    </div>
                                </div>
                            }
                            {
                                !qrcode?.google2fa_url && <p className='text-sm text-gray-500'>Bạn chưa tạo 2FA</p>
                            }
                        </div>
                    </div>


      </div>

    </>
  )
}
