# `unpkg` 

[unpkg](https://unpkg.com/) 是一个快速的全球内容交付网络，适用于 NPM 上的所有内容。
使用它可以使用如下 URL 快速轻松地从任何包加载任何文件

```
unpkg.com/:package@:version/:file
```

对于想快速编写 demo 引入第三方库非常方便

## 例子

使用固定版本
```
https://unpkg.com/react@16.7.0/umd/react.production.min.js
```

还可以使用[语义化版本](https://docs.npmjs.com/about-semantic-versioning)或 [标签](https://docs.npmjs.com/cli/v11/commands/npm-dist-tag)来代替固定版本号，或者完全省略版本/标签以使用 `latest` 标签

```
https://unpkg.com/react@^16/umd/react.production.min.js
https://unpkg.com/lodash-es
```

在URL的末尾附加 `/` 可查看包中所有文件的列表
```
https://unpkg.com/lodash-es/
```