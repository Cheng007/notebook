# 使用 ACME 安装 HTTPS 证书

## 什么是 ACME
ACME（Automatic Certificate Management Environment，自动化证书管理环境）是一种用于自动申请、更新和撤销SSL/TLS证书的协议。
`certbot`、`acme.sh` 等工具就是基于 ACME 协议工作的。

## 什么是 Let's Encrypt
`Let's Encrypt` 是一个由互联网安全研究小组（ISRG）运营的证书颁发机构（CA）

## 使用 acme.sh 生成 SSL 证书并配置 Nginx 的完整步骤

1. 安装 `acme.sh`
```bash
curl  https://get.acme.sh | sh -s email=youremail@example.com
```
安装完成后，重新加载 shell
```bash
source ~/.bashrc  # 或 source ~/.zshrc（取决于你的 Shell）
```

2. 生成证书

方式一：HTTP 验证（推荐）

适用于已经运行 Nginx/Apache 的情况：

```bash
acme.sh --issue -d dongebook.cn --keylength ec-256 --webroot /var/www/html
```

`/var/www/html` 是你的网站根目录，`acme.sh` 会在该目录下创建 `.well-known/acme-challenge/` 用于验证。

如果对同一域名重复申请，可能会被限速（retryafter=86400，需要等待24小时再试），如果是测试环境，
可以用 Let's Encrypt Staging 环境（无申请速率限制），确认无误后再换成 `--issue`（正式环境）

```bash
acme.sh --issue -d example.com --webroot /var/www/html --staging
```

验证证书是否签发成功
```bash
acme.sh --list
```

成功后应该能看到类似：
```bash
Main_Domain    KeyLength  SAN_Domains  CA              Created               Renew
dongebook.cn   "ec-256"   no           LetsEncrypt.org 2023-11-01T12:00:00Z  2023-01-30T12:00:00Z
```

如果 http 方式验证失败，可以尝试使用 DNS 验证，但需要提前配置好 DNS 记录
```bash
acme.sh --issue -d dongebook.cn --dns --yes-I-know-dns-manual-mode-enough-go-ahead-please
```
然后按照提示手动添加 DNS TXT 记录（通常在域名控制台操作）


3. 安装证书到 Nginx

```bash
mkdir -p /etc/nginx/ssl/dongebook.cn

acme.sh --install-cert -d dongebook.cn \
--key-file       /etc/nginx/ssl/dongebook.cn/key.pem  \
--fullchain-file /etc/nginx/ssl/dongebook.cn/cert.pem \
--reloadcmd     "nginx -s reload"
```
