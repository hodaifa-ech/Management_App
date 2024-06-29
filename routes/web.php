<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjetctController;
use App\Http\Controllers\TasktController;
use App\Http\Controllers\UsertController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    Route::get('/notification', [DashboardController::class, 'notify'])
        ->name('notification');
    Route::resource('project', ProjetctController::class);
    Route::get('/task/my-tasks', [TasktController::class, 'myTasks'])
        ->name('task.myTasks');
    Route::resource('task', TasktController::class);
    Route::resource('user', UsertController::class);

    Route::get('/notifications', [HomeController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{id}/read', [HomeController::class, 'markAsRead'])->name('notifications.markAsRead');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
