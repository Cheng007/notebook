# 基于 Verdaccio 搭建 Npm 私有仓库

(Verdaccio)[https://verdaccio.org/] 是一个基于 Node.js 的轻量级私有仓库。

有多种安装方式：
- 通过 npm/yarn/pnpm 等包管理器安装
- 通过官方Docker镜像安装
- 通过 Helm Chart 一建安装到 K8S 集群

## 使用 npm 安装步骤：
1. 安装 Node.js：确保服务器上安装了Node.js环境，因为Verdaccio是基于Node.js的应用
2. 安装 Verdaccio：全局安装 Verdaccio
```bash
npm i -g verdaccio
```
3. 运行 Verdaccio
```bash
verdaccio
```
或是通过 PM2 进程守护工具启动
```bash
npm i -g pm2
pm2 start verdaccio --name verdaccio
```

4. 配置访问
访问 `http://localhost:4873` 来查看 Verdaccio 的管理界面。在这里，可以配置用户权限、包管理等选项

5. 使用私有仓库
可以通过在 `.npmrc` 文件中设置 registry 字段来实现，
```bash
npm set registry http://localhost:4873
```
推荐使用`nrm`管理多个 npm 仓库
```bash
# 全局安装
npm install -g nrm
# 添加至nrm
nrm add local http://localhost:4873/
# 使用本地私有仓库
nrm use local
```
6. 发包至私有仓库
- 第一次需要先创建用户
```bash
npm adduser --registry http://localhost:4873/
```

- 查看当前登录 npm 用户
```bash
npm who i am
```

- 切换到项目，发布
```bash
npm publish --registry http://localhost:4873/
```

## 如何删除发布的包
```bash
# 删除整个包
npm unpublish packagename --force
# 删除某个版本的包
npm unpublish packagename@1.0.0 --force
```

### PM2 常用命令
| 命令 | 描述 |
|----|----|
| `pm2 ls` | 查看进程列表 |
| `pm2 start [app.js]` | 启动某个应用 |
| `pm2 stop [appName/ID]` | 停止某个应用（进程名/ID） |
| `pm2 restart [app.js]` | 重启某个应用 |
| `pm2 logs [appName/ID]` | 查看应用日志(进程名/ID) |
| `pm2 delete [appName/ID]` | 删除进程(进程名/ID) |
| `pm2 stop all` | 停止所有应用 |
| `pm2 restart all` | 重启所有应用 |
| `pm2 logs` | 查看实时日志 |
| `pm2 delete all` | 删除所有进程 |

### nrm 常用命令
| 命令 | 描述 |
| ---- | ---- |
| `nrm ls` | 查看源地址 |
| `nrm add <name> <url>` | 添加源地址 |
| `nrm use <name>` | 切换源地址 |
| `nrm current` | 查看当前源地址 |
| `nrm del <name>` | 删除源地址 |
