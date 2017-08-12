---
layout: article 
title: "C++ for C programer on coursera"
date: 2017-07-31
tag: notes
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


