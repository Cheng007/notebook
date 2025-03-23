# zsh

Zsh（Z Shell）是一个功能强大的 `Unix shell`，作为 `Bash` 的替代品，提供了更丰富的功能和更好的用户体验。它支持强大的自动补全、主题配置、插件扩展等特性

## 查看当前使用的 shell
```bash
echo $SHELL
```
## 将 Zsh 设置为默认 shell
```bash
chsh -s $(which zsh)
```

## Zsh 的配置文件位于用户主目录下，常用的有：

- `~/.zshrc`：每次启动 Zsh 时都会加载，适合设置别名、函数、插件等。
- `~/.zprofile`：登录时加载一次，适合设置环境变量。
- `~/.zshenv`：每次启动 Zsh 时都会加载，适合设置全局环境变量

## Oh My Zsh
Oh My Zsh 是一个流行的 Zsh 配置管理框架，提供了丰富的主题和插件