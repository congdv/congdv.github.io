
# Protocol
```
A protocol always has a strict set of rules. As long as the client and
the server both follow those rules, everything is fine. But if one of
them breaks the rules, the conversation usually stops pretty abruptly.
```

# How the server talk to the client

Trong c sử dụng data stream để đọc ghi file hay chuẩn IO thông thường, nhưng để giao tiếp thông qua network có một kiểu data stream như vậy gọi là socket. 
```
int listener_d = socket(PF_INET, SOCK_STREAM, 0);
```
Để server có thể nói chuyện được với client thông qua socket thì sẽ có bốn giai đoạn cần nhớ: Bind, Listen,Accep,Begin.
- Bind: bind to a port - Trên một server có thể chạy nhiều dịch vụ như web page, mail, chat server,vậy nên để tránh nhầm lẫn giao tiếp giữa các dịch vụ mỗi server dùng port(cổng) để phân biệt các dịch vụ cơ bản như cổng 80 (http), 21 (telnet). Mỗi cổng giống như mỗi kênh trên tivi dùng số để đánh dấu kênh này với kênh kia. Port dùng 2 byte để lưu nên số cổng có thể nằm từ 0 đến 65535(2^16), trong đó cổng nhỏ hơn 1024 thừơng sử dụng cho admin của hệ thống.

Bind chương trình vào công 30000
```
#include <arpa/inet.h>
...
name.sin_family = PF_INET;
name.sin_port = (in_port_t)htons(30000);
name.sin_addr.s_addr = htonl(INADDR_ANY);
int c = bind (listener_d, (struct sockaddr *) &name, sizeof(name));
```
- Listen: là một system call() để có thể giới hạn số lượng client khi lắng nghe để giao tiếp:

Giới hạn số lượng client là 10.

```
listen(listener_d, 10);
```

- Accept: Accept a connection - Chấp nhận kết nôí đến server và chuẩn bị giao tiếp với server.

```
//Create client for store address of client 
struct sockaddr_storage client_addr;
unsigned int address_size = sizeof(client_addr);

int connect_d = accept(listener_d, (struct sockaddr *)&client_addr, &address_size);
```

- Begin talking: Bắt đầu gửi thông điệp đến client:

```
char *msg = "Hello world!\r\n> ";
if (send(connect_d, msg, strlen(msg), 0) == -1)
error("send");
```

Sau khi gửi chúng ta cần phải đọc nội dung mà client gửi lên thì ta sử dụng hàm:
```
int c = recv(socket, s, slen, 0);
```
Trong đó S là chuổi và slen là độ dài,

Sau đây là hai ví dụ về hàm gửi và đọc tin.

Gửi tin 
```
//Send a string 
int say(int socket, char *s)
{
  int result = send(socket, s, strlen(s), 0);
  if (result == -1)
  fprintf(stderr, "%s: %s\n", "Error talking to the client", strerror(errno));
  return result;
}
```

Đọc tin 
```
int read_msg(int socket,char *buf,int len){
   char *s = buf;
   int slen = len;
   int c = recv(socket,s,slen,0);
   //until end of line
   while( c > 0 && s[c -1]!='\n' ){
       //next character for store
      s += c;
        //min size for store
      slen -= c;
      //Read and store to s and return length of string.
      c = recv(socket,s,slen,0);
   }

    if(c < 0)
        return c;
    else if (c == 0)
        buf[0] = '\0';
    else 
        s[c-1] = '\0';
    return len - slen;

}
```

- Để Server có thể phục vụ một lần nhiều client thì mỗi lần giao tiếp với server thì tạo một process phục vị riêng cho mỗi client. Dùng fork() để tạo ra child process sau đó bắt đầu gửi thông điệp trên process con này. 

# How to client talk to server

- Connect to a remote port: tạo socket kết nối đến dịa chỉ ip và port của server. 

Tạo socket kết nối đến địa chỉ ip chính xác của server:

```
int s = socket(PF_INET, SOCK_STREAM, 0);
struct sockaddr_in si;
memset(&si, 0, sizeof(si));
si.sin_family = PF_INET;
si.sin_addr.s_addr = inet_addr("127.0.0.1");
si.sin_port = htons(80);
connect(s, (struct sockaddr *) &si, sizeof(si));
```

Một số trường hợp thì kết nối đến tên miền ví dụ như google.com, thì cần dùng hàm lấy địa chỉ ip của tên miền như cách DNS xác định địa chỉ của tên miền.

```
#include <netdb.h> // Lấy địa chỉ của tên miền.

...
struct addrinfo *res;
struct addrinfo hints;
memset(&hints, 0, sizeof(hints));
getaddrinfo() expects
hints.ai_family = PF_UNSPEC;
the port to be a string.
hints.ai_socktype = SOCK_STREAM;
getaddrinfo("www.google.com", "80", &hints, &res);
```

- Begin talking: Bắt đầu giao tiếp như cách giao tiếp trên của server.


# Note 

- *Telnet is a simple network.*



