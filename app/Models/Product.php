<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;
    protected $fillable = [
        'price',
        'sku',
    ];

    public function languages()
    {
        return $this->belongsToMany(Language::class, 'product_translation')
            ->withPivot('name', 'description')
            ->withTimestamps();
    }
}
