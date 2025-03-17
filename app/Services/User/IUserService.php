<?php

namespace App\Services\User;

use App\Models\User;

interface IUserService
{
    public function create(array $data);

    public function findById(int $id);

    public function update(int $id, array $data);
}
