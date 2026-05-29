### Đầu tiền chúng ta cần kiểm tra file .env 
```
SESSION_DRIVER=database
```
### Sau đó chạy lệnh tạo table "sessions"

```
php artisan make:session-table
php artisan migrate
```

