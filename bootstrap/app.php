<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {

        $middleware->redirectGuestsTo(function (Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'ok' => false,
                    'message' => "In withMiddleware: Custom Unauthenticated message because no accept header!",
                    'msg' => "In withMiddleware: Custom Unauthenticated message because no accept header!",
                ], 401);
            } else {
                return route("users.login");
            }
        });

        // Tùy biến logic redirect cho nhóm route dùng middleware 'guest'
        $middleware->redirectUsersTo(function (Request $request) {
            $user = $request->user();

            // Check nếu user có role super-admin
            if ($user && method_exists($user, 'hasRole') && $user->hasRole('super-admin')) {
                return 'admin/dashboard';
            }

            // Kiểm tra xem user có quyền xem trang quản trị hay không
            if ($user && $user->can('view dashboard')) {
                return 'admin/dashboard';
            }

            return '/'; // Trang chủ mặc định cho các user khác
        });

        $middleware->alias([
            'admin_view' => \App\Http\Middleware\HandleAdminView::class,
            //'role' => \Spatie\Permission\Middleware\RoleMiddleware::class,// mặt định của spatie
            'role' => \App\Http\Middleware\RoleMiddleware::class, // ghi đè để sử dụng Gate trong AppServiceProvider
            'permission' => \Spatie\Permission\Middleware\PermissionMiddleware::class,
            'role_or_permission' => \Spatie\Permission\Middleware\RoleOrPermissionMiddleware::class,

        ]);
        $middleware->web(append: [
            \App\Http\Middleware\SetLocale::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);
        $middleware->api(append: [
            \App\Http\Middleware\SetLocale::class,

        ]);

        $middleware->preventRequestForgery(except: [
            // 'stripe/*',
            // 'http://example.com/foo/*',
           // 'http://laravel13.test/languages',
            // 'http://laravel13.test/register',
            //  'http://laravel13.test/login',
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // Change response
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            if ($request->is('api/*')) {
                return response()->json([
                    'message' => $e->getMessage(),
                ], 401);
            }
        });
    })->create();
