# 本地Linux主机使用SFTP上传文件到Linux云服务器

操作步骤

1. 以root用户登录云服务器
2. 执行以下命令查看ssh版本，OpenSSH版本大于等于4.8p1
```bash
ssh -V
```
3. 创建用户和组，以user1用户为例
```bash
groupadd sftp
useradd -g sftp -s /sbin/nologin user1
```
4. 设置用户密码
```bash
passwd user1
```
5. 设置目录权限
```bash
chown root:sftp /home/user1

chmod 755 -R /home/user1

mkdir /home/user1/upload

chown -R user1:sftp /home/user1/upload

chmod -R 755 /home/user1/upload
```

6. 执行以下命令，编辑sshd_config文件
```bash
vim /etc/ssh/sshd_config
```
注释掉如下信息
```
#Subsystem sftp /usr/libexec/openssh/sftp-server
```
补充如下内容：
```
Subsystem sftp internal-sftp
Match Group sftp
ChrootDirectory /home/%u 
ForceCommand internal-sftp
AllowTcpForwarding no
X11Forwarding no
```

7. 重启云服务器，或执行以下命令重启sshd服务
`service sshd restart` 或 `systemctl restart sshd`

8. 在本地主机执行以下命令，远程连接到服务器
```
sftp root@IP地址
```

9. 连接成功后，您可以使用交互式的sftp命令
10. 执行以下命令，上传或下载文件、文件夹
上传文件：`put -r`
下载文件：`get -r`

## 参考
https://support.huaweicloud.com/ecs_faq/zh-cn_topic_0170139796.html