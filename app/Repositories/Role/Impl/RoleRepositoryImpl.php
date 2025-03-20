<?php

namespace App\Repositories\Role\Impl;

use App\Models\Role;
use App\Repositories\Role\IRoleRepository;
use Illuminate\Database\Eloquent\Builder;

class RoleRepositoryImpl implements IRoleRepository
{
    public function __construct(
        protected Role $model
    ) {
    }

    public function findById(int $id, array $columns = ["*"])
    {
        return $this->model->newQuery()->select($columns)->where('id', $id)->first();
    }

    public function getAllBuilder(
        array $columns = [
            'id',
            'name'
        ]
    ): Builder
    {
        return $this->model->newQuery()->select($columns);
    }

    public function create(array $data): Role
    {
        return $this->model->create($data);
    }

    public function update(Role $role, array $data): bool
    {
        return $role->update($data);
    }

    public function delete(Role $role): bool
    {
        return $role->delete();
    }
}
