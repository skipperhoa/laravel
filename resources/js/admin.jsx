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

// Create a client
const queryClient = new QueryClient();

createInertiaApp({
    resolve: async (name) => {
        // Sử dụng resolvePageComponent để nạp file an toàn và đúng chuẩn Vite
        const page = await resolvePageComponent(
           `./pages/admin/${name}.jsx`,

            import.meta.glob('./pages/admin/**/*.jsx')
        );

        // Định nghĩa Persistent Layout ngay tại đây
        page.default.layout = page.default.layout || ((pageComponent) => {
            if (name.startsWith('Public/')) {
                return pageComponent;
            }

            // mặt định
            return <AuthenticatedLayout>{pageComponent}</AuthenticatedLayout>;
        });

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
