---
date: '2017-08-28 15:43 +0700'
layout: article
published: true
title: Vim cheat sheet
tag: notes
---
## Vim

### Concept note

- [Leader Key](https://stackoverflow.com/questions/1764263/what-is-the-leader-in-a-vimrc-file)
> The <Leader> key is mapped to \ by default. So if you have a map of <Leader>t, you can execute it by default with \+t.

- [internal-variables](https://stackoverflow.com/questions/15685729/vim-what-is-the-difference-between-let-g-let-b-etc)

- Run *fg* command to bring program back to the foreground. 
- a word of caution: "w does not stand for write but for wipeout"

# General #
```
%              To jump to a matching opening or closing parenthesis, 
			   square bracket or a curly brace: ([{}]) in normal mode
o              Enter newline
e              Go to end exactly a word
E              Go to end string word continues
b              Back to previous exactly a word
B              Back to previouse string word continues
w              Go to next exactly a word
W              Go to string word continues
$              Go to end of currently line
^              Go to start of currently line
Shift + ) or Shitf + }  Scroll down
Shift + ( or Shift + {  Scroll Up
i              Insert at current cursor
a              Append at current cursor
r + <char>     Replace at current cursor with character but still keep command mode
:tabe <filepath>  create new file in other tab
:lnext         Go to next location of error when use YCM plugin
:lpreviouse    Go to previous location of error when use YCM plugin
:bd           Buffer delete but if it changed, you have to add ! last
:bw           Like delete and it really delete buffer
:ls           list all buffers
:b <number>   Select buffers on list to display
```

# Emmet #
```
Ctrl + y ,    Implement emmet command in emmet plugin
cs x y        Change tag of a sentence replace x by y 
html:5        Type Ctrl + y and , for generating html5 template
```

# NERDTree #
```
t             Open file in new tab
C             Change tree root to selected dir
o             Open and close brances
```

# CtrP #
```
<C-f> , <C-b> Cycle between modes
<C-d>         Switch to filename search instead of full path
```

# Ctags #
```
Ctrl-]        Jump to the tag underneath the cursor
:ts <tag> <RET> Search for a particular tag
:tn           Go to the next definition for the last tag
:tp           Go to the previous definition for the last tag
:ts           List all of the definitions of the last tag
Ctrl-t        Jump back up in the tag stack
```
