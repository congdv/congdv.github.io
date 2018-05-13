---
date: '2018-05-13 17:12 +0700'
layout: article
published: false
title: Sử dụng ubuntu subsytem để lập trình web trên win 10
---
Mình dùng Terminal và vim trên Ubuntu để code, còn browser trên win 10 để chạy file html.

## Mở file trực tiếp
Để có thể mở file dữ liệu ubuntu thì ta cần phải nhớ directory của ubuntu trên win mà cái này rất chi là dài. Có thể xem hướng dẫn [tại đậy](https://www.howtogeek.com/261383/how-to-access-your-ubuntu-bash-files-in-windows-and-your-windows-system-drive-in-bash/)
## Chạy server trên ubuntu subsystem
- Chạy một local server tại thư mục chứa file index.html trên Ubuntu.
```
> python -m SimpleHTTPServer
```
Lúc này sẽ có một server được mở trên Ubuntu và port mặc định là 8000, có thể tùy chọn thay đổi port bằng:
```
> python -m SimpleHTTPServer 3333
```
- Tuy nhiên để có thể chạy file html trên Ubuntu ta phải biết địa chỉ IP của ubuntu.
```
> ifconfig 
```
Lúc này có hàng loạt thông tin hiện ra trên terminal, ta xem mục `inet addr:192.168.0.99`, và `192.168.0.99` là địa chỉ của ubuntu. 

Như vậy ta đã biết địa chỉ và sever trên ubuntu đã khởi chạy.

Lúc này quay lại win 10 mở trình duyệt lên rồi nhập địa chỉ file cần mở.
```
192.168.0.99:8000/index.html
```
- 192.168.0.99 là địa chỉ ip.
- 8000 là port
- /index.html là path đến file cần mở. Lưu ý folder chứa file này chính là vị trí folder mà ta khở chạy server ở bước trên hết.

Ta có thể alias địa chỉ local 192.168.0.99 đến tên miền sao cho dễ nhớ bằng cách sửa lại file `C:\WINDOWS\system32\drivers\etc\hosts` bằng cách thêm dòng `192.168.0.99 ubuntuserver`