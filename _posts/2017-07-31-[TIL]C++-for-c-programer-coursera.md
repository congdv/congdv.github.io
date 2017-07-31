# Module 1 C++ as better C

## 1.4 Using C++ code
- [4:50] replace `#define` by `const int` and macro function by inline function
- [6:18] inline keyword, It's compiler directive. Call compiler here a function instead of function call. Because function call cost
me money, because initialize stack. That is macro work like.

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
