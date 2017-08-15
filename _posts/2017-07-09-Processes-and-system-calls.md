---
layout: article 
title: "Process and system call "
date: 2017-07-09
tag: notes
---
# System Call

Trên hệ điều hành Linux, thì người dùng muốn giao tiếp với kernel thì cách đơn giản nhất là sử dụng terminal.

```
No program can run on the system without the kernel loading it into memory.
The kernel creates processes and makes sure they get the resources they need.
The kernel also watches for processes thatbecome too greedy or crash.
```
Memory sẽ lưu trữ ở RAM. Ngoài ra kernel còn sử dụng **driver** để giao tiếp với các thiết bị phần cứng như chuột, bàn phím, màn hình, headphone.

Kernel được xem như là trái tim của hệ điều hành.

Mọi thao tác copy, cut mà người dùng thực hiện thông qua bàn phím hoặc chuột sẽ được gọi đến kernel từ đó kernel thực hiện các yêu 
cầu mà người dùng đưa ra. Vậy nên việc giao tiếp với kernel giúp người dùng kiểm soát được máy tính của mình.

Ngoài terminal thì ta có thể dùng system call để giao tiếp với kernel. Về cơ bản system call là một hàm nằm bên trong kernel.

Ví dụ:
```
system("ls")
```
Hàm trên dùng để liệt kê các file ử thư mục hiện tại.

Cấu trúc hàm: system("lệnh đưa ra")

Lệnh đưa ra có thể dùng những lệnh cơ bản khi sử dụng trên terminal.

Khi người dùng gọi hàm *system()* thì hệ điều hành sẽ thông dịch lệnh mà system gọi sau đó chạy hàm hàm exec() trong kernel tương ứng. 

Đối với hàm exec() thì khi chạy lên thì hàm exec() sẽ thay thế process hiện tại bằng một chương trình mà hàm exec() gọi. Để quản lý được hết các process thì hệ điều hành sẽ track mỗi process bằng một số được gọi là process identifer(PID). Bạn có thể dùng lệnh *ps -ef* trên terminal để xem các process đang chạy trên hệ điều hành.

Để chạy một chương trình thì hệ điều hành có thể sử dụng thêm tham số (command line arugment) và biến môi trường(environment variables) - như ở bài trước đã đề cập đến biến môi trường dẫn path đến dynamic library LD_LIBRARY_PATH. 

Hàm exec() gồm nhiều biến thể khác nhau:
- execl(): exec + list of arguments
```
excel("ps","ps","-ef",NULL)
```
Sử dụng NULL để kết thúc arguments được truyền vào.

- execle(): exec + list of arguments + evironment variables
```
char *env_val[] = {"LD_LIBRARY_PATH=./libs",NULL};
execle("ps","ps","-ef",NULL,env_val);
```
- excv: exec + vector of arguments (array of string arguments)
```
char *vec_arg[] = {"/bin/ps","-ef",NULL};
execv("/bin/ps",vec_arg)
```
Sử dụng vector variable thay vì list variable, sử dụng chính xác địa chỉ chương trình cần chạy 

- excvp: exec + vector of arugments (on PATH environment variable);
```
char *vec_arg[] = {"ps","-ef",NULL};
excvp("ps",vec_arg)
```
Chương trình cần chạy sẽ được kiếm trong các địa chỉ thuộc biến môi trường PATH. Sử dụng *echo $PATH* để xem các địa chỉ các đường dẫn.

Như vậy hàm exec() có thẻ đi kèm với các chữ cái sau:
- l : list of arguments.
- e: evironment variables.
- v: vector of arguments.
- p: search the path.

Để quản lý lỗi khi thực hiện gọi hàm ta có thể dùng errno trong errno.h để quản lý. Trong đo:
- EPERM=1 Operation not permitted
- ENOENT=2 No such file or directory
- ESRCH=3 No such process
- EMULLET=81 Bad haircut -> This value not available on all systems.

Để có thể xem thông báo lỗi có thể sử dụng hàm *strerror(errno)*

# Processes 
Mỗi chương trình chạy độc lập trên hệ điều hành chính là các process được hệ điều hành quản lý dựa vào PID cả mỗi process.

Mỗi chương trình khi khởi chạy thì sẽ tạo ra process mới để chạy chính chương trình đó. Vậy nên khi sử dụng hàm system() hay exec() thì chương trình hiện tại sẽ gọi chương trình mới thay thế chương trình hiện tại, hay process của chương trình hiện tại sẽ chấm dứt để thay thế cho process mới được tạo thông qua lời gọi hàm.

Nhưng nếu muốn giữ process hiện tại khi chạy một chương trình mới khi gọi hàm exec() thì sao? Ta có thể tạo mới process từ process hiện tại và chạy chương trình mới trên process vừa mới tạo, như vậy ta có thể giữ được process hiện tại. Tại thời điểm sẽ có hai process là process hiện tại(X) và process vừa mới tạo ra gọi là Y.

