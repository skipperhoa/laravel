import { useState } from "react";
import { useConfig } from '@/hooks/useConfig';
import { usePage } from '@inertiajs/react';
import avatar from "@/assets/images/avatar.jpg";
import { router } from '@inertiajs/react';
import NavMenu from '../components/ui/app-nav';
import  useCartStore  from '@/stores/cartStore';
export default function Home({ message }) {

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
            <NavMenu />

            <div className="max-w-4xl mx-auto my-10 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 gap-6 p-6">


                <div className="col-span-1">
                    <h2 className="text-xl font-semibold mb-2 border-b pb-1">{setting.get('translations.cv.info')}</h2>
                    <p className="text-sm mb-1">📧 {setting.get('translations.cv.email')}</p>
                    <p className="text-sm mb-1">📱 {setting.get('translations.cv.phone')}</p>
                    <p className="text-sm mb-4">📍 {setting.get('translations.cv.location')}</p>

                    <h2 className="text-xl font-semibold mb-2 border-b pb-1">{setting.get('translations.cv.skills')}</h2>
                    <ul className="text-sm list-disc ml-4">
                        {
                            setting.get('translations.cv.skill_list').split(",").map((skill, index) => (
                                <li key={index}>{skill.trim()}</li>
                            ))
                        }

                    </ul>
                </div>


                <div className="col-span-2">
                    <h2 className="text-xl font-semibold mb-2 border-b pb-1">{setting.get('translations.cv.about')}</h2>
                    <p className="text-sm mb-4">
                    {setting.get('translations.cv.about_desc')}
                    </p>

                    <h2 className="text-xl font-semibold mb-2 border-b pb-1">{setting.get('translations.cv.experience')}</h2>
                    {
                        setting.get('translations.cv.experience_list').map((exp, index) => {
                            return (
                                <div key={index} className="mb-4">
                                    <h3 className="font-semibold">{exp.name}</h3>
                                    <p className="text-sm text-gray-600">{exp.time}</p>
                                    <p className="text-sm">{exp.desc}</p>
                                </div>
                            )
                        })
                    }

                    <h2 className="text-xl font-semibold mb-2 border-b pb-1">{setting.get('translations.cv.education')}</h2>
                    {
                        setting.get('translations.cv.school_lists').map((school, index) => {
                            return (
                                <div key={index} className="mb-4">
                                    <h3 className="font-semibold">{school.name}</h3>
                                    <p className="text-sm text-gray-600">{school.major}</p>
                                </div>
                            )
                        })
                    }
                </div>

                </div>
            </div>
        </div>
    )
}
