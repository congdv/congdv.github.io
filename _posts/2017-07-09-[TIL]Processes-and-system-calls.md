# System Call

Trên hệ điều hành Linux, thì người dùng muốn giao tiếp với kernel thì cách đơn giản nhất là sử dụng terminal.

```
No program can run on the system without the kernel loading it into memory. The kernel creates
processes and makes sure they get the resources they need. The kernel also watches for processes that
become too greedy or crash.
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



# Processes 

# Redirect 
