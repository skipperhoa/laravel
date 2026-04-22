<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Session;
class SetLocale
{
     public function handle(Request $request, Closure $next)
    {
        // 1. kiểm tra nếu có tham số 'lang' trong URL ?lang=vi hoặc ?lang=en
        // ví dụ : http://localhost:8000/?lang=vi
        if ($request->has('lang')) {
            $locale = $request->lang;
            Session::put('locale', $locale);
        }
        // 2. Nếu không có tham số 'lang', kiểm tra nếu đã lưu trong session
        // ví dụ : http://localhost:8000/ (lần đầu tiên sẽ lấy ngôn ngữ từ header, sau đó lưu vào session)
        // header 'Accept-Language' có thể có giá trị như 'en-US,en;q=0.9,vi;q=0.8' => ưu tiên tiếng Anh hơn tiếng Việt
        elseif (Session::has('locale')) {
            $locale = Session::get('locale');
        }
        // 3. Nếu không có trong session,
        // lấy ngôn ngữ ưu tiên từ header 'Accept-Language' của trình duyệt
        else {
            $locale = $request->getPreferredLanguage(['en', 'vi']) ?? config('app.locale');
        }

        App::setLocale($locale);

        return $next($request);
    }
}
