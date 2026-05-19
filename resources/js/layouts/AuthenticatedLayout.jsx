import React, { useEffect } from 'react'
import { Link,Head, router } from '@inertiajs/react'
import { useConfig } from '@/hooks/useConfig';
export default function AuthenticatedLayout({children, title}) {
   const setting = useConfig();
   useEffect(() => {
      console.log('auth', setting.get('auth'));
   }, [setting.get('auth')])
    const userlogout = async (e) => {
            e.preventDefault();
            router.post("/logout");
       };
  return (
    <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-800 text-white hidden md:flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-slate-700">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin" className="block p-3 hover:bg-slate-700 rounded transition">
                        📊 Dashboard
                    </Link>
                    <Link href="/admin/users" className="block p-3 hover:bg-slate-700 rounded transition">
                        👥 Quản lý User
                    </Link>
                    <Link href="/admin/settings" className="block p-3 hover:bg-slate-700 rounded transition">
                        ⚙️ Cài đặt
                    </Link>
                </nav>
                <div className="p-4 border-t border-slate-700">
                    <Link href="/logout"  onClick={userlogout} method="post" as="button" className="w-full text-left p-2 text-red-400 hover:text-red-300">
                        Đăng xuất
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-white shadow-sm p-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Xin chào, {setting.get('auth.user').name}</span>
                        <div className="w-8 h-8 bg-slate-500 rounded-full"></div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
  )
}
