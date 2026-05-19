<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'price' => 19.99,
                'sku' => 'PROD001',
            ],
            [
                'price' => 29.99,
                'sku' => 'PROD002',
            ],
            [
                'price' => 39.99,
                'sku' => 'PROD003',
            ]
        ];
        \App\Models\Product::insert($products);
        $products = \App\Models\Product::all();
        $languageIds = \App\Models\Language::pluck('id')->toArray();
        foreach ($products as $product) {
                $product->languages()->attach($languageIds, [
                    'name' => 'Product ' . $product->id,
                    'description' => 'Description for product ' . $product->id,
                ]);
        }

    }
}
