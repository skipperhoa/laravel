<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChangeUserRolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // lấy tất cả các user chưa có role
        $usersWithoutRole = \App\Models\User::doesntHave('roles')->get();
        // tạo role user nếu chưa tồn tại
        $userRole = \Spatie\Permission\Models\Role::firstOrCreate(['name' => 'user']);

        $rolePermissions = ['view dashboard'];

        foreach ($rolePermissions as $permission) {
            \Spatie\Permission\Models\Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        $userRole->givePermissionTo($rolePermissions);
        // gán role user cho tất cả các user chưa có role
        foreach ($usersWithoutRole as $user) {
            $user->assignRole($userRole);
        }

    }
}
