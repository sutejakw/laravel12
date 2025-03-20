<?php

namespace App\Services\Permission;

use App\Models\Permission;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

interface IPermissionService
{
    public function getAllDatatable(array $data): AnonymousResourceCollection;

    public function create(array $data): Permission;

    public function update(Permission $permission, array $data);

    public function delete(string $id);
}
