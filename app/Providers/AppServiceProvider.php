<?php

namespace App\Providers;

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        config()->macro('share', function (array $keys) {

            HandleInertiaRequests::$sharedConfig = array_merge(HandleInertiaRequests::$sharedConfig, $keys);

        });
    }
}
