---
date: '2018-05-05 13:24 +0700'
layout: article
published: true
title: What I learn about HTTP
tag: notes
---
## Network
When computer appear, the humman want to exchange data among computers. So, the network is created.

The huge network is called the Internet, it helps connect the people for long distance in the world.

Behind the network, many technical was created. TCP and UDP is popular protocol to help computers communicate each other.

## TCP
TCP is the most communication on the Internet is built on the top it.

A TCP connection works as follows: one computer must be waiting, or listening, for other computer to start talking to it. To be able to listen for different kinds of communication at the same time on a single machine, each listener has a number(called a port) associated with it. Most protocols specify which port should be used by default. For example, HTTP is 80, HTTPS is 443.

## HTTP
HTTP(Hypertext Transfer Protocol) is an application layer protocol(Top end of TCP) for transmitting hypermedia documments, such as HTML. HTTP follows a classical server-client model.

When the machine access to URL address, The server of URL will response the data to machine by HTTP protocol. The simple data could be HTML file. The browser will display data on the screen.

When the browser open a URL, the browser try to open TCP connection to server on port 80( the default port for HTTP traffic)

The client request to server:
```
GET /18_http.html HTTP/1.1
Host: eloquentjavascript.net
User-Agent: Your browser's name
```

The server response:
```
HTTP/1.1 200 OK
Content-Length: 65585
Content-Type: text/html
Last-Modified: Mon, 08 Jan 2018 10:29:45 GMT

<!doctype html>
... the rest of the document
```

Many methods to request to server: 
- GET means that we want to get the specified resource.
- DELETE to delete a resource. it will probably to refuse.
- PUT to replace it.
- POST to send information to it.
GET and DELETE requests don't send along any data.

POST and PUT requests do.

Reference Links:
http://eloquentjavascript.net/18_http.html
http://eloquentjavascript.net/13_browser.html

However, when you send data to server and server send back to you, you don't want to anybody see that data because the data is not encrypt when you use HTTP protocol. That is why HTTPS is developed.

## HTTPS


