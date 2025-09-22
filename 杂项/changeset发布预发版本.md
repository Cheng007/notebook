在一个使用 **Changesets** 作为版本管理和发布工具的项目中，如何设置并发布一个预发布版本（例如 `alpha`、`beta`、`rc`）到对应的分支（如 `alpha` 分支）。

### 核心概念

1.  **Changesets**: 一个用于管理版本号和变更日志（CHANGELOG）的工具，特别适合 Monorepo。它通过开发者提交的 changeset 文件来决定版本升级的类型（major, minor, patch）并生成更新日志。
2.  **预发布版本（Pre-release versions）**: 例如 `1.2.3-alpha.0`, `1.2.3-beta.1`, `1.2.3-rc.2`。这些版本表示尚未稳定、用于测试的版本。
3.  **发布分支（Release branch）**: 如 `alpha`, `beta`, `next` 分支。通常用于隔离特定阶段的代码，并与 npm 的 `dist-tag` 关联。

### 目标场景

有一个主分支（`main` 或 `master`）用于稳定版发布，同时还有一个 `alpha` 分支用于发布最新的、可能不稳定的功能进行测试。希望所有进入 `alpha` 分支的提交都能自动发布一个 `alpha` 版本的包到 npm，并打上 `alpha` 标签。

---

### 完整工作流程和步骤

#### 第一步：初始化和设置

1.  **安装并配置 Changesets**

    ```bash
    npm install --save-dev @changesets/cli
    npx changeset init
    ```

2.  **创建并切换到 `alpha` 分支**
    ```bash
    git checkout -b alpha
    git push origin alpha
    ```

#### 第二步：配置 Changesets 进行预发布

关键的配置在 `.changeset/config.json` 文件中。

```json
{
  "$schema": "https://unpkg.com/@changesets/config@3.0.0/schema.json",
  "changelog": "@changesets/cli/changelog",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "restricted",
  "baseBranch": "alpha", // 1. 重要：将基础分支改为 alpha
  "ignore": [],
  "___experimentalUnsafeOptions_WILLYOUCHANGEMEINTHEFUTURE": {
    "onlyUpdatePeerDependentsWhenOutOfRange": true
  },
  "updateInternalDependencies": "patch",
  "privatePackages": {
    "version": true,
    "tag": true
  }
}
```

**关键配置解释：**

- `"baseBranch": "alpha"`： 这告诉 Changesets，当前（在 alpha 分支上）进行版本计算和发布时，应该基于 `alpha` 分支的提交历史，而不是 `main`。**这是最重要的一步。**

#### 第三步：进入预发布模式

在 `alpha` 分支上，执行以下命令来进入预发布模式，并指定预发布的标识符为 `alpha`。

```bash
npx changeset pre enter alpha
```

这个命令会：

- 在 `.changeset/config.json` 中自动添加一个 `"preid"` 字段。
- 在 `.changeset/pre.json` 中创建一个文件，记录当前正处于 `alpha` 预发布模式。

此时的 `config.json` 会变成：

```json
{
  ... // 其他配置保持不变
  "baseBranch": "alpha",
  "preid": "alpha" // 新增了这一行
}
```

#### 第四步：日常开发流程

现在， `alpha` 分支已经设置好了。日常的工作流程如下：

1.  **进行代码更改**：在 `alpha` 分支或从其切出的特性分支上进行开发。
2.  **生成 changeset**：完成功能后，添加一个 changeset 来描述变更。
    ```bash
    npx changeset
    ```
    - 选择适当的版本类型（patch, minor, major）。Changesets 会**自动**将其转换为预发布版本（例如，如果选择了 `minor`，实际版本号可能是 `2.1.0-alpha.0` -> `2.1.0-alpha.1`）。
3.  **提交并推送代码**：
    ```bash
    git add .
    git commit -m "feat: add some new feature"
    git push origin alpha
    ```

#### 第五步：发布 Alpha 版本

当准备发布一个新的 alpha 版本时（可以是手动触发，也可以是 CI/CD 自动触发）：

1.  **版本号更新和包发布**：

    ```bash
    npx changeset version
    npx changeset publish
    ```

    - `npx changeset version`：会读取所有的 changeset 文件，**提升预发布版本号**（例如从 `alpha.0` 到 `alpha.1`），更新 `package.json`，生成 CHANGELOG.md，然后**删除**已使用的 changeset 文件。
    - `npx changeset publish`：会将新版本的包发布到 npm registry，并**自动使用 `--tag alpha`**。这意味着用户需要使用 `npm install your-package@alpha` 来安装它，而不是 `npm install your-package`（默认安装的是 `latest` 标签的稳定版）。

2.  **提交发布结果**：将 `package.json` 和 `CHANGELOG.md` 的更改提交并推送到 `alpha` 分支。
    ```bash
    git add .
    git commit -m "chore: release alpha version"
    git push origin alpha
    ```

#### 第六步：退出预发布模式（当要发布正式版时）

当觉得 alpha 测试完毕，准备发布正式版时：

1.  **将代码合并到主分支**（例如 `main`）：

    ```bash
    git checkout main
    git merge alpha --no-ff
    ```

2.  **在主分支上退出预发布模式**：

    ```bash
    # 确保在主分支上
    git checkout main
    # 退出预发布模式
    npx changeset pre exit
    ```

3.  **在主分支上进行正式发布**：

    ```bash
    npx changeset version
    npx changeset publish
    ```

    这次发布将会是一个**稳定版本**（例如 `2.1.0`），并且会打上 `latest` 标签。

4.  **（可选）重新进入预发布模式**：如果希望 `alpha` 分支继续为下一个大版本（如 `2.2.0-alpha.0`）工作，需要切回 `alpha` 分支并再次执行 `npx changeset pre enter alpha`。

---

### 与 CI/CD 集成

在实际项目中，以上发布流程（第五步）通常由 CI/CD 系统（如 GitHub Actions）在向 `alpha` 分支推送代码时自动完成。

一个简单的 GitHub Actions 工作流示例 (.github/workflows/release-alpha.yml)：

```yaml
name: Release Alpha
on:
  push:
    branches: [alpha]

jobs:
  release:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/alpha'
    steps:
      - name: Checkout Repo
        uses: actions/checkout@v4
        with:
          # 需要获取全部的提交历史以供 changeset 计算
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Create Release
        id: changesets
        uses: changesets/action@v1
        with:
          # 这个 Action 会自动执行 version 和 publish
          publish: npm run release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### 总结

| 步骤               | 关键命令/配置                                    | 说明                                  |
| :----------------- | :----------------------------------------------- | :------------------------------------ |
| **1. 初始化**      | `npx changeset init`                             | 创建基础配置                          |
| **2. 创建分支**    | `git checkout -b alpha`                          | 创建预发布分支                        |
| **3. 配置分支**    | `"baseBranch": "alpha"`                          | 在 config.json 中修改基础分支         |
| **4. 进入预发布**  | `npx changeset pre enter alpha`                  | 进入 alpha 预发布模式                 |
| **5. 开发 & 提交** | `npx changeset`                                  | 添加变更说明                          |
| **6. 发布**        | `npx changeset version && npx changeset publish` | **自动**发布带 `alpha` 标签的预发布版 |
| **7. (最终) 退出** | `npx changeset pre exit`                         | 在主分支退出预发布模式，发布稳定版    |

通过这个流程，可以清晰地将不稳定代码隔离在 `alpha` 分支，并自动化地发布预发布版本供测试者使用，而不影响主分支的稳定版本。
