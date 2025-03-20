<?php

namespace App\Repositories\Permission;

use App\Models\Permission;
use Illuminate\Database\Eloquent\Builder;

interface IPermissionRepository
{
    public function create(array $data): Permission;

    public function findById(int $id, array $columns = ["*"]): ?Permission;

    public function update(Permission $permission, array $data): bool;

    public function delete(Permission $permission): bool;
}
