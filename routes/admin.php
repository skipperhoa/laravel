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

            Route::get('/dashboard', function() {
            $users= \App\Models\User::count();
            $roles = \Spatie\Permission\Models\Role::count();
            $permissions = \Spatie\Permission\Models\Permission::count();
            $products = 0;
            $stats = [
                    [
                        'label' => 'Users',
                        'value' => $users,
                        'color' => "bg-blue-500",
                    ],
                    [
                        'label' => 'Roles',
                        'value' => $roles,
                        'color' => "bg-green-500",
                    ],
                    [
                        'label' => 'Permissions',
                        'value' => $permissions,
                        'color' => "bg-yellow-500",
                    ],
                    [
                        'label' => 'Products',
                        'value' => $products,
                        'color' => "bg-red-500",
                    ]
                ];

            return Inertia::render('Admin/Dashboard', [
                'stats' => $stats
            ]);

            })->name('admin.dashboard')->middleware('permission:view dashboard');
      //  Route::middleware('role:admin|super-admin')->group(function () {

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
            })->middleware('permission:manage users')->name('admin.users');

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
            })->middleware('permission:edit users')->name('admin.users.edit');

            Route::post('/users', function (Request $request) {
                $validatedData = $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => 'required|email|unique:users,email',
                    'password' => ['required', Password::min(8)->mixedCase()->numbers()->symbols()],
                    'roles' => 'array',
                    'permissions' => 'array',
                ]);

                $user = \App\Models\User::create([
                    'name' => $validatedData['name'],
                    'email' => $validatedData['email'],
                    'password' => Hash::make($validatedData['password']),
                ]);

                if (isset($validatedData['roles'])) {
                    $user->syncRoles($validatedData['roles']);
                }

                if (isset($validatedData['permissions'])) {
                    $user->syncPermissions($validatedData['permissions']);
                }

                return redirect()->route('admin.users')->with('success', 'User created successfully.');

            })->middleware('permission:create users')->name('admin.users.store');

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

            })->middleware('permission:edit users')->name('admin.users.update');

             Route::delete('/users/{id}/delete', function ($id) {
                $user = \App\Models\User::findOrFail($id);
                $user->syncRoles([]); // thu hồi tất cả role trước khi xóa user
                $user->syncPermissions([]); // thu hồi tất cả permission trước khi xóa user
                $user->delete();
                return redirect()->route('admin.users')->with('success', 'User deleted successfully.');
            })->middleware('permission:delete users')->name('admin.users.delete');

             Route::get('/users/create', function () {
                return Inertia::render('Admin/User/Create', [
                    'roles' => \Spatie\Permission\Models\Role::all(),
                    'permissions' => \Spatie\Permission\Models\Permission::all(),
                ]);
            })->middleware('permission:create users')->name('admin.users.create');
            // end User Management


            // Role Management
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

                return Inertia::render('Admin/Role/Index', [
                    'roles' => $listRole
                ]);
            })->middleware('permission:manage roles')->name('admin.roles');

            Route::get('/roles/create', function () {
                return Inertia::render('Admin/Role/Create', [
                    'permissions' => \Spatie\Permission\Models\Permission::all()
                ]);
            })->middleware('permission:create roles')->name('admin.roles.create');

            Route::post('/roles', function (Request $request) {
                $validatedData = $request->validate([
                    'name' => 'required|string|max:255|unique:roles,name',
                    'permissions' => 'array',
                ]);

                $role = \Spatie\Permission\Models\Role::create(['name' => $validatedData['name']]);

                if (isset($validatedData['permissions'])) {
                    $role->syncPermissions($validatedData['permissions']);
                }

                return redirect()->route('admin.roles')->with('success', 'Role created successfully.');

            })->middleware('permission:create roles')->name('admin.roles.store');

            Route::delete('/roles/{id}/delete', function ($id) {
                $role = \Spatie\Permission\Models\Role::findOrFail($id);
                $role->syncPermissions([]); // thu hồi tất cả permission trước khi xóa role
                $role->syncUsers([]); // thu hồi tất cả user trước khi xóa role
                $role->delete();
                return redirect()->route('admin.roles')->with('success', 'Role deleted successfully.');
            })->middleware('permission:delete roles')->name('admin.roles.delete');

            Route::get('/roles/{id}/edit', function ($id) {
                $role = \Spatie\Permission\Models\Role::findOrFail($id);
                return Inertia::render('Admin/Role/Edit', [
                    'role' => [
                        'id' => $role->id,
                        'name' => $role->name,
                        'permissions' => $role->permissions->pluck('name'),
                    ],
                    'permissions' => \Spatie\Permission\Models\Permission::all(),
                ]);
            })->middleware('permission:edit roles')->name('admin.roles.edit');

            Route::put('/roles/{id}', function (Request $request, $id) {
                $role = \Spatie\Permission\Models\Role::findOrFail($id);

                $validatedData = $request->validate([
                    'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
                    'permissions' => 'array',
                ]);

                $role->name = $validatedData['name'];
                $role->save();

                if (isset($validatedData['permissions'])) {
                    $role->syncPermissions($validatedData['permissions']);
                }
                return redirect()->route('admin.roles')->with('success', 'Role updated successfully.');
            })->middleware('permission:edit roles')->name('admin.roles.update');
            // end Role Management


            // Permission Management
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


                return Inertia::render('Admin/Permission/Index', [
                    'permissions' => $listPermission
                ]);
            })->middleware('permission:manage permissions')->name('admin.permissions');

            Route::get('/permissions/create', function () {
                return Inertia::render('Admin/Permission/Create', [
                    'roles' => \Spatie\Permission\Models\Role::all()
                ]);
            })->middleware('permission:create permissions')->name('admin.permissions.create');

            Route::post('/permissions', function (Request $request) {
                $validatedData = $request->validate([
                    'name' => 'required|string|max:255|unique:permissions,name',
                    'roles' => 'array',
                ]);

                $permission = \Spatie\Permission\Models\Permission::create(['name' => $validatedData['name']]);

                if (isset($validatedData['roles'])) {
                    // thu hồi và thêm role mới cùng một lúc
                    $permission->syncRoles($validatedData['roles']);
                }

                return redirect()->route('admin.permissions')->with('success', 'Permission created successfully.');

            })->middleware('permission:create permissions')->name('admin.permissions.store');

            Route::delete('/permissions/{id}/delete', function ($id) {
                $permission = \Spatie\Permission\Models\Permission::findOrFail($id);
                $permission->syncRoles([]); // thu hồi tất cả role trước khi xóa permission
                $permission->syncUsers([]); // thu hồi tất cả user trước khi xóa permission
                $permission->delete();
                return redirect()->route('admin.permissions')->with('success', 'Permission deleted successfully.');
            })->middleware('permission:delete permissions')->name('admin.permissions.delete');

             Route::get('/permissions/{id}/edit', function ($id) {
                $permission = \Spatie\Permission\Models\Permission::findOrFail($id);
                return Inertia::render('Admin/Permission/Edit', [
                    'permission' => [
                        'id' => $permission->id,
                        'name' => $permission->name,
                        'roles' => $permission->roles->pluck('name'),
                    ],
                    'roles' => \Spatie\Permission\Models\Role::all(),
                ]);
            })->middleware('permission:edit permissions')->name('admin.permissions.edit');

             Route::put('/permissions/{id}', function (Request $request, $id) {
                $permission = \Spatie\Permission\Models\Permission::findOrFail($id);

                $validatedData = $request->validate([
                    'name' => 'required|string|max:255|unique:permissions,name,' . $permission->id,
                    'roles' => 'array',
                ]);

                $permission->name = $validatedData['name'];
                $permission->save();

                if (isset($validatedData['roles'])) {
                    $permission->syncRoles($validatedData['roles']);
                }

                return redirect()->route('admin.permissions')->with('success', 'Permission updated successfully.');
             })->middleware('permission:edit permissions')->name('admin.permissions.update');

             //end permission

     //   });



        // Writer
        Route::middleware('role:writer|admin|super-admin')->group(function () {
            Route::get('/posts', function () {
                return Response()->json(['message' => 'List of posts.']);
            })->middleware('permission:manage posts');
        });
    });
