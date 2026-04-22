<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    /** @use HasFactory<\Database\Factories\LanguageFactory> */
    use HasFactory;
    protected $fillable = [
        'language_code',
        'name',
    ];
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_translation')
            ->withPivot('name', 'description')
            ->withTimestamps();
    }
}
