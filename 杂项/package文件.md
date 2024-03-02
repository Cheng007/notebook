# package.json 文件里字段

## name
`name` 用于告知应用程序或软件包的名称，常用的依赖该字段的场景如：发布到 npm 时的包名

## bin
`bin` 是命令到本地文件的映射

## workspaces
配置在 package.json 中的 `workspaces` 字段，在根目录执行 `npm i` 的时候会 `workspace` 里的依赖软链接到根目录的`node_modules`里。
npm 大部分命令都能指定到某个或多个工作区，使用`-w`参数

- 添加新的工作区:
```bash
npm init -w packages/a -w app/main
```
- 添加依赖到工作区
```bash
npm install koa -w a
```
- 删除工作区依赖
```bash
npm uninstall koa -w a
```
- 执行工作区命名
```bash
npm run test -w a -w main
```
