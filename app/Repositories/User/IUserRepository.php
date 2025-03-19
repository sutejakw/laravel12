<?php

namespace App\Repositories\User;

use App\Models\User;

interface IUserRepository
{
    public function create(array $data): User;

    public function findById(int $id): User;

    public function update(User $user, array $data): bool;
}
