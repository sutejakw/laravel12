<?php

namespace App\Repositories\User\Impl;

use App\Models\User;
use App\Repositories\User\IUserRepository;

class UserRepositoryImpl implements IUserRepository
{
    public function __construct(
        protected User $model
    ) {
    }

    public function create(array $data): User
    {
        return $this->model->create($data);
    }

    public function findById(int $id): User
    {
        return $this->model->findOrFail($id);
    }

    public function update(User $user, array $data): bool
    {
        return $user->update($data);
    }
}
