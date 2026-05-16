<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

class HandleAdminView
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {


        if ($request->is('admin/*') || $request->is('admin')) {
            Inertia::setRootView('admin');
        }

        return $next($request);
    }
}
