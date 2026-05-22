<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Database\Eloquent\Collection;
use Inertia\Inertia;

Route::middleware(['auth', 'admin_view'])
    ->prefix('admin')
    ->group(function () {

        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard')->middleware('permission:view dashboard');
        Route::middleware('role:admin|super-admin')->group(function () {


        // User Management
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
                return Inertia::render('Admin/User/Index', [
                    'users' => $listUser
                ]);
            })->middleware('permission:manage users');

            Route::get('/users/{id}/edit', function ($id) {
                $user = \App\Models\User::findOrFail($id);
                return Inertia::render('Admin/User/Edit', [
                    'user' => [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'roles' => $user->roles->pluck('name'),
                        'permissions' => $user->getAllPermissions()->pluck('name'),
                    ],
                    'roles' => \Spatie\Permission\Models\Role::all(),
                    'permissions' => \Spatie\Permission\Models\Permission::all(),
                ]);
            })->middleware('permission:edit users');

            Route::put('/users/{id}', function (Request $request, $id) {
                $user = \App\Models\User::findOrFail($id);

                $validatedData = $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => 'required|email|unique:users,email,' . $user->id,
                    'password' => ['nullable', Password::min(8)->mixedCase()->numbers()->symbols()],
                    'roles' => 'array',
                    'permissions' => 'array',
                ]);

                $user->name = $validatedData['name'];
                $user->email = $validatedData['email'];

                if (!empty($validatedData['password'])) {
                    $user->password = Hash::make($validatedData['password']);
                }

                $user->save();

                // Cập nhật roles
                if (isset($validatedData['roles'])) {
                    $user->syncRoles($validatedData['roles']);
                }

                // Cập nhật permissions
                if (isset($validatedData['permissions'])) {
                    $user->syncPermissions($validatedData['permissions']);
                }

                return redirect()->route('admin.users')->with('success', 'User updated successfully.');

            })->middleware('permission:edit users');

             Route::get('/users/{id}/delete', function ($id) {
                $user = \App\Models\User::findOrFail($id);
                $user->delete();
                return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
            })->middleware('permission:delete users');



             Route::get('/users/create', function () {
                return Inertia::render('Admin/User/Create');
            })->middleware('permission:create users');

            // end User Management



            Route::get('/roles', function () {

                $roles = \Spatie\Permission\Models\Role::with('permissions')->get();

                $listRole = $roles->map(function ($role) {
                    return [
                        'id' => $role->id,
                        'name' => $role->name,
                        'users' => $role->users->pluck('name'),
                        'permissions' => $role->permissions->pluck('name'),
                    ];
                });

                return Inertia::render('Admin/Role', [
                    'roles' => $listRole
                ]);
            })->middleware('permission:manage roles');

            Route::get('/permissions', function () {

                $permissions = \Spatie\Permission\Models\Permission::all();

                $listUserToPermission = [];

                $users = \App\Models\User::with('permissions')->get();

                foreach ($users as $user) {

                    foreach ($user->permissions as $permission) {
                        $listUserToPermission[$permission->name][] = $user->name;
                    }

                    foreach ($user->roles as $role) {
                        foreach ($role->permissions as $permission) {
                            $listUserToPermission[$permission->name][] = $user->name;
                        }
                    }
                }
                $userPermission = collect($listUserToPermission)->map(function ($items) {
                    return collect($items)->unique()->values()->toArray();
                });


                $listPermission = $permissions->map(function ($permission) use ($userPermission) {
                    return [
                        'id' => $permission->id,
                        'name' => $permission->name,
                        'users' =>   $userPermission[$permission->name] ?? [],
                        'roles' => $permission->roles->pluck('name'),
                    ];
                });


                return Inertia::render('Admin/Permission', [
                    'permissions' => $listPermission
                ]);
            })->middleware('permission:manage permissions');
        });

        // Writer
        Route::middleware('role:writer|admin|super-admin')->group(function () {
            Route::get('/posts', function () {
                return Response()->json(['message' => 'List of posts.']);
            })->middleware('permission:manage posts');
        });
    });
