---
layout: default 
title: "Vài thứ học về base64"
date: 2017-02-08
---
Encode với Decode [Base64](https://en.wikipedia.org/wiki/Base64)
================================================================

Dành 3 đêm để giải bài decode với encode của khóa c trên [mooc.fi](http://2016-aalto-c.tmchq.co/en/Module_5/index.html#desc-3-en)

## Kiến thức về base 64
- Được dùng để mã hóa và giải mã chuỗi. Ví dụ: Man -> TWFU , TWFU -> Man
- Cơ bản là chuyển từ 3 byte kí tự sang 4 byte kí tự và ngược lại, 3 byte = 3`*`8 bit = 24 bit = 4`*`6 bit

![base64](https://cloud.githubusercontent.com/assets/8192210/22764610/421eefbc-ee9e-11e6-9952-0e77e03b9dec.png)

Bảng kí tự của base64

![base64-table](https://cloud.githubusercontent.com/assets/8192210/22764615/47882874-ee9e-11e6-8acf-16824cd25601.png);

## Thuật toán encode 
1. Từ một chuỗi lớn.
2. Băm chuỗi thành các block kí tự với mỗi block là 3 byte
3. Với mỗi block 3 byte mã hóa thành 4 byte(mỗi byte này có 6 bit với 2 bit đầu là 00)

Code sample in c:

```c
int to_base64_string(const unsigned char *string,unsigned char * base64,const int n){
    if(string == NULL)
        return 0;
    if(n == 0 )
        return 0;
    int i = 0;
    int k = 0;
    while(i < n){
        unsigned int c= string[i]>>2; 
        c &=0xFF;
        base64[k++] = encoding[c];
        c = (string[i] & 3)<<4;
        c &=0xFF;
        if(i + 1 < n){
            c |= string[i+1]>>4;
            c &=0xFF;
            base64[k++] = encoding[c];
            c = (string[i+1] & 0xF)<<2;
            c &=0xFF;

            if(i + 2 < n){
                c |= (string[i+2]>>6);
                c &=0xFF;
                base64[k++] = encoding[c];
                c = string[i+2]&0x3F;
                c &=0xFF;
                base64[k++] = encoding[c];
            }else {
                base64[k++] = encoding[c];
                base64[k++] = '=';
            }
        }else {
            base64[k++] = encoding[c];
            base64[k++] = '=';
            base64[k++] = '=';
        }
        //for each 3 char in string
        i+=3;
    }
    base64[k] = '\0';
    return k;
}
```

## Thuật toán decode 
1. Tư một chuỗi lớn cần giải mã base64.
2. Băm chuỗi thành các block kí tự với mỗi block là 4 byte.
3. Với mỗi block có 4 byte sẽ giải mã thành 3 byte.


Code sample in c:

```c
int from_base64_string(const unsigned char *string,unsigned char * base64, const int n){
    if(string == NULL)
        return 0;
    if(n == 0 )
        return 0;
    int i = 0;
    int k = 0;
    while(i < n){
        char c= decoding(string[i])<<2; 
        c &=0xFF;
        if(i + 1 < n){
            c |= decoding(string[i+1])>>4;
            c &=0xFF;
            base64[k++] = c;

            if(i+2 < n && string[i+2] != '='){
               c = (decoding(string[i+1]) << 4) | (decoding(string[i+2]) >>2); 
               c &=0xFF;
               base64[k++] = c;
               if(i+3 < n&& string[i+3] != '='){
                    c =( (decoding(string[i+2]) & 3) << 6) | decoding(string[i+3]);
                    c &=0xFF;
                    base64[k++] = c;
               }
            }
        }
        //for each 4 char in string
        i+=4;
        //Ignore new line
        if(string[i] == '\n'){
            i++;
        }
    }
    base64[k] = '\0';
    return k;
}
```

# Vài thứ về bài tập này.
- Cơ bản cố gắng hoàn thành khóa học về mấy bài cuối.
- Nắm rõ được đọc và ghi file binary. 
- Sử dụng fseek,ftell để xác định độ lớn của file.
- fseek được dùng để xác định vị trị trong file 
- ftell để tính độ dài fstream.

```
FILE *f = fopen(filename,"rb");
//Đưa f trỏ về cuối file stream.
fseek(f,0,SEEK_END);
//Độ dài tại f con trỏ.
int len = ftell(f);
//Đưa f về vị trí ban đầu khi mới đọc file
fseek(f,0,SEEK_SET);
```

