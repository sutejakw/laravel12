<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Http\Resources\RoleResource;
use App\Models\User;
use App\Services\Role\IRoleService;
use App\Services\User\IUserService;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function __construct(
        protected IUserService $userService,
        protected IRoleService $roleService
    ) {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('user/index', [
            'users' => UserResource::collection(User::with('roles')->latest()->get()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('user/form', [
            'roles' => $this->roleService->getAll(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        DB::beginTransaction();
        try {
            $this->userService->create($request->validated());

            DB::commit();
            return redirect()->route('user.index')->with('success', 'success create user');
        } catch (\Throwable $th) {
            DB::commit();
            return redirect()->route('user.create')->with('error', $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('user/form', [
            'user' => new UserResource($this->userService->findById($user->id)),
            'roles' => RoleResource::collection($this->roleService->getAll()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $this->userService->update($user->id, $request->validated());

            return redirect()->route('user.index')->with('success', 'success update user');
        } catch (\Throwable $th) {
            return redirect()->route('user.edit', $user->id)->with('error', $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('user.index')->with('success', 'success delete user');
    }
}
