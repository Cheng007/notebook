# package.json 文件里字段

## name
`name` 用于告知应用程序或软件包的名称，常用的依赖该字段的场景如：发布到 npm 时的包名

## bin
`bin` 是命令到本地文件的映射

## version
`version` 当前版本号，也是推送到仓库时显示的版本号，格式`Major.Minor.Patch`，npm 提供了命令来升级版本号：
```bash
npm version patch
npm version minor
npm version major
```

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
- 执行工作区命令
```bash
npm run test -w a -w main
```

## publishConfig
配置发布相关的选项。允许设置以下参数：
- registry：指定包发布的目标注册表。默认情况下，包会发布到官方的npm公共注册表，但你可以更改为其他私有或企业级的注册表。
- tag：允许你指定一个标签，而不是默认的"latest"标签。这对于管理不同版本的发布非常有帮助，确保只有确定的版本被标记为最新。
- access：控制谁可以访问你的包。可能的值包括`public`（任何人都可以访问）、`restricted`（只有受限的用户和开发者可以访问）和`private`（只有你自己可以访问）。

## files
npm包作为依赖安装时要包括的文件

## peerDependencies
对等依赖，用于声明当前包所依赖的外部包的版本范围。这些外部包通常是与当前包一起使用的库或框架。
假如你正在开发一个 webpack 插件 W， W 依赖于 webpack4，
则需要指明类似：`{"peerDependencies": "4.0.0"}`，如果宿主环境安装了不兼容的 webpack 版本5，则在`npm i` 的时候会报错，
尝试解决办法：

- 安装时忽略 peerDependencies 的版本冲突
```bash
npm i --legacy-peer-deps
```

- 使用`overrides`字段
```json
{
  "overrides": {
    "webpack": ">=5.0.0"
  }
}
```

上面的方法都只是能解决安装时的报错问题，运行时是否正常取决于包和宿主环境之间的兼容性。

## imports
指定模块的依赖，可以在其中列出模块的名称和相应的路径，可以实现`路径别名`的功能。
```json
{
  "imports": {
    "name": "my-app",
    "lodash": "./node_modules/lodash-es/lodash.js",
    "@test": "./src",
  }
}
```

## exports
指定模块的导出规则。可以使用它来指定模块中哪些内容应该被导出，并指定它们的名称和导出的路径。
```json
{
  "name": "my-app",
  "exports": {
    ".": "./index.js",
    "./foo": "./lib/foo.js",
    "./bar": "./lib/bar.js"
  }
}
```
