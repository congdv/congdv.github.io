---
date: '2017-08-18 13:31 +0700'
layout: article
published: true
title: Advanced Programing in the UNIX Environment
tag: notes
---
## Chapter 1 - UNIX System Overview

### UNIX artchitecture

![Unix](https://user-images.githubusercontent.com/8192210/29447035-f40eb7fa-8419-11e7-829b-bd1a6ed8508d.png)

An operating system consists of the kernel and all the other software that make a computer useful and gives the computer its personality. This other software includes system utilities,applications,shells,libraries...

For example, Linux is the kernel used by the GNU Operating System, Some people call it is as the GNU/Linux Operating System, commonly it is as simply Linux.

### Logging In

Password file will be stored at the file /etc/passwd.

In my passwd file,on ubuntu 16.04, with root user
```
root:x:0:0:root:/root:/bin/bash 
```
It includes seven colon-seprated fields: the login name (root),encrypted password, numeric used ID(0),numeric group ID(0),a comment field,home directory (/root),and shell program (bin/bash) .

### Files and Directories
A directory is a file that contains directory entries.

The attributes of a file are such things as the type of file(regular file, directory),the size of the file, the owner of the file, permissions for the file and when the file was las modified.

The only two characters that cannot in a file are the slash character(/) and null character.

When we log in, the working directory is set to our home directory that is obtained from our entry in the password file.

### Input and Output
**File descriptors**  are normally small non-negative integers that the kernel uses to identify the file accessed by a process. Whenever it opens an existing file or creates a new file, the kernel returns a file descriptor that we want to read or write the file.

By convention, all shells open three descriptors whenever a new program is run: standard input, standard outpur,and standard error.