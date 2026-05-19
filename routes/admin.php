<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
Route::middleware(['auth', 'admin_view'])
    ->prefix('admin')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard')->middleware('permission:view dashboard');
        Route::middleware('role:admin|super-admin')->group(function () {

            Route::get('users', function () {
                $users = \App\Models\User::all();
                $listUser = $users->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'roles' => $user->roles->pluck('name'),
                        'permissions' => $user->getAllPermissions()->pluck('name'),
                    ];
                });
                return Inertia::render('Admin/User', [
                    'users' => $listUser
                ]);
            })->middleware('permission:manage users');

            Route::get('/roles',function(){
                $roles = \Spatie\Permission\Models\Role::with('permissions')->get();
                $listRole = $roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                        'permissions' => $role->permissions->pluck('name'),
                    ];
                })->middleware('permission:manage roles');
            });
        });

        // Writer
        Route::middleware('role:writer|admin|super-admin')->group(function () {
            Route::get('/posts', function(){
                    return Response()->json(['message' => 'List of posts.']);
            })->middleware('permission:manage posts');
        });
    });
