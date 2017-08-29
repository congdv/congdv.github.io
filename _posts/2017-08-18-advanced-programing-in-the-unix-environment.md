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

### Programs and Processes 
A program is an executable file residing on disk in a directory. A program is read into memory and is executed by the kernel as a result of one of the seven exec functions. An executing instance of a program is called a process.

The Unix System guarantees that every process has a unique numeric identifier called the process ID. The process ID is always a non-negative integer.

There are three primary functions for process control: *fork*,*exec* and *waitpid*.
- *fork* create a new process then fork returns the non-negative process ID of the new child process to the parent, and return 0 to the child process.

```
pid_t pid = fork();
// Check create process in the child
if(pid == 0) {
...
}
```

- exec to execute the new program file,
- The parent program wants to wait for the child to terminate by calling waitpid.
```
waitpid(pid,&status,0);
// the status variable return the termination status
```

### Threads and Thread IDs
Usually, a process has only one thread of control - one set of machine instructions executing at a time.

All threads within a process share the same address space, file descriptors, stacks and process-related attributes. Each thread executes on its own stack, although any thread can access the stacks of other threads in the same process. Because they can access the same memory, the threads need to synchronize access to shared data among themselves to avoid inconsistencies.

Threads also are identified by IDs. We use thread IDs to refer to specific threads as we manipulate the threads within a process.

## Error Handling
The file <errno.h> defines the symbol errno and constants for each value that errno can assume.
## User Identification
### User ID
The *user ID* from our entry in the password file is a numeric value that identifies us to the system. This user ID is assigned when login name is assigned and we cannot change it. The user ID is unique for every user.

User have User ID = 0 call root.
### Group ID
Groups are normally used to collect users together into projects or departments.
## Signals
Signals are a technique used to notify a process that come condition has occurred. For example, if a process divides by zero, the signal whose name is SIGFPE(floating-point exception) is sent to process. The process has three choices for dealing with the signal:
- Ignore the signal.(not recommend)
- Let the default action occur.
- Catching the signal by a function.

Two terminal keys, the interrupt key - Del or Ctrl-C and the quit key - Ctrl-\.

## Time values
Historically, UNIX systems have maintained two different time values.
1. Calendar time: this value counts the number of seconds since the Epoch:
00:00:00 January 1, 1970, Coordinated Universal Time (UTC).
2. Process Time: This is also called CPU time and measures the central processor
resources used by a process. Process time is measured in clock ticks, which
have historically been 50, 60, or 100 ticks per second.

When measure the execution time of a process, we'll see that the UNIX System maintains three value fo a process:
 - Clock time: the amount of time the processes takes to run, and its value depends on the number of other processes being run on the system.
 - User CPU time: the CPU time attributed to user instructions. 
 - System CPU time: The CPU time attributed to the kernel 
 ## System calls and Library Functions
 System calls like services is provided by kernel. This help user request command directly to kernel. The exact number of system calls depend on the OS version.
 Both system calls and library functions appear as normal C functions. 
 
 ![Malloc and System call ](https://user-images.githubusercontent.com/8192210/29810126-dedde042-8cc8-11e7-8d89-108e952e9bea.png)
