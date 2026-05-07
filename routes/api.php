<?php

use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\LanguageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('languages', LanguageController::class);
Route::apiResource('products', ProductController::class);

