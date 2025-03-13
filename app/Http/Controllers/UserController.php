<?php

namespace App\Http\Controllers;

use App\Http\Requests\User\StoreUserRequest;
use App\Http\Requests\User\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('user/index', [
            'users' => UserResource::collection(User::latest()->get()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('user/form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        try {
            $data = $request->all();
            $data['password'] = bcrypt('password');

            User::create($data);

            return redirect()->route('user.index')->with('success', 'success create user');
        } catch (\Throwable $th) {
            return redirect()->route('user.create')->with('error', $th->getMessage() . $th->getFile() .''. $th->getLine());
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
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        try {
            $user->update($request->validated());

            return redirect()->route('user.index')->with('success', 'success update user');
        } catch (\Throwable $th) {
            return redirect()->route('user.edit', $user->id)->with('error', $th->getMessage() . $th->getFile() .''. $th->getLine());
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
