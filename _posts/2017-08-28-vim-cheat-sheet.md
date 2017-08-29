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
  
## Plugin 
- [CTags](https://andrew.stwrt.ca/posts/vim-ctags/): Plugin support browser file easy
- [C Vim](http://www.thegeekstuff.com/2009/01/tutorial-make-vim-as-your-cc-ide-using-cvim-plugin/): Make like C/C++ IDE, [Key mapping](https://wolfgangmehner.github.io/vim-plugins/csupport/c-hotkeys.pdf)
- [Auto Pairs](https://github.com/jiangmiao/auto-pairs): support closing parenttheis
