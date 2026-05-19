import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import GuestLayout from './layouts/GuestLayout';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';
import MainLayout from './layouts/MainLayout';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

// Khởi tạo Query Client dùng chung cho toàn bộ ứng dụng
const queryClient = new QueryClient();

createInertiaApp({
    resolve: async (name) => {
        // Quét toàn bộ file trong thư mục Pages
        const page = await resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        );

        // Kiểm tra xem Page cụ thể đó có tự định nghĩa layout riêng hay không
        // Nếu không định nghĩa mới gán Persistent Layout mặc định theo phân vùng
        if (page.default.layout === undefined) {
            
            // Trường hợp 1: Các trang thuộc phân vùng Public (Ví dụ: Pages/Public/Home.jsx)
            if (name.startsWith('Public/')) {
                page.default.layout = (pageComponent) => pageComponent;
            } 
            
            // Trường hợp 2: Các trang Auth cơ bản (Ví dụ: Pages/Login.jsx hoặc Pages/Register.jsx)
            else if (name === "Login" || name === "Register" || name.startsWith('Auth/')) {
                page.default.layout = (pageComponent) => (
                    <GuestLayout>{pageComponent}</GuestLayout>
                );
            } 
            
            // Trường hợp 3: Các trang thuộc vùng Admin (Ví dụ: Pages/Admin/Dashboard.jsx)
            else if (name.startsWith('Admin/')) {
                page.default.layout = (pageComponent) => (
                    <AuthenticatedLayout>{pageComponent}</AuthenticatedLayout>
                );
            } 
            
            // Trường hợp 4: Mặc định cho các trang Client thông thường khác
            else {
                page.default.layout = (pageComponent) => (
                    <MainLayout>{pageComponent}</MainLayout>
                );
            }
        }

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(
             <QueryClientProvider client={queryClient}>
                 <App {...props} />
             </QueryClientProvider>
        );
    }
});