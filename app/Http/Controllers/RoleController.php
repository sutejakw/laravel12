<?php

namespace App\Http\Controllers;

use App\Exceptions\ServiceException;
use App\Http\Requests\QueryParamsRequest;
use App\Http\Requests\Role\StoreRoleRequest;
use App\Http\Requests\Role\UpdateRoleRequest;
use App\Models\Role;
use App\Services\Role\IRoleService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class RoleController extends Controller
{
    public function __construct(protected IRoleService $roleService) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(QueryParamsRequest $request): Response
    {
        $roles = $this->roleService->getAllDatatable($request->validated());

        return Inertia::render('role/index', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRoleRequest $request): RedirectResponse
    {
        try {
            $this->roleService->create($request->validated());

            return redirect()
                ->route(route: 'role.index')
                ->with('success', 'success create role');
        } catch (Exception $e) {
            return redirect()
                ->route(route: 'role.index')
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRoleRequest $request, Role $role): RedirectResponse
    {
        try {
            $this->roleService->update($role, $request->validated());

            return redirect()
                ->route(route: 'role.index')
                ->with('success', 'success update role');
        } catch (Exception $e) {
            return redirect()
                ->route(route: 'role.index')
                ->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role): RedirectResponse
    {
        try {
            $this->roleService->delete($role);

            return redirect()
                ->route(route: 'role.index')
                ->with('success', 'success delete role');
        } catch (ServiceException $e) {
            return redirect()
                ->route('role.index')
                ->with('error', $e->getMessage());
        } catch (Throwable $th) {
            return redirect()
                ->route(route: 'role.index')
                ->with('error', $th->getMessage());
        }
    }
}
