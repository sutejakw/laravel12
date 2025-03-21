<?php

namespace App\Services\Permission\Impl;

use App\Exceptions\NotFoundException;
use App\Exceptions\ServiceException;
use App\Facades\DataTable;
use App\Http\Resources\PermissionResource;
use App\Models\Permission;
use App\Repositories\Permission\IPermissionRepository;
use App\Services\Log\ILogService;
use App\Services\Permission\IPermissionService;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Cache;

class PermissionServiceImpl implements IPermissionService
{
    public $cacheKey = 'permissions';

    public function __construct(
        protected IPermissionRepository $permissionRepo,
        protected ILogService $logService) {
    }

    public function getAllDatatable(array $data): AnonymousResourceCollection
    {
        try {
            $query = Permission::query();

            $sort = str_replace(
                ['id', 'name'],
                ['id', 'name'],
                request()->query('col', 'name') // Provide a default value of an empty string
            );

            $query->select('id', 'name', 'guard_name');

            $result = DataTable::query($query)
                ->searchable(['name'])
                ->applySort($sort)
                ->allowedSorts(['id', 'name'])
                ->make();

            return PermissionResource::collection($result);
        } catch (\Throwable $th) {
            $this->logService->logError(
                contextName: 'PermissionServiceImpl@getAllDatatable',
                exception: $th,
                extraContext: [
                    'payload' => $data
                ]
            );

            throw new ServiceException('Failed to fetch permission!');
        }
    }

    public function create(array $data): Permission
    {
        try {
            $permission = $this->permissionRepo->create($data);
            Cache::delete($this->cacheKey);

            return $permission;
        } catch (\Throwable $th) {
            $this->logService->logError(
                contextName: 'PermissionServiceImpl@create',
                exception: $th,
                extraContext: [
                    'payload' => $data,
                    'user' => auth()->user()
                ]
            );

            throw new ServiceException('Failed to create permission!');
        }
    }

    public function update(Permission $permission, array $data)
    {
        try {
            $permission = $this->permissionRepo->findById($permission->id);
            if (!$permission) throw new NotFoundException('Permission not found!');

            $this->permissionRepo->update($permission, $data);
            Cache::delete($this->cacheKey);

            return $permission;
        } catch (NotFoundException $e) {
            throw $e;
        } catch (\Throwable $th) {
            $this->logService->logError(
                contextName: 'PermissionServiceImpl@update',
                exception: $th,
                extraContext: [
                    'payload' => $data,
                    'user' => auth()->user()
                ]
            );

            throw new ServiceException('Failed to update permission!');
        }
    }

    public function delete(string $id)
    {
        try {
            $permission = $this->permissionRepo->findById($id);
            if (!$permission) throw new NotFoundException('Permission not found!');

            $this->permissionRepo->delete($permission);
            Cache::delete($this->cacheKey);

            return $permission;
        }  catch (NotFoundException $e) {
            throw $e;
        } catch (\Throwable $th) {
            $this->logService->logError(
                contextName: 'PermissionServiceImpl@delete',
                exception: $th,
                extraContext: [
                    'user' => auth()->user()
                ]
            );

            throw new ServiceException('Failed to delete permission!');
        }
    }
}
