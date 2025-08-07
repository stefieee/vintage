<?php

use App\Http\Controllers\ProdukController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('produks', [ProdukController::class, 'index'])->name('produks.index');
    Route::get('/produks/create', [ProdukController::class, 'create'])->name('produk.create');
    Route::post('/produks', [ProdukController::class, 'store'])->name('produk.store');
    Route::get('/produks/{id}/edit', [ProdukController::class, 'edit']);
    Route::put('/produks/{id}', [ProdukController::class, 'update']);
    Route::delete('/produks/{id}', [ProdukController::class, 'destroy'])->name('produk.destroy');
    Route::get('/produks/{produk}', [ProdukController::class, 'show'])->name('produk.show');






});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
