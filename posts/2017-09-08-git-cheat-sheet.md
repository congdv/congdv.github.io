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
### Credentials
```
git config --global credential.helper 'cache --timeout=3600'
```

### Git and Gerrit on Intelij
Before push your code into the repository, Your coude should be reviewed by others. That is why gerrit help your repository become clean and clear.

Git rebase: help your branch merge into main branch easily.

You should git ammend when you just a tiny code and you should put this change into the previous commit. Why do that? Because you will don't have many seperate commits while all commits have the same meaning. That 's all. Git ammend

Sometime you wish you undo your commit, so git revert is the best idea. But you can do soft revert and your code don't lose, but hard revert you can lose your code.

When you do on many branches, and you want to the current commit move to another branch. So let use git cherry-pick. 

Anyway, when you push your code into your repository. You should remember to push to ref/branch to review you code. Before your code will be reviewed, you should run all your test.