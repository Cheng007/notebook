# 配置 SSH 公钥

## 介绍
SSH 的全称为 Secure Shell 即安全外壳协议，是一种加密的网络传输协议。它能够在公开的网络环境中提供安全的数据传输环境，通常用于登录远程主机与推拉代码。

## 生成公钥
可以使用 `ssh-keygen` 命令生成公钥：
```bash
# 创建新的 SSH 私钥与公钥密钥对，输入你的邮箱作为标签
ssh-keygen -m PEM -t ed25519 -C "your.email@example.com"
# 推荐使用默认地址
Enter file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]
# 此处直接回车即可；若设置密码，则每次使用 SSH 方式推送代码时都会要求输入密码
Enter passphrase (empty for no passphrase): 
# 同前，此处直接回车即可
Enter same passphrase again:
```

会得到两个文件 `id_rsa` 和 `id_rsa.pub`
