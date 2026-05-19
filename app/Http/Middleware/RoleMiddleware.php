<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{

    public function handle(Request $request, Closure $next, string ...$roles): mixed
    {
        $user = $request->user();

       /*   dd([
            'user'        => $user?->email,
            'roles'       => $user?->roles->pluck('name'),
            'is_super'    => $user?->hasRole('super-admin'),
            'check_roles' => $roles,
        ]); */

        if (!$user) {
            abort(403);
        }

        // ✅ Super-admin bypass ở đây
        if ($user->hasRole('super-admin')) {
            return $next($request);
        }

        if (!$user->hasAnyRole($roles)) {
            abort(403);
        }

        return $next($request);
    }

}
