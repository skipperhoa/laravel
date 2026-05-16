<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserRolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //tạo một user admin
        $admin = \App\Models\User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('1245678'),
        ]);

        //tạo role admin
        $adminRole = \Spatie\Permission\Models\Role::create(['name' => 'admin']);

        //tạo một số permission
        $permissions = ['view dashboard', 'manage users', 'manage roles'];
        foreach ($permissions as $permission) {
            \Spatie\Permission\Models\Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        //gán permission cho role admin
        $adminRole->givePermissionTo($permissions);

        //gán role cho user admin
        $admin->assignRole($adminRole);
    }
}
