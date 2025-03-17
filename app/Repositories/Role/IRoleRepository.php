<?php

namespace App\Repositories\Role;

use Illuminate\Database\Eloquent\Collection;

interface IRoleRepository
{
    public function findById(int $id, array $columns = ["*"]);

    public function getAll(
        array $columns = [
            'id',
            'name'
        ]
    ): Collection;
}
