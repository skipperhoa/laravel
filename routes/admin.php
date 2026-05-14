<?php

use App\Http\Controllers\Admin\DashboardController;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

Route::middleware(['auth', 'admin_view'])->prefix('admin')->group(function () {

    Route::get('/', function () {
        return Inertia::render('Dashboard', [
            'message' => 'Chào mừng bạn đến với hệ thống!'
        ]);
    });

    Route::get('/dashboard', [DashboardController::class, 'index']);
});
