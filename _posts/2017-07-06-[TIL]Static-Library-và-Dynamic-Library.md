# Đặt Vấn Đề
Ta có chương trình muốn hiển thị ra thông tin sức khỏe của khách hành đến chạy bộ tại phòng Gym bao gồm: Cân nặng, quãng đường chạy bộ, cùng với một hệ 
số đặt biệt để tính lượng calo tiêu hao của khác hàng. 


# Chương trình:

**calo.c:**
```
#include <stdio.h>
#include "calo.h"

void hienThiCalo(float canNang,float quangDuong,float heso){
    printf("Can nang la: %3.2f kg\n",canNang);
    printf("Quang duong la: %3.2f km\n",quangDuong);
    printf("Tieu Hao Nang Luong: %4.2f calo\n",heso * canNang * quangDuong);
}
```

Việc sử dụng ``` #include "calo.h" ``` nếu như thư viện hiện tại đang ở thư mục ngoài thư mục /usr/lib của hệ điều hành và bạn cần thêm tham số đến chính xác dường dẫn với tham số -I duong/dan , mục đích là giúp trình biên dịch tìm kiếm thư mục thư viện được chính xác. Nếu bạn dùng ```#include <calo.h>``` thì thư viện phải nằm trong thư mục /usr/lib trình biên dịch sẽ tìm kiếm tại đường dẫn này trường hết.

Theo đoạn code trên chứa hàm hienThiCalo hàm này sẽ được khai báo tại file **calo.h**:

```
#ifndef CALO_H
#define CALO_H
void hienThiCalo(float canNang,float quangDuong,float heso);
#endif // CALO_H 
```

Tại sao phải tách ra header file và source file? Việc dùng header file sẽ dùng cho các chương trình giảm kích thước của chương
trình muốn include hàm của thư viện calo ở trên. Khi mà chương trình include "calo.h" thì chỉ có tên hàm cần khai báo và không cần
thân hàm. Khi biên dịch thì trình biên dịch sẽ tìm kiếm thân hàm và biên dịch cùng chương trình chính.

Như vậy ta đã có được thư viện calo.h 

Chương trình main.c:

```
#include "calo.h"

int main(){
    hienThiCalo(80,10.3,0.79);
    return 0;
}
```

# Biên dịch chương trình trên Linux.

Cách mà một chương trình C được biên dịch như sau:

