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
        }else{
            $locale = $request->getPreferredLanguage(['en', 'vi']) ?? config('app.locale');
        }

        ///  return back(); // 👈 QUAN TRỌNG, Khi dùng kit React  + Inertia

        // Nếu bạn muốn trả về JSON thay vì chuyển hướng, bạn có thể làm như sau:
        return response()->json([
            'message' => 'Language changed successfully',
            'locale' => $locale,
            'translations' => [
                'cv' => __('cv'),
                'product' => __('product'),
            ],
        ]);
    }
}
