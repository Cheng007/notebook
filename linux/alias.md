# `alias` 别名

我们在进行系统的管理工作一定会有一些我们经常固定使用，但又很长的命令。
那我们可以给这些这一长串的命令起一个别名。之后还需要这一长串命令时就可以直接以别名来替代了。
系统中已经有一些默认的命令别名，使用下面命令可以查看默认别名:

## 查看默认别名
```bash
alias
```

## 设置别名
```bash
alias name='command line'
```

## 查看具体一条指令的别名
```bash
alias name
```

## 删除别名
```bash
unalias name
```

# 别名永久化
`alias` 的作用仅在该次登入的操作，即输入一次 `alias` 后，这个修改只在当前的Shell生效。如果重新开启一个 Shell，或者重新登录，则这些 `alias` 将无法使用。
可以使用下面的方法永久化 `alias`：

- 若要每次登入就自动生效别名，则把别名加在 `/etc/profile` 或 `~/.bashrc` 中。然后执行 `source ~/.bashrc`
- 若要让每一位用户都生效别名，则把别名加在 `/etc/bashrc` 最后面，然后执行 `source /etc/bashrc`