<?php

namespace App\Repositories\Role;

use App\Models\Role;
use Illuminate\Database\Eloquent\Builder;

interface IRoleRepository
{
    public function findById(int $id, array $columns = ["*"]);

    public function getAllBuilder(
        array $columns = [
            'id',
            'name'
        ]
    ): Builder;

    public function create(array $data): Role;

    public function update(Role $role, array $data): bool;

    public function delete(Role $role): bool;
}
