<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // set user to super-admin
        $user->assignRole(RolesEnum::SUPERADMIN);

        // give all permissions
        $user->syncPermissions(Permission::get());

        $role = Role::where('name', RolesEnum::SUPERADMIN)->first();
        $role->syncPermissions(Permission::all());
    }
}
