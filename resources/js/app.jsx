import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
// Create a client
const queryClient = new QueryClient()
createInertiaApp({
 resolve: name => {
        const pages = import.meta.glob('./pages/**/*.jsx')
        return pages[`./pages/${name}.jsx`]()
    },
    setup({ el, App, props }) {
        createRoot(el).render(
             <QueryClientProvider client={queryClient}>
                 <App {...props} />
            </QueryClientProvider>
        )
    }

});


