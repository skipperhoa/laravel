<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
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
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
