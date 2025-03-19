<?php

namespace App\Services\Role;

use App\Models\Role;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

interface IRoleService
{
    public function getAll(): mixed;

    public function getAllDatatable(array $data): AnonymousResourceCollection;

    public function create(array $data): Role;

    public function update(Role $role, array $data): bool;

    public function delete(Role $role): bool;
}
