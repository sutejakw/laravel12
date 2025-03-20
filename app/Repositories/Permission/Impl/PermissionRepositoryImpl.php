<?php

namespace App\Repositories\Permission\Impl;

use App\Models\Permission;
use App\Repositories\Permission\IPermissionRepository;
use Illuminate\Database\Eloquent\Builder;

class PermissionRepositoryImpl implements IPermissionRepository
{
    public function __construct(protected Permission $model) {
    }

    public function create(array $data): Permission
    {
        return $this->model->create($data);
    }

    public function findById(int $id, array $columns = ["*"]): ?Permission
    {
        return $this->model->newQuery()->select($columns)->where('id', $id)->first();
    }

    public function update(Permission $permission, array $data): bool
    {
        return $permission->update($data);
    }

    public function delete(Permission $permission): bool
    {
        return $permission->delete();
    }
}
