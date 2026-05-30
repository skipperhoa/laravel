### Đầu tiền chúng ta cần kiểm tra file .env 
```
SESSION_DRIVER=database
```
### Sau đó chạy lệnh tạo table "sessions"

```
php artisan make:session-table
php artisan migrate
```
Workflow Google Authenticator (TOTP)
    Người dùng đăng ký hoặc bật tính năng 2FA.
    Hệ thống tạo một secret key duy nhất cho người dùng.
    Hệ thống hiển thị QR Code chứa secret key.
    Người dùng quét QR Code bằng ứng dụng Google Authenticator.
    Ứng dụng lưu secret key và tạo mã OTP 6 chữ số mới mỗi 30 giây.
    Khi đăng nhập:
    Người dùng nhập email và mật khẩu.
    Hệ thống xác thực thông tin đăng nhập.
    Hệ thống yêu cầu mã OTP từ Google Authenticator.
    Người dùng nhập mã OTP.
    Hệ thống kiểm tra mã OTP.
    Nếu mã hợp lệ → cho phép đăng nhập.
    Nếu mã không hợp lệ → từ chối đăng nhập.
------------------
1 Người dùng bật tính năng 2FA.
2 Hệ thống tạo secret key.
3 Hệ thống hiển thị QR Code.
4 Người dùng quét QR Code bằng Google Authenticator.
5 Ứng dụng tạo mã OTP.

Đây được gọi là quá trình kích hoạt (enrollment/setup) 2FA.

Tuy nhiên, sau khi quét QR Code, thông thường còn một bước nữa:

6 Người dùng nhập mã OTP đầu tiên từ Google Authenticator.
7 Hệ thống xác thực mã OTP.
8 Nếu hợp lệ → đánh dấu 2FA đã được kích hoạt thành công.


Enable 2FA
    ↓
Generate Secret Key
    ↓
Display QR Code
    ↓
User scans QR Code
    ↓
User enters OTP code
    ↓
Verify OTP
    ↓
2FA Activated
--------------------
User Login
    ↓
Nhập Email + Password
    ↓
Kiểm tra Email + Password
    ↓
Hợp lệ?
    ├─ Không → Báo lỗi
    └─ Có
         ↓
Kiểm tra user có bật 2FA không?
         ↓
         ├─ Không → Đăng nhập thành công
         └─ Có
              ↓
         Yêu cầu nhập OTP
              ↓
         Kiểm tra OTP
              ↓
         Hợp lệ?
              ├─ Không → Báo lỗi
              └─ Có → Đăng nhập thành công
----------------
Installing
Use Composer to install it:

composer require pragmarx/google2fa

To generate inline QRCodes, you'll need to install a QR code generator, e.g. BaconQrCode:

composer require bacon/bacon-qr-code
