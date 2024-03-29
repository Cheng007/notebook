`#!` 是一个在脚本文件顶部常见的 shebang 行，用于指示操作系统使用特定环境来执行该脚本。
通过这种方式，可以利用 Node.js 环境来运行脚本，而无需在命令行中显示的调用 node 命令。这是一种常见的做法，特别是在开发 Node.js 命令行工具时。

要使用 node `#!` 可以按照如下步骤：
1. 安装 Node.js
2. 编写脚本：如创建文件 `test.js`，在文件的开头添加一行 `#!/usr/bin/env node`。这就是所谓的 shebang 行。它的作用是告诉系统使用Node.js环境来执行这个脚本。
3. 保存并运行：在 Unix-like 系统中，可能需要给脚本添加可执行权限 `chmod +x test.js`，然后通过 `./test.js` 来运行脚本。在 Windows 系统中，直接使用 `test.js` 即可运行。
