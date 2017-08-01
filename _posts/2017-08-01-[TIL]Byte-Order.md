# Byte order là gì?

Byte order la thứ tự mà mà các bits được lưu trữ trên bộ nhớ. Trong đó có hai dạng byte order là Big Endian và Littel Endian.

Các lưu thứ tự byte khác nhau:

![Byte order](http://src.aalto.fi/c-en/static/pics/byte-order.jpg)

## Big Endian 

Trọng số cao của bit sẽ được lưu tại địa chỉ bộ nhớ thấp, và trọng số thấp của bit sẽ được lưu tại địa chỉ có bộ nhớ cao.

Vậy trọng số cao là gì? Trọng số cao (most significant bit hay high order bit) là vị trí mà tại vị trí cho gía trị lớn nhất. 
Ví dụ: 4 byte gía trị: 0xACDC1A2B (4 byte được biểu diễn dưới dạng hex). Khi đó trọng số cao nhất của 4 byte trên lại tại vị trí đầu
tiên từ trái sang:

```
0xACDC1A2B
  ^
 Đây là vị trí có trọng số cao nhất , tại vị trí này gía trị sẽ là 0xACDC1A2B

0xACDC1A2B
         ^
         Đây là vị trị có trọng số thấp nhất, tại vị trí này sẽ là 0xB
```

Như vậy nếu 4 byte trên khi lưu ở trên bộ nhớ sẽ có thứ tự như sau:

|Địa chỉ bộ nhớ| 0x00 | 0xFF | 0xFFFF | 0xFFFFFF|
|--------------|------|------|--------|---------|
|Byte order    | AC   | DC   | 1A     | 2B      |

## Little Endian

Trọng số cao được lưu tại đại chỉ bộ nhớ cao, trọng số thấp được tại địa chỉ có bộ nhớ thấp.

Như vậy 4 byte khi lưu ở trên bộ nhớ theo littel endian là như sau.

|Địa chỉ bộ nhớ| 0x00 | 0xFF | 0xFFFF | 0xFFFFFF|
|--------------|------|------|--------|---------|
|Byte order    | 2B   | 1A   | DC     | AC      |

## Biết mấy cái này để làm gì?

Mục đích là giúp cho lập trình viên biết cách để đọc cho đúng thứ tự hay việc truyền dữ liệu byte đúng thứ tự trong các trường hợp 
hàm yêu cầu đúng thứ tự. Hồi trước mình hay dùng để tạo ảnh từ raw data (byte) nên biết được thứ tự để tránh nhầm ngược màu ảnh 
thì phải biết byte order của những byte để đưa vào hàm xử lý thích hợp.

Thường thì các kiến trúc dựa vào Intel thì sẽ lưu theo dạng Little Endian, còn Big Endian thì lưu ở các thiết bị mạng hay giao thức mạng.

Trong C có các hàm htonl(),htons(),ntohs(),ntohl() có nghĩa là **h**ost **t**o **n**etwork **l**ong. Do thứ tự byte khác nhau giữa 
host và card mạng khác nhau nên dùng các hàm trên để chuyển dữ liệu cho thích hợp khi đóng gói byte để truyền tải từ máy này sang máy khác

Host sang network trước khi đi vào dây mạng và sau dó chuyển lại từ network sang host. 