![Compile](http://www.aboutdebian.com/compile.gif)

 Đầu tiên source code file  sẽ được dịch sang obj file, sau đó object file sẽ link tới thư viện được cần và tạo ra file execute.
 
 Để biên dịch chương trình trên thì gồm các bước sau:
 
 - Tạo các file object cho calo.c và main.c
 
 ```
 gcc -c calo.c -o calo.o
 ```
  ```
 gcc -c main.c -o main.o
 ```
 
 - Tạo fle excutable từ các file object.
 ```
 gcc main.o calo.o -o main 
 ```
 
 Kết qủa in ra khi chạy: ./main 
 ```
Can nang la: 80.00 kg
Quang duong la: 10.30 km
Tieu Hao Nang Luong: 650.96 calo
 ```
 
 Thay vì biên dịch source code ra từng file object thì ta có thể nén những file object cần thiết thành file nén đúng hơn là thư viện.
 # Static Library và Dynamic Library.
 Trong C sẽ bao gồm hai thư viện là thư viện tĩnh và thư viện động. Trong đó, thư viện tĩnh là thư viện gồm các file object được biên dịch và yêu cầu đúng như khi chạy chương trình lên, thư viện cố định lúc biên dịch và cả chạy chương trình. Với thư viện động thì linh hoạt hơn việc biên dịch và việc chạy có thể không phụ thuộc nhau tức là có thể thay đổi cấu trúc thư viện miễn sao vẫn đáp ứng tên các hàm cần thiết.
 
 ## Static Library: 
 Đối với thư viện tĩnh thì cấu trúc tên thư viện như sau: 
 - Trên Linux: lib+tên thư viện +.a 
 - Trên Windows: lib+tên thư vện +.lib 
 
 Chuyển calo.c thành thư viện để sử dụng:
 - Tạo thư mục chứa thư viện:
 ```
 mkdir libs
 ```
 
 - Chuyển calo.o thành libcalo.a (thư viện)
 ```
 ar -rcs ./libs/libcalo.a calo.o
 ```
 Về cơ bản thì libcalo.a như một file nén các file object lại và ar -rcs là chương trình dùng để nén như Zip chẳng hạn.
 
 Như vậy ta đã có thư viện libcalo.a. Bắt đầu biên dịch thư viện với chương trình chính:
 
 ```
 gcc main.c -L./libs -lcalo -o main
 ```
 Với -L là địa chỉ cần linker đến thư viện cần tìm. ** Trong linux thì trình biên dịch mặc định lấy đường dẫn thư viện tại /usr/lib là thư mục chứa thư viện của hệ thống, còn /usr/local/lib là những thư viện được cài vào bên thư ba của các chương trình cần thiết. ** và -lcalo là tên thư viện cần dùng vậy nên để có thể tìm được thư viện bạn cần đặt tên thư viện theo cấu trúc sau: 
 lib+tên thư viện +.a .
 
 Gỉa sử chương trình muốn hiển thị cho những khách hàng ở Mỹ thì ta cần đổi sang hệ thống đo lường khác như km sang miles và kg sang lbs.
 
Vậy ta sẽ sửa lại calo.c thành một file mới calo_us.c như sau:


**calo_us.c:**
```
#include <stdio.h>
#include "calo.h"

void hienThiCalo(float canNang,float quangDuong,float heso){
    printf("Can nang la: %3.2f lbs\n",canNang * 2.2046);
    printf("Quang duong la: %3.2f miles\n",quangDuong / 1.609344);
    printf("Tieu Hao Nang Luong: %4.2f calo\n",heso * canNang * quangDuong);
}
```
Vậy ta phải biên dịch ra thư viện từ đầu rồi mới sử dụng file này:
```
gcc -c calo_us.c -o calo_us.o
ar -rcs ./libs/libcalo.a calo_us.o
gcc main.c -L./libs -lcalo -o main
```
 
 Để check các file objects được tạo thành thư viện thì dùng command sau: nm ./libs/libcalo.a 
 Nếu bạn biên dịch chồng lên thư viện từ thư viện trước thì kết qủa như sau:
 ```
 calo.o:
0000000000000000 T hienThiCalo
                 U printf

calo_us.o:
0000000000000000 T hienThiCalo
                 U printf
 ```
 Như vậy sẽ có hai file object đã cấu thành nên thư viện này là calo.o (cũ ) và calo_us.o(mới). Nhưng khi chạy main thì chương trình không thay đổi do dùng file calo.o cũ. Vậy nên muốn sử dụng object mới bạn nên xóa thư viện vào biên dịch lại khi đó:
 
``` 
nm ./libs/libcalo.o
calo_us.o:
0000000000000000 T hienThiCalo
                 U printf
```

Vậy nên kết qủa sẽ như sau:
```
Can nang la: 176.37 lbs
Quang duong la: 6.40 miles 
Tieu Hao Nang Luong: 650.96 calo
```
 
 Như vậy mỗi lần bạn cần thay đổi thư viện thì bạn cần phải biên dịch toàn bộ chương trình. Nếu ta có thể tách riêng ra thư viện chạy độc lập với chương trình và không cần biên dịch toàn bộ chương trình thì sao? Vì vậy nên shared library ra đời đúng hơn là dynamic library.
 
 ## Dynamic Library:
 
 Về cơ bản thì để sử dụng thư viện thì chương trình dùng linker để liên kết lại thành phần cần thiết lại để chạy gồm có linker compile và linker run time. Trong đó linker compile là việc liên kết các file cần thiết khi biên dịch và linker runtime là liên kết lúc chạy chương trình đến thư viện. Đối với static library thì hai liên kết này sẽ tĩnh(thư viện liên kết mặc định ngay từ đầu ). Còn đối với Dymamic Library thì dùng thư viện lúc compile và runtime có thể khác nhau, điều này giúp cho việc cập nhật và triển khai trên chương trình lớn được dễ dàng mà không cần biên dịch lại toàn bộ chương trình. 
 
 Để file object có thể tạo thư viện động thì khi biên dịch thành object thì cần thêm tham số: -fPIC (Position-independent code : đối với khái niệm này thì mình cũng chưa hiểu rõ về nó).
 
 ```
 gcc -fPIC -c calo.c -o calo.o
 ```
 
 Tạo thư viện động, đối với quy tắt đặt tên dynamic library như sau:
 - Trên windows: tên thư viện +.dll như calo.dll 
 - Trên Linux: lib + Tên thư viện + .so 
 ```
 gcc -shared calo.o -o ./libs/libcalo.so 
 ```
 
 Biên dịch chương trình chính:
 ```
 gcc main.c -L./libs -lcalo -o main
 
 ./main 
 ```
 Chương trình sẽ báo lỗi này nếu bạn dùng Linux:
 ```
 ./main: error while loading shared libraries: libcalo.so: cannot open shared object file: No such file or directory
 
 ```
 
 Khi lấy thư viện thì hệ điều hành sẽ lấy mặc định tại thư mục /usr/lib nếu thư viện nằm ngoài thư mục trên thì bạn cần khai báo đường dẫn vào biến môi trường: LD_LIBRARY_PATH.
 
Để khai báo ta sử dụng lện sau:
```
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:./libs
```
Sau đó chạy ./main thì chương trình in ra là :
```
Can nang la: 80.00 kg
Quang duong la: 10.30 km
Tieu Hao Nang Luong: 650.96 calo
```

Bây giờ tau thử update calo_us.c vào thư viện thì ta dùng các lệnh sau:
```
gcc -fPIC -c calo_us.c -o calo_us.o
gcc -shared calo_us.o -o ./libs/libcalo.so
./main
```

Chương trình sẽ hiển thị ra:
```
Can nang la: 176.37 lbs
Quang duong la: 6.40 miles 
Tieu Hao Nang Luong: 650.96 calo
```
Như vậy ta không cần phải biên dịch toàn bộ chương trình với thư viện trên.