Trên các hệ điều hành UNIX ta có thể dùng hàm fork() để clone từ process hiện tại ra một process mới. 

```
//Tạo mới process 
pid_t pid = fork()
//Chạy chương trình mới trên process mới.
execle("/bin/ps","/bin/ps","-ef",NULL)
```
Khi tạo mới một process thì các chương trình được gọi sẽ chạy trên process mới tạo ra(đúng hơn là chương trình mới thay thế process vừa mới tạo). Nếu tạo không thành công thì chương trình mới sẽ thay chương trình hiện tại.

Vừa tạo mới process làm mình hình dung đến việc phân bào của tế bào:

![Tế bào](http://sohanews.sohacdn.com/k:2016/2-shutterstock-260844854-1452567618912-1452584719808/chung-ta-se-khong-ton-tai-neu-su-kien-nay-khong-xay-ra-vao-600-trieu-nam-truoc.jpg)

```
Every process will contain the program it’s running, as well as
space for stack and heap data.
```

Thỉnh thoảng thì đôi khi process kết thúc nhưng process con(process được fork) vẫn chưa kết thúc. Như vậy để cho process cha chờ cho đến khi process kết thúc ta có thể dùng hàm waitpid(pid,pid_status,options) để chờ cho đến khi process con kết thúc rồi process cha mới dừng.

Mỗi process khi bắt đầu chạy thì cũng có kết thúc đôi khi bạn có thể dùng tổ hợp phím Ctrl+c để dừng process khi đó process trở nên process dead. Trong C bạn cũng có thể customize lại khi một chương trình bị dừng lại. Đôi khi một chương trình bị crash và bạn muốn làm sạch như đóng kết nối mạng hay database từ khi bị interupt thì bạn có làm gọn gàng trường khi exit chương trình.

# Redirect 

Redirect của một chương trình là một cách chuyển hướng luồng Input Output của một chương trình. Khi bạn chạy chương trình command line bạn có thể dùng kí hiệu > để redirect tới một file thay vì in ra màn hình.

Ví dụ:
```
ps -ef > process.txt
```
Thì thay vì in ra màn hình thì kết qủa sẽ được lưu vào file process.txt.

Như vậy > để redirect output của chương trình, và < để redirect input vào chương trình.

Đối với mỗi process khi đang chạy thì sẽ có luồng dữ liệu ra vào của chương trình (data stream). Có 3 kiểu luồng dữ liệu mặc định là:
- Standard Output
- Standard Input
- Standard Error

Ở trong c hàm fprintf(datastream,string), ở trong fprintf thì ta có thể chọn các tham số cho luồng in ra gồm: stdout, stderr. Mặc định của hàm printf là stdout tức là in ra màn hình.

Trong một process, hệ điều hành sử dụng *file descriptor* để quản lý data stream của một process và sử dụng *descriptor table*  để đánh dấu data stream. Thông thường thì descriptor table có cấu trúc như sau:

|#|Data Stream|
|-|:----------:|
|0|The keyboard(Standard input)|
|1|The screen (Standard output)|
|2|The screen (Standard error)|
|3|Database connection (Open another stream like open file)|

Như vậy một chương trình khi chạy ngoài 3 chuẩn IO thì có thêm một kết nối đến luống dữ liệu khác, như database, hay network chẳng hạn.

Như vậy việc redirect data đơn giản chỉ là việc chuyển hướng slot data stream đến một chuẩn khác. Như ví dụ ở trên chạy command line liệt kê các process đang chạy trên hệ điều hành.

![terminal](https://user-images.githubusercontent.com/8192210/27999720-188006d2-654a-11e7-9f5b-b0945a979563.png)

Trên hình trên thì kết qủa sẽ được in ra màn hình, ta cũng có thể chuyển hướng kết qủa in ra màn hình vào một file thì khi đó descriptor file của chương trình ps sẽ như thế này.

|#|Data Stream|
|-|:----------:|
|0|The keyboard|
|1|~~The screen~~ file.txt|
|2|The screen |
|3|file.txt|

![redirect](https://user-images.githubusercontent.com/8192210/27999768-b58bdd98-654a-11e7-807d-0d06235e8f40.png)

Như vậy data stream stdout sẽ thay thế bằng một file.

Ngoài ra ta có thể chuyển kèm theo số slot trên *table descriptor*

```
ps -ef > file.txt 2> error.txt
```
Trong đó > là chuyển hương output, ở đây ta thêm số 2> error.txt dựa vào *table descriptor* thì 2 chính là slot error và ta sẽ chuyển tất cả các thông báo lỗi vào một file có tên là error.txt.

Đó cách redirect ta thường hay gặp khi dùng command line.

Còn đối với redirect một process chứa chương trình thì sao? Hay chỉnh bản thân chương trình tự redirect thì sao?

Ta có thể dùng hàm fileno() để xem descriptor value. Ví dụ:
```
FILE *f  =open("file.txt","r");
int descriptor = fileno(f);
```
descriptor sẽ trả về gía trị 3 tức là data stream đang trỏ đến file file.txt của chương trình đang chạy đoạn code trên.

Ta có thể dùng hàm dup2() để thay thế slot của description table.
```
dup2(fileno(f),1);
```
Tức là được data stream của file.txt lên slot 1 tức là slot của stdout. Khi đó table descriptor sẽ như sau:

|#|Data Stream|
|-|:----------:|
|0|The keyboard|
|1|~~The screen~~ file.txt|
|2|The screen |
|3|file.txt|

Giống như khi khi chuyển hướng output của ps -ef ở trên.

Ví dụ:
```
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(){
    FILE *f = fopen("file.txt","w");
   
    dup2(fileno(f),1);

    fprintf(stdout,"This will store in file.txt");
    return 0;
}
```
Như vậy việc in ra sẽ được lưu ở file.txt.

Đôi khi có những chương trình mà process cha "đẻ" ra nhiều process con mà process cha cần lấy kết qủa của process con để xử lý thì ta phải làm gì để kết nối data stream giữa cha và con. Đó là sử dụng hàm pipe() (ông nối) về cơ bản thì hàm này tạo ra một ống nối có hai đầu là đầu ghi kết qủa vào đầu đọc kết qủa ra như xử lì FIFO dữ liệu.

Khai báo pipe()
```
int fd[2];
if (pipe(fd)== -1){
    fprintf(stderr,"Cannot create the pipe");
}
```
fd[2] là mảng mô tả ống có 2 đầu ra và vào. Trong đó được quy định là fd[1] là ghi dữ liệu vào ống và fd[0] là đọc dữ liệu từ ống.

Gỉa sử ta có hai process là process cha và process con, process cha muốn đọc dữ liệu mà process con in ra màn hình.

Đối với process con. Lúc này table descriptor trên process con sẽ là:
|#|Data Stream|
|-|:----------:|
|0|The keyboard|
|1|The screen|
|2|The screen |
|3|Read data stream from pipe|
|4|Write data stream to pipe|

Để process con truyền dữ liệu vào đường ống thì ta phải đóng ngăn không cho đọc dữ liệu từ ống khi viết vào ống(không thể vừa đọc vừa viết được) và redirect vv ông lên slot hiển thị ra màn hình. Lúc này table descriptor sẽ trở thành như sau. 
|#|Data Stream|
|-|:----------:|
|0|The keyboard|
|1|~~The screen~~ Write data stream to pipe|
|2|The screen |
|3|~~Read data stream from pipe~~|
|4|Write data stream to pipe|

Code:
```
dup2(fd[1],1);
close(fd[0]);
```

Đối với process cha thì table descriptor lúc đầu là:
|-+-----------|
|#|Data Stream|
|-|----------:|
|0|The keyboard|
|1|The screen|
|2|The screen |
|3|Read data stream from pipe|
|4|Write data stream to pipe|

Và để process cha đọc được dữ liệu từ pipe thì ta phải đóng slot viết vào ống và chuyển slot đọc ống vào slot stdin của process cha. Khi dó:
|#|Data Stream|
|-|:----------:|
|0|~~The keyboard~~ Write data stream to pipe|
|1|The screen|
|2|The screen |
|3|Read data stream from pipe|
|4|~~Write data stream to pipe~~|

code:
```
dup2(fd[0],0
close(fd[1]);
```

Ví dụ:
```
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main(){
   
    int fd[2];
    if(pipe(fd) == -1){
        fprintf(stderr,"Cannot create the pipe\n");
    }

    //Create child process
    pid_t pid = fork();
    if(pid == -1) {
        fprintf(stderr,"Cannot fork new process\n");
    }
    if(!pid){
        //Redirect output child process to pipe
        dup2(fd[1],1);
        close(fd[0]);
        fprintf(stdout,"Redirect this line into pipe");
    }

    dup2(fd[0],0);
    close(fd[1]);

    char result_child[255];
    //Read from stdin of parent process
    fgets(result_child,255,stdin);
    puts("Parrent child\n");
    fflush(stdout);//Clean buffer output
    puts(result_child);
}
```

Tạo ra proces con pid, tại process này sẽ in ra dòng "Redirect this line into pipe", nhưng thay vì in ra nó sẽ được đưa vào pipe và truyền về lại process cha. Process sẽ in ra kết qủa nhận từ process con.

Sử dụng fflush để xóa bộ nhớ đệm khi in ra tại slot 1(stdout). Nếu không dùng fflush thì kết qủa khi in ra message của process con sẽ là Redirect this line into pipeParrent child . Do lúc đầu in chuỗi "Parrent child" sẽ vẫn còn nằm bộ nhớ đệm của slot 1(stdout) nên ta cần làm sạch bộ nhớ đệm tại slot này.

Việc close và dup2 trước và sau có ảnh hưởng gì đến việc đọc và ghi ở trên pipe không? Câu trả lời là có nên nhớ chuyển hướng đầu này của ống trước khi đóng đầu kia của ống.











