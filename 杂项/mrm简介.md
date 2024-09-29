# mrm 简介

构建前端项目会使用很多的工具，比如 ESLint、Prettier、Webpack、Babel、Husky、lint-staged、git 、编辑器等等。创建一个项目配置起来相当繁琐。

我们可以使用 mrm 快速配置这些常用工具

mrm 预设了很多任务，通过执行`npx mrm`可以查看所有预设支持的配置
```bash
ci                Adds GitHub Actions workflow to run Node.js tests
codecov           Adds Codecov
contributing      Adds contributing guidelines
dependabot        Adds GitHub Actions workflow to automerge Dependabot pull requests
editorconfig      Adds EditorConfig
eslint            Adds ESLint
gitignore         Adds .gitignore
jest              Adds Jest
license           Adds license file
lint-staged       Adds lint-staged
package           Adds package.json
prettier          Adds Prettier
readme            Adds readme file
semantic-release  Adds semantic-release
styleguidist      Adds React Styleguidist
stylelint         Adds Stylelint
travis            Adds Travis CI
typescript        Adds TypeScript
```