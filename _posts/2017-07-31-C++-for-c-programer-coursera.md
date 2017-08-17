---
layout: article
title: C++ for C programer on coursera
date: 'Mon Jul 31 2017 07:00:00 GMT+0700 (ICT)'
tag: notes
published: true
---
# Module 1 C++ as better C

## 1.4 Using C++ code
- [4:50] replace `#define` by `const int` and macro function by inline function
- [6:18] inline keyword, It's compiler directive. Call compiler here a function instead of function call. Because function call cost me money, because initialize stack. That is macro work like.

## 1.6 C++ Advantages
- [7:19] using static_cast<type> for convert type. make safer c convertation.
- [9:09] C++ Advantages
   + Safe cast - static_cast<type>
   + for statement can include declaration initializer, (in c99 also support)
   + endl iomanipulator can be placed in an ostream

## 1.7 C++ is better than C
- [7:31] const double PI 3.14159 is create a non-mutable variable PI
## 1.8 C Swap function
- [9:40] double using %lf = long floating point 
## 1.9 Swap function in C++
- [2:46] reference variable to funtion like int &val, when things past there, they will automatically choose to use variable locally
and without copy
## 1.10 Generics
- [1:06] Generics in C++ means programing using template, Alex  Stepanov behind 
- [7:06] C++ Template
```
template <class T>//T is meta variable
inline void swap(T &d,T &s){
    T temp = d;
    d = s;
    s = temp;
}
```

# Module 2 - Basics of Generics and Classes
## 2.3 Graph Theory & Algorithms
- Degree of K4 will be 3, so degreen of K5 graph will be n-1
- Graph theory was intented by a very famous mathematician, Euler(Project euler name) - Leonherd Euler - 1735
- Bridge quiz, how to go section once on one bridge
## 2.4 Graph as a Data Structure 
- Matrix vs list directed graph

|-| 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| 1 | 1 | 1 | 1 | 1 |
|2|1|0|0|0|
|3|0|1|0|1|
|4|0|1|1|0|

```
1 -> 1 -> 2 -> 3 -> 4
2 -> 1
3 -> 2 -> 4
4 -> 2 -> 3
```
![Graph](https://user-images.githubusercontent.com/8192210/29072786-67a26a76-7c73-11e7-868e-b5bcb9b45785.png)

## 2.5 - Dijkstra Shortest Path 

```
- Find a shortest Path between start and destination node s to d
- Step 1- include s in a closed and immediate successors of s with their distance in the open set
- Step 2- pick the open node least cost - say this node is n
```

## 2.7 Enum & Operator Overloading
- Can use a named const integer - so it is redundant? Okay 
```
const int TRUE = 1, FALSE = 0
```
- Can use a #define - keep old C style? safety issues
```
#define TRUE 1
#define FALSE 0
```
- Small related set of constants. -> best
```
typedef enum color{RED,WHITE,GREE} color;
```

[Enum type in C++ 11](https://d3c33hcgiwev3.cloudfront.net/_63d8a67f3688cd8b5003e12d730405c5_Enum-type-in-C.pdf?Expires=1502323200&Signature=QpvHEd~FHJaedkkDQBQjbFK5fTvLXFwtK6sKsV-ZiueBJWlBI8-uiCJcYugLpikmoMupEdjZb4rsQPBHdOa56ktQMf7XMUF7G5l7EvNkNLRmmiT0b0uvEndjn17YlbkbnCD98ouh8Yr2x8WvKwVHrlWifv9OLp4rsUdf-hf6qPM_&Key-Pair-Id=APKAJLTNE6QMUY6HBC5A)

## 2.8 - typedef days
- << left bit shift 
- precedence and associativity do not change
## 2.9 - Natural way to build widgets
Why add a type?
- Types are related to domains
- So when you need to talk about widgets - you want the widget type and actions on widgets
- C had primitive forms of type extensibility 

C type extension:
- you can "add" a type using struct
- In C++ struct is different - struct is a name scope that can include functions(methods) and have different layers of opacity(data hiding). While C++ retains struct it has the new keyword class.
- Class is almost equivalent to struct - but with different data hiding default.

## 2.10 C++ point
- In c++98(default in ubuntu) object must be initialized by constructor,
```
point p1(2,3);
```
- In c++11 object could initialized like initialize of c99 on struct
```
point p1 = {2,3};
```
# Module 3 - C++ and OO; Lists

## 3.2 Point and its Constructor

```
point(double x =0.0, double y = 0.0):x(x),y(y){} //Constructor can point with no argument, one or two argument
```
A specical method constructor:
- point(){x = y = 0;} -> ordinary assignment
- point(){this->x = 0; this->y = 0} -> this point assigment
- point():x(0.0),y(0.0){} -> initializer list and these values are initalizations
Default constructor - the constructor whose signature is void

Assigment means we're mutating the value stored in this item

The constructor is to build the objects and initialize it.

This lets ambiguity be resolved x=x; would not work

## 3.3 - More Constructors

```
char *s = new char[size]; //get off heap
int *p = new int(9); //single int initialized c++98
delete []s; //delete an array
delete p; //delete single element
```
- We can't have multiple destructors
- Don't worry about memory leaks, Because memory typically gets reallocated by the operating system when your process ends, and most of systems have that built in like a unix system. **If you're using large amounts of memory and you're frequently going to the operating systems, it could be easily slow down what you're doing. So you need to care about this problem** 

```
slist:~slit(){
 V
 "Scope resolution" call it
....
}
```

## 3.10 - Deep vs Shallow Copy

- ultization , cost and modification
- the deep copy is the safest, I can turn over a new copy
- A "shallow" copy would be a referential copy where the new list head would be the same value as the old list head.

> Shallow copies duplicate as little as possible. A shallow copy of a collection is a copy of the collection structure, not the elements. With a shallow copy, two collections now share the individual elements.

> Deep copies duplicate everything. A deep copy of a collection is two collections with all of the elements in the original collection duplicated.

> [@stackoverflow](https://stackoverflow.com/questions/184710/what-is-the-difference-between-a-deep-copy-and-a-shallow-copy )

## 3.12 Dynamic Data Structure in Standard Template Library(STL)

- doubly linked list have bidirectionally