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

        $users = [
            [
                'name' => 'Hoa Nguyễn Coder',
                'email' => 'hoanguyencoder@example.com',
                'password' => Hash::make('1245678'),
            ],
            [
                'name' => 'Hoa Dev',
                'email' => 'hoadev@example.com',
                'password' => Hash::make('1245678'),
            ],
            [
                'name'=> 'Hoa Coder',
                'email' => 'hoacode@example.com',
                'password' => Hash::make('1245678'),
            ]

        ];

        //tạo một user
        \App\Models\User::insert($users);

        // tạo role
        $roles = [
            'super-admin',
            'admin',
            'writer'
        ];
        foreach ($roles as $role) {
            \Spatie\Permission\Models\Role::create(['name' => $role]);
        }

        //rán supper-admin cho một tài khoản cấp cao
        $superAdmin = \App\Models\User::where('email', 'hoanguyencoder@example.com')->first();
        $superAdmin->assignRole('supper-admin');


        // lấy ra user admin
        $admin = \App\Models\User::where('email', 'hoadev@example.com')->first();
        $adminRole = \Spatie\Permission\Models\Role::where('name', 'admin')->first();

        //tạo một số permission
        $permissions = ['view dashboard', 'manage users', 'manage roles'];
        foreach ($permissions as $permission) {
            \Spatie\Permission\Models\Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }
        //gán permission cho role admin
        $adminRole->givePermissionTo($permissions);
        //gán role cho user admin
        $admin->assignRole($adminRole);


        // lấy ra user writer
        $writer = \App\Models\User::where('email', 'hoacode@example.com')->first();
        $writerRole = \Spatie\Permission\Models\Role::where('name', 'writer')->first();
        //gán permission cho role writer
        $writerRole->givePermissionTo('view dashboard');
        //gán role cho user writer
        $writer->assignRole($writerRole);

    }
}
