<?php


use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

Route::get('/test', function () {
    $user = Auth::guard('web')->user();
    // get a list of all permissions directly assigned to the user
    $permissionNames = $user->getPermissionNames(); // collection of name strings
    $permissions = $user->permissions; // collection of permission objects

    // get all permissions for the user, either directly, or from roles, or from both
    $permissions = $user->getDirectPermissions();
    $permissions_2 = $user->getPermissionsViaRoles();
    $permissions_3 = $user->getAllPermissions();

    // get the names of the user's roles
    $roles = $user->getRoleNames(); // Returns a collection of role names
    dd($permissionNames, $permissions, $permissions_2, $permissions_3, $roles);
})->middleware('auth');
