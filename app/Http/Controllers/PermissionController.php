<?php

namespace App\Http\Controllers;

use App\Exceptions\NotFoundException;
use App\Exceptions\ServiceException;
use App\Http\Requests\Permission\StorePermissionRequest;
use App\Http\Requests\Permission\UpdatePermissionRequest;
use App\Http\Requests\QueryParamsRequest;
use App\Models\Permission;
use App\Services\Permission\IPermissionService;
use Exception;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function __construct(protected IPermissionService $permissionService) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(QueryParamsRequest $request)
    {
        $permissions = $this->permissionService->getAllDatatable($request->validated());

        return Inertia::render('permission/index', [
            'permissions' => $permissions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePermissionRequest $request): RedirectResponse
    {
        try {
            $this->permissionService->create($request->validated());

            return redirect()
                ->route(route: 'permission.index')
                ->with('success', 'success create permission');
        } catch (ServiceException $e) {
            return redirect()
                ->route('permission.index')
                ->with('error', $e->getMessage());
        } catch (\Throwable $e) {
            return redirect()
                ->route('permission.index')
                ->with('error', 'Unexpected error occurred. Please contact support.');
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePermissionRequest $request, Permission $permission)
    {
        try {
            $this->permissionService->update($permission, $request->validated());

            return redirect()
                ->route(route: 'permission.index')
                ->with('success', 'success update permission');
        } catch (NotFoundException $e) {
            return redirect()
                ->route('permission.index')
                ->with('error', $e->getMessage());
        } catch (ServiceException $e) {
            return redirect()
                ->route('permission.index')
                ->with('error', $e->getMessage());
        } catch (\Throwable $e) {
            return redirect()
                ->route('permission.index')
                ->with('error', 'Unexpected error occurred. Please contact support.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $this->permissionService->delete($id);

            return redirect()
                ->route(route: 'permission.index')
                ->with('success', 'success delete permission');
        } catch (NotFoundException $e) {
            return redirect()
                ->route('permission.index')
                ->with('error', $e->getMessage());
        } catch (ServiceException $e) {
            return redirect()
                ->route('permission.index')
                ->with('error', $e->getMessage());
        } catch (\Throwable $e) {
            return redirect()
                ->route('permission.index')
                ->with('error', 'Unexpected error occurred. Please contact support.');
        }
    }
}
