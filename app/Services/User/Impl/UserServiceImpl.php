<?php

namespace App\Services\User\Impl;

use App\Exceptions\ServiceException;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Repositories\Role\IRoleRepository;
use App\Repositories\User\IUserRepository;
use App\Services\Log\ILogService;
use App\Services\User\IUserService;
use Exception;

class UserServiceImpl implements IUserService
{
    public function __construct(
        protected IUserRepository $userRepo,
        protected IRoleRepository $roleRepo,
        protected ILogService $logService,
        ) {
    }
    public function create(array $data)
    {
        try {
            $original_data = $data;
            $role_id = $data['role_id'];
            unset($data['role_id']);

            $data['password'] = bcrypt('password'); // default password is 'password'
            $user = $this->userRepo->create($data);

            $role = $this->roleRepo->findById($role_id, [
                'id',
                'name',
            ]);

            $user->assignRole($role->name);
        } catch (Exception $e) {
            $this->logService->logError(
                contextName: 'UserServiceImpl@create',
                exception: $e,
                extraContext: [
                    'payload' => $original_data
                ]
            );

            throw new ServiceException('Failed to create user!');
        }
    }

    public function findById(int $id)
    {
        try {
            $user = $this->userRepo->findById($id);
            $user['role_id'] = $user->roles->first()->id ?? '';

            return $user;
        } catch (Exception $e) {
            $this->logService->logError(
                contextName: 'UserServiceImpl@findById',
                exception: $e,
            );

            throw new ServiceException('User not found!');
        }
    }

    public function update(int $id, array $data)
    {
        try {
            $original_data = $data;
            $user = $this->userRepo->findById($id);
            $role_id = $data['role_id'];
            unset($data['role_id']);

            $this->userRepo->update($user, $data);

            $role = $this->roleRepo->findById($role_id, [
                'id',
                'name',
            ]);

            $user->syncRoles($role->name);
        } catch (Exception $e) {
            $this->logService->logError(
                contextName: 'UserServiceImpl@update',
                exception: $e,
                extraContext: [
                    'payload' => $original_data
                ]
            );

            throw new ServiceException('Failed to update user!');
        }
    }
}
