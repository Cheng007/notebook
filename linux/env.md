# env

`env` 命令用于显示当前的环境变量或在新环境中执行命令。

## 基本用法

### 1. **显示所有环境变量**
```bash
env
```
这会列出所有当前设置的环境变量，例如：
```
USER=john
HOME=/home/john
PATH=/usr/local/bin:/usr/bin:/bin
PWD=/home/john
LANG=en_US.UTF-8
...
```

### 2. **在纯净环境中执行命令**
```bash
env -i command
```
`-i` 选项表示忽略继承的环境变量，创建一个干净的环境：
```bash
env -i ls          # 在空环境中执行ls
env -i bash        # 启动一个没有环境变量的新shell
```

### 3. **设置临时环境变量执行命令**
```bash
env 变量名=值 command
```
```bash
env PATH=/custom/path myprogram    # 临时修改PATH执行程序
env EDITOR=vim script.sh          # 设置EDITOR变量后执行脚本
```

## 常用选项

| 选项 | 说明 |
|------|------|
| `-i` | 忽略当前环境，使用空环境 |
| `-u` | 从环境中删除指定变量 |
| `-0` | 用空字符而不是换行符分隔输出 |

## 实际应用示例

```bash
# 查看特定环境变量
env | grep PATH

# 在纯净环境中测试程序
env -i /path/to/program

# 临时设置语言环境
env LANG=C ls -l

# 删除特定变量后执行
env -u HOME command

# 用于脚本开头确保安全执行
#!/bin/bash
env -i /path/to/script
```

## 与相关命令对比

- `env` - 显示或设置环境执行命令
- `export` - 设置环境变量（永久生效）
- `printenv` - 只显示环境变量，功能类似 `env`
- `set` - 显示所有变量（包括环境变量和shell变量）

`env` 在调试和环境管理时非常有用！

