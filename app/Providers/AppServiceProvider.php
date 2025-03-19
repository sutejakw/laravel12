<?php

namespace App\Providers;

use App\Enums\RolesEnum;
use App\Repositories\Role\Impl\RoleRepositoryImpl;
use App\Repositories\Role\IRoleRepository;
use App\Repositories\User\Impl\UserRepositoryImpl;
use App\Repositories\User\IUserRepository;
use App\Services\Log\ILogService;
use App\Services\Log\Impl\LogServiceImpl;
use App\Services\Role\Impl\RoleServiceImpl;
use App\Services\Role\IRoleService;
use App\Services\User\Impl\UserServiceImpl;
use App\Services\User\IUserService;
use Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IUserRepository::class, UserRepositoryImpl::class);
        $this->app->bind(IUserService::class, UserServiceImpl::class);
        $this->app->bind(IRoleRepository::class, RoleRepositoryImpl::class);
        $this->app->bind(ILogService::class, LogServiceImpl::class);
        $this->app->bind(IRoleService::class, RoleServiceImpl::class);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        Gate::before(fn ($user, $ability) => $user->hasRole(RolesEnum::SUPERADMIN) ? true : null);
    }
}
