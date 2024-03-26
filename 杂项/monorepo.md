# monorepo

## 整合 `husky` `lint-staged` 功能

如果项目是新项目建议在项目跟目录配置，如果是老项目重新组合，且各个子项目用的配置不一样，可以参考下面的方式处理：
1. husky V8
package.json

```json
{
  "script": {
    "prepare": "cd ../../ && husky install apps/front-desk/.husky",
  }
}
```
重新运行`prepare` 命令

.husky/pre-commit
```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

# 使用合适的命令
yarn lint-staged
```

2. husky V9
package.json

```json
{
  "script": {
    "prepare": "cd ../../ && husky apps/front-desk/.husky",
  }
}
```
重新运行`prepare` 命令

.husky/pre-commit
```bash
# 使用合适的命令
yarn lint-staged
```