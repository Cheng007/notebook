# npm 相关

## `link`命令
包链接需要两步

1. 在包文件夹中执行`npm link`，将在全局文件夹 `{prefix}/lib/node_modules/<package>` 中创建一个链接，
该链接会链接到执行 `npm link` 命令的包。
它还会将包中的任何 `bin` 链接到 `{prefix}/bin/{name}`。

2. 在其他位置，执行`npm link <package-name>`，将创建一个从全局安装的`<package-name>`到当前文件夹的 node_modules/ 的符号链接。
请注意，`<package-name>`取自 package.json，而不是目录名。
包名称可以选择以作用域为前缀。作用域前面必须有一个 @ 符号，后跟一个斜杠，如：`@myorg/mypackage`

```bash
cd ~/projects/node-redis    # go into the package directory
npm link                    # creates global link
cd ~/projects/node-bloggy   # go into some other package directory.
npm link redis              # link-install the package
```

或是一步到位

```bash
cd ~/projects/node-bloggy  # go into the dir of your main project
npm link ../node-redis     # link the dir of your dependency
```

等同于
```bash
(cd ../node-redis; npm link)
npm link redis
```

## npx
从 `npm` `5.2` 版本开始就自带的命令，`npx` 可以运行使用 Node.js 构建并通过 `npm` 仓库发布的代码

## `init` 命令
创建一个`package.json`文件，别名：`create`, `innit`
```bash
npm init
```

### `init` 命令其他使用方式
```bash
npm init <package-spec> (same as `npx <package-spec>`)
npm init <@scope> (same as `npx <@scope>/create`)
```
`init` 命令会转化成`npm exec`操作，例如：
```bash
npm init foo
# 转化成
npm exec create-foo
```
```bash
npm init @usr/foo 
# 转化成
npm exec @usr/create-foo
```
```bash
npm init @usr
# 转化成
npm exec @usr/create
```
```bash
npm init @usr@2.0.0
# 转化成
npm exec @usr/create@2.0.0
```
```bash
npm init @usr/foo@2.0.0
# 转化成
npm exec @usr/create-foo@2.0.0
```

## `exec`命令
从本地或远程npm包中运行命令，别名`x`
