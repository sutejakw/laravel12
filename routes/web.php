<?php

use App\Enums\RolesEnum;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::middleware(['role:' . RolesEnum::SUPERADMIN->value])
        ->resource('user', UserController::class);

    Route::resource('role', RoleController::class)
        ->except([
            'show', 'edit'
        ]);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
