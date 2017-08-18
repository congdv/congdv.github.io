---
layout: article
title: Network in C
tag: notes
published: true
date: 2017-07-10
---

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

# Slightly Advanced Techniques
Sử dụng thêm các kĩ thuật nâng cao để giaỉ quyết vấn đề khi server chờ cho client phản hồi lại rồi tiếp tục xử lý tiếp. Giả sử server chờ recv() từ client như mãi không thấy nhận data để send() data tiếp theo cho client. Như vậy một là server sẽ chờ vô hạn và ảnh hưởng tới một loạt xử lý tiếp theo cho xử lý này. 

## Blocking 
Kĩ thuật dùng để block listener socket trên server cho tới khi data mà client gửi tới

```
#include <unistd.h>
#include <fcntl.h>
.
.
.
sockfd = socket(PF_INET, SOCK_STREAM, 0);
fcntl(sockfd, F_SETFL, O_NONBLOCK);
```

## select()—Synchronous I/O Multiplexing
Hàm select() rất thú vị và mình rất chật vật để có thể hiểu phần nào đó về nó.

Nó sử dụng file descriptor để quản lý và chờ đợi cho đến khi server accept() một kết nối từ client đến server và sử dụng một file escriptor để lưu trữ cho nó. Mỗi lần client kết nối tới server thì gía trị descriptor sẽ tăng lên một và dựa vào gía trị tương ứng để đánh dấu kết nối của client nào.

Phần code dưới đây giúp mình biết được dùng select() như thế nào.
```
/*
 * selectserver.c -- a cheezy multiperson chat server
 http://beej.us/guide/bgnet/examples/selectserver.c
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <arpa/inet.h>
#include <netdb.h>

#define PORT "9034"

void *get_in_addr(struct sockaddr *sa){
    if(sa -> sa_family == AF_INET){
        //IPv4
        return &(((struct sockaddr_in*)sa)->sin_addr);
    }

    return &(((struct sockaddr_in6 *)sa)->sin6_addr);
}

int main(void)
{
    fd_set master; // master file description list
    fd_set read_fds; // temp file description
    int fdmax; // maximum file description number


    int listener;
    //newly accept()ed socket description
    int newfd;
    struct sockaddr_storage remoteaddr;//client address
    socklen_t addrlen;

    char buf[256];
    int nbytes;
    char remoteIP[INET6_ADDRSTRLEN];

    struct addrinfo hints, *ai, *p;


    FD_ZERO(&master);
    FD_ZERO(&read_fds);

    // get us a socket and bind it
    memset(&hints, 0, sizeof(hints));
    hints.ai_family = AF_UNSPEC;
    hints.ai_socktype = SOCK_STREAM;
    hints.ai_flags = AI_PASSIVE;

    int rv = getaddrinfo(NULL,PORT,&hints,&ai);
    if(rv != 0){
        fprintf(stderr,"selectserver: %s\n",gai_strerror(rv));
        exit(1);
    }
    
    int reuse = 1;


    //Create socket server
    for(p = ai; p != NULL; p = p->ai_next){
       listener = socket(p->ai_family,p->ai_socktype,p->ai_protocol);
       if(listener < 0){
            continue;
       }

       setsockopt(listener,SOL_SOCKET,SO_REUSEADDR,&reuse, sizeof(int));

       if(bind(listener,p->ai_addr,p->ai_addrlen) < 0){
            close(listener);
            continue;
       }
       break;


    }

    if(p == NULL){
        fprintf(stderr,"selectserver: failed to bind\n");
        exit(2);
    }

    freeaddrinfo(ai);//All done with this

    if(listen(listener,10) == -1){
        perror("10 user connect failed");
        exit(3);
    }



    //Add the listener to the master set
    FD_SET(listener,&master);

    // keep track of the biggest file descriptor
    fdmax = listener; // so far, it's this one


    //main loop
    int i,j;
    for(;;){
        read_fds = master; //copy file descriptor
        if(select(fdmax +1, &read_fds, NULL, NULL, NULL) == -1){
            perror("select");
            exit(4);
        }
        // run through the existing connections looking for data to read
        // stack descriptor socket connection
        for(i = 0; i <= fdmax; i++){
            if(FD_ISSET(i,&read_fds)){//we got one!!
                if(i == listener){
                    //handle new connectionsitons
                  addrlen = sizeof(remoteaddr);
                  newfd = accept(listener,(struct sockaddr *)&remoteaddr,&addrlen);

                  if(newfd == -1){
                        perror("accept error ");
                  }else {
                      //Add to master set
                      FD_SET(newfd,&master);
                      if(newfd > fdmax){
                            fdmax = newfd;
                      }

                      printf("Selectserver: new connection from %s"
                              " on socket %d\n",
                              inet_ntop(remoteaddr.ss_family,
                                  get_in_addr((struct sockaddr *)&remoteaddr)
                                  ,remoteIP,
                                  INET6_ADDRSTRLEN)
                              ,newfd);

                  }
                }
                else {
                   // handle data from a client
                   if((nbytes = recv(i,buf,sizeof(buf),0)) <= 0){
                       if(nbytes == 0){
                           // conection closed
                           printf("selectserver: socket %d hung up",i);

                       }else {
                           perror("recv error");
                       }
                       close(i);//close socket error
                       FD_CLR(i,&master); //remove fd of socket from master set

                   }else {
                      // we got some data from a client
                      for(j = 0; j <= fdmax; j++){
                          //send to everyone
                          if(FD_ISSET(j,&master)){
                              //except the listener and ourselves
                              // Except who send to server
                              if(j != listener && j !=i){
                                  if(send(j,buf,nbytes,0) == -1){
                                      perror("send");
                                  }
                              }
                          }
                      }
                   }
                }
            }
        }//end run through the existing connections
    
    }//end main loop

    return 0;
}
```
# Note 

- *Telnet is a simple network.*
- Ở trên mô tả đầy đủ theo giao thức TCP(Transmision Control Protocol ) với socket stream, còn đối với UDP (User Datagram Protocol).
- Đối với UDP gồm server gồm bước tạo socket và bind to port, còn client tạo socket tới server. sử dụng hàm sendto() để gửi và recvfrom() để nhận xem thêm [demo](https://github.com/congdv/udp-demo.git).
- Phần Advanced rất chi là phức tạp nên ghi lên để nhớ những gì, có thể một ngày hiểu hoàn toàn vì sao nó hoạt động.
