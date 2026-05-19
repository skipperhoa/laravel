<?php

namespace App\Providers;

use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Gate;
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

        // Super-admin bypass tất cả permissions
        Gate::before(function ($user, $ability) {
            return $user->hasRole('super-admin') ? true : null;
            // Trả về null để tiếp tục check bình thường với role khác
        });
        config()->macro('share', function (array $keys) {

            HandleInertiaRequests::$sharedConfig = array_merge(HandleInertiaRequests::$sharedConfig, $keys);

        });
    }
}
