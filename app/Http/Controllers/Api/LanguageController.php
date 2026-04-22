<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LanguageController extends Controller
{
    public function __invoke(Request $request)
    {
        $locale = $request->input('lang');

        if (in_array($locale, config('app.supported_locales'))) {
            session(['locale' => $locale]);
        }

        return back(); // 👈 QUAN TRỌNG
    }
}
