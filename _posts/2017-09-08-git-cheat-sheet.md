---
date: '2017-09-08 23:36 +0700'
layout: article
published: true
title: Git Cheat Sheet
tag: notes
---
## Git Cheat Sheet

|Shortcut| Description           |
|:-------:|:---------------------|
|| *Working with remote repository* |
|git remote add origin  [link]| Jump to the tag underneath the cursor|
|git remote -v | verify new remote|
|git config –global credential.helper “cache –timeout=3600" | Set time for login again |

### Git revert old commit
```
> git log
> git checkout <commit>
> git log master // To print out all log
```

### Branch
```
> git branch <name-branch>   
> git checkout <name-branch>

>> git branch -b <name-branch> // create branch and checkout
```

### Configuration
```
# set a username globally 
> git config --global user.name "username"`
# set an email address globally
> git config --global user.email "email@provider.com"
```
