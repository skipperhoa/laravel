import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                 'resources/js/app.jsx',
                // 'resources/js/admin.jsx'
                ],
            refresh: true,
        }),
        tailwindcss(),
          react({
            // Thêm dòng này để xử lý JSX trong file .js
            //include: /\.(js|jsx|ts|tsx)$/,
          }),
    ],

    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
