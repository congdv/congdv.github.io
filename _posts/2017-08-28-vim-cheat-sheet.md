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

|Shortcut| Description           |
|:-------:|:---------------------|
|| *Ctags* |
|Ctrl-]| Jump to the tag underneath the cursor|
|:ts <tag> <RET>| Search for a particular tag |
|:tn |Go to the next definition for the last tag |
|:tp | Go to the previous definition for the last tag |
|:ts | List all of the definitions of the last tag |
|Ctrl-t|Jump back up in the tag stack|
|| *Show match ([{}])* |
|%| To jump to a matching opening or closing parenthesis, square bracket or a curly brace: ([{}]) in normal mode|
|| *Navigation*|
|o| Enter newline|
|e| Go to end exactly a word|
|E| Go to end string word continues|
|b| Back to previous exactly a word|
|B| Back to previouse string word continues|
|w| Go to next exactly a word|
|W| Go to string word continues|
|$| Go to end of currently line|
|^| Go to start of currently line|
|Shift + ) or Shitf + }| Scroll down|
|Shift + ( or Shift + {| scroll Up|
|| *Edit command*|
|i| insert at current cursor|
|a| Append at current cursor|
|r + <char>| Replace at current cursor with character but still keep command mode|
||*Command*|
|Ctrl-g|show your location|
|:tabe <filepath> | create new file in other tab|
|:lnext | Go to next location of error when use YCM plugin|
|:lpreviouse | Go to previous location of error when use YCM plugin|
  
## Plugin 
- [CTags](https://andrew.stwrt.ca/posts/vim-ctags/): Plugin support browser file easy
- ~~[C Vim](http://www.thegeekstuff.com/2009/01/tutorial-make-vim-as-your-cc-ide-using-cvim-plugin/): Make like C/C++ IDE, [Key mapping](https://wolfgangmehner.github.io/vim-plugins/csupport/c-hotkeys.pdf)~~ I removed it because it 's so slow when generate comment tag
- [Auto Pairs](https://github.com/jiangmiao/auto-pairs): support closing parenttheis
