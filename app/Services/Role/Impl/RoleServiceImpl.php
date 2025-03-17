<?php

namespace App\Services\Role\Impl;

use App\Repositories\Role\IRoleRepository;
use App\Services\Role\IRoleService;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class RoleServiceImpl implements IRoleService
{
    public $cacheKey = 'roles';

    public function __construct(
        protected IRoleRepository $roleRepo
        ) {}
    public function getAll()
    {
        // check if cache exists
        if (Cache::has($this->cacheKey)) {
            return Cache::get($this->cacheKey);
        }

        // get data from repository
        $roles = $this->roleRepo->getAll();

        Cache::put($this->cacheKey, $roles, 600);

        return $roles;
    }
}
