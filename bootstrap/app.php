<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\Request;
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
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

        $middleware->alias([
            'admin_view' => \App\Http\Middleware\HandleAdminView::class,
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
            'http://laravel13.test/languages',
            // 'http://laravel13.test/register',
             // 'http://laravel13.test/login',
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
