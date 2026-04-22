<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
            ['language_code' => 'vi', 'name' => 'Vietnamese'],
            ['language_code' => 'en', 'name' => 'English']
        ];

        foreach ($languages as $language) {
            \App\Models\Language::create($language);
        }
    }
}
