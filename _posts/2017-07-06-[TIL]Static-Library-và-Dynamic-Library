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
 
 # Tạo thư viện
 
 # Static Library và Dynamic Library.
 
 
