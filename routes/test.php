<?php


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

Route::post('/test123', function (Request $request){
    return response()->json(['message' => 'Test API']);
});
Route::get('/test', function (Request $request) {

    $user = request()->user('web');
   
    // Lấy danh sách tất cả các quyền được gán trực tiếp cho người dùng.
    $permissionNames = $user->getPermissionNames(); // collection of name strings
    $permissions = $user->permissions; // collection of permission objects

    // Lấy tất cả các quyền cho người dùng, trực tiếp, thông qua vai trò hoặc cả hai.
    $permissions = $user->getDirectPermissions();
    $permissions_2 = $user->getPermissionsViaRoles();
    $permissions_3 = $user->getAllPermissions();

    // get the names of the user's roles
    $roles = $user->getRoleNames(); // Returns a collection of role names

    dd($permissionNames, $permissions, $permissions_2, $permissions_3, $roles);

})->middleware('auth');

Route::post('/test/add-role-to-user', function (Request $request) {
    $user = request()->user('web');
    $user->assignRole('admin');
    return response()->json(['message' => 'Role "admin" has been assigned to the user.']);
})->middleware('auth');
