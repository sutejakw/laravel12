<?php

namespace App\Services\Role\Impl;

use App\Exceptions\ServiceException;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use App\Repositories\Role\IRoleRepository;
use App\Services\Log\ILogService;
use App\Services\Role\IRoleService;
use Exception;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Cache;
use App\Facades\DataTable;

class RoleServiceImpl implements IRoleService
{
    public $cacheKey = 'roles';

    public function __construct(
        protected IRoleRepository $roleRepo,
        protected ILogService $logService
        ) {}
    public function getAll(): mixed
    {
        // check if cache exists
        if (Cache::has($this->cacheKey)) {
            return Cache::get($this->cacheKey);
        }

        // get data from repository
        $roles = $this->roleRepo->getAllBuilder()->get();

        Cache::put($this->cacheKey, $roles, 600);

        return $roles;
    }

    public function getAllDatatable(array $data): AnonymousResourceCollection
    {
        try {
            $query = Role::query();

            $sort = str_replace(
                ['id', 'name'],
                ['id', 'name'],
                request()->query('col')
            );

            $query->select('id', 'name', 'guard_name');

            $result = DataTable::query($query)
                ->searchable(['name'])
                ->applySort($sort)
                ->allowedSorts(['id', 'name'])
                ->make();

            return RoleResource::collection($result);
        } catch (Exception $e) {
            $this->logService->logError(
                contextName: 'RoleServiceImpl@getAllDatatable',
                exception: $e,
                extraContext: [
                    'payload' => $data
                ]
            );

            throw new ServiceException('Failed to fetch role!');
        }
    }

    public function create(array $data): Role
    {
        try {
            $roles = $this->roleRepo->create($data);
            Cache::delete($this->cacheKey);

            return $roles;
        } catch (Exception $e) {
            $this->logService->logError(
                contextName: 'RoleServiceImpl@create',
                exception: $e,
                extraContext: [
                    'payload' => $data,
                    'user' => auth()->user()
                ]
            );

            throw new ServiceException('Failed to create role!');
        }
    }

    public function update(Role $role, array $data): bool
    {
        try {
            $role = $this->roleRepo->findById($role->id);
            Cache::delete($this->cacheKey);

            return $this->roleRepo->update($role, $data);
        } catch (Exception $e) {
            $this->logService->logError(
                contextName: 'RoleServiceImpl@update',
                exception: $e,
                extraContext: [
                    'payload' => $data,
                    'user' => auth()->user()
                ]
            );

            throw new ServiceException('Failed to update role!');
        }
    }

    public function delete(Role $role): bool
    {
        try {
            $role = $this->roleRepo->findById($role->id);
            Cache::delete($this->cacheKey);

            return $this->roleRepo->delete($role);
        } catch (Exception $e) {
            $this->logService->logError(
                contextName: 'RoleServiceImpl@delete',
                exception: $e,
                extraContext: [
                    'user' => auth()->user()
                ]
            );

            throw new ServiceException('Failed to delete role!');
        }
    }
}
