<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (RolesEnum::cases() as $role) {
            $role = app(Role::class)->findOrCreate($role->value, 'web');

            $total_permissions = Permission::count();
            $random_permissions = Permission::inRandomOrder()->take(rand(1, $total_permissions - 1))->get();

            $role->givePermissionTo($random_permissions);
        }
    }
}
