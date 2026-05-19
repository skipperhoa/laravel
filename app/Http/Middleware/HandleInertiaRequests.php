<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{

    /**
     * Config keys that should be shared with the frontend.
     */
    public static $sharedConfig = [
         'app.url',
         'app.name',
         'app.locale'

    ];
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
      return array_merge(parent::share($request), [
            'auth' => [
               'user' => $request->user(),
               'role' => $request->user()?->roles?->pluck('name'),
               'permissions' => $request->user()?->getAllPermissions()->pluck('name'),
            ],
            'flash' => [
                'msg' => fn () => $request->session()->get('msg'),
            ],
            'config' => fn () => config()->get(static::$sharedConfig),

            'translations' => [
                'cv' => __('cv'),
                'product' => __('product'),
            ],

        ]);
    }
}
