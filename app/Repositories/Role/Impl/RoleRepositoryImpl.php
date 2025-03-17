<?php

namespace App\Repositories\Role\Impl;

use App\Models\Role;
use App\Repositories\Role\IRoleRepository;
use Illuminate\Database\Eloquent\Collection;

class RoleRepositoryImpl implements IRoleRepository
{
    public function __construct(
        protected Role $model
    ) {
    }

    public function findById(int $id, array $columns = ["*"])
    {
        return $this->model->select($columns)->find($id);
    }

    public function getAll(
        array $columns = [
            'id',
            'name'
        ]
    ): Collection
    {
        return $this->model
            ->select($columns)
            ->get();
    }
}
