<?php

use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
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

Route::get('/cart', function () {
    return Inertia::render('Cart');
});
Route::post('languages', function (Request $request) {
    $locale = $request->input('lang');

    if (in_array($locale, config('app.supported_locales'))) {
        session(['locale' => $locale]);
    } else {
        $locale = $request->getPreferredLanguage(['en', 'vi']) ?? config('app.locale');
    }

    return back();
});

include_once "auth.php";
include_once "admin.php";
