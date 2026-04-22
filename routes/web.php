<?php

use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use \App\Http\Controllers\Api\LanguageController;
/* Route::get('/', function () {
    return view('welcome');
}); */
use Inertia\Inertia;
Route::get('/', function () {
    return Inertia::render('Home', [
        'message' => 'Chào mừng bạn đến với hệ thống!'
    ]);
});

Route::get('/products', function () {
    $lang = app()->getLocale();
    $products = \App\Models\Product::with(['languages' => function ($query) use ($lang) {
        $query->where('language_code', $lang);
    }])->get();

    $data = [];
    foreach ($products as $product) {
        $data[] = [
            'id' => $product->id,
            'title' => $product->languages->first()->pivot->name ?? null,
            'description' => $product->languages->first()->pivot->description ?? null,
            'price' => $product->price,
            'sku' => $product->sku,
        ];
    }

     return Inertia::render('Product', [
         'products' => $data,
     ]);
});
Route::post('language', LanguageController::class);

Route::get('/test', function () {
    $lng = app()->getLocale();
    return response()->json([
        'message' => "Current locale: $lng",
    ], Response::HTTP_OK);
});
