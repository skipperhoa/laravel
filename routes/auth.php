<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use App\Models\User;
// authentication
Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});

Route::middleware('guest')->group(function () {
    Route::get("/login", function (Request $request) {
        return Inertia::render('Login');
    })->name("users.login");
    Route::get("/register", function () {
        return Inertia::render('Register');
    });
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

    // return 1;
    return redirect()->back()->with(["msg" => "Đăng nhập thành công"]);

    //return response()->json(['message' => 'Đăng nhập thành công', 'user' =>$request->user()->only('id', 'name', 'email')]);
});

Route::middleware('auth')->group(function () {
    Route::post("/logout", function (Request $request) {
        Auth::guard('web')->logout();
        // $request->session()->invalidate();
        // $request->ses                                                    sion()->regenerateToken();

        return redirect()->back()->with(['msg' => 'Đăng xuất thành công']);
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
