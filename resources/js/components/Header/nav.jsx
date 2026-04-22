import { useState } from "react";
import { useConfig } from '@/Hooks/useConfig';
import { Link, usePage } from '@inertiajs/react';
import avatar from "@/assets/images/avatar.jpg";
import { router } from '@inertiajs/react';


export default function NavMenu() {
   const setting = useConfig();
   const [lang,setLang] = useState(setting.get('config')['app.locale'] || 'en');
   console.log('setting', setting.get('translations'));

   const changeLanguage = (e) => {
        const lang = e.target.value;
            setLang(lang);

            router.post('/language', { lang }, {
                preserveScroll: true,
                preserveState: false,
                onSuccess: () => {
                    router.reload();
                }
        });
   }


    return (
        <div className="">
            <div className="max-w-4xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="flex justify-between items-center p-6 bg-blue-600">
                     <div className=" text-white p-6 flex items-center">
                        <img src={avatar} alt="avatar"
                            className="w-24 h-24 rounded-full border-4 border-white mr-6"></img>
                        <div>
                            <h1 className="text-3xl font-bold">{setting.get('translations.cv.name')}</h1>
                            <p className="text-lg">{setting.get('translations.cv.position')}</p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-4 items-center">

                        <div>
                            <Link href="/" className="text-black ml-4 bg-gray-100 p-2 ">Home</Link>
                            <Link href="/products" className="text-black ml-4 bg-gray-100 p-2 ">Products</Link>
                        </div>
                         <select className="border border-gray-300 rounded px-3 py-2 text-black text-sm"
                        value={lang} onChange={(e) => changeLanguage(e)}>
                            <option value="en">English</option>
                            <option value="vi">Vietnamese</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
