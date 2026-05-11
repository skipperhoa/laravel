<?php

use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

use App\Models\User;
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

// authentication
Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});
Route::get("/login", function () {
    return Inertia::render('Login');
})->name("users.login");
Route::get("/register", function () {
    return Inertia::render('Register');
});
Route::post("register", function (Request $request) {
    $data = $request->validate([
        'name'     => 'required|string|max:255',
        'email'    => 'required|email|unique:users',
        'password' => ['required', 'confirmed', Password::min(8)],
    ]);

    $user = User::create([
        'name'     => $data['name'],
        'email'    => $data['email'],
        'password' => Hash::make($data['password']),
    ]);

    Auth::login($user);

    return redirect()->back()->with(['msg' => 'Đăng ký thành công']);
});
Route::post("/login", function (Request $request) {

    $credentials = $request->validate([
        'email'    => 'required|email',
        'password' => 'required',
    ]);

    if (!Auth::attempt($credentials, $request->boolean('remember'))) {

        return redirect()->back()->withErrors(['msg' => 'Invalid email or password used.']);
    }


    $request->session()->regenerate();

    return back();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post("/logout", function (Request $request) {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Đăng xuất thành công']);
    });
    Route::get("/user", function (Request $request) {
        return response()->json(['user' => $request->user()]);
    });

    Route::post("/change-password", function (Request $request) {
        $request->validate([
            'current_password' => 'required',
            'password'         => ['required', 'confirmed', Password::min(8)],
        ]);

        if (!Hash::check($request->current_password, $request->user()->password)) {
            return response()->json(['message' => 'Mật khẩu hiện tại không đúng'], 422);
        }

        $request->user()->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Đổi mật khẩu thành công']);
    });
});



Route::get('/test', function () {
    $lng = app()->getLocale();
    return response()->json([
        'message' => "Current locale: $lng",
    ], Response::HTTP_OK);
});
