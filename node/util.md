```mjs
import fs from 'fs'
import path from 'path'

/**
 * 确保路径存在
 * @param {string} p 路径
 * @example
 * ensurePath('/User/a/b')
 * ensurePath('/User/a/file.txt')
 */
function ensurePath(p) {
  const deepPath = path.resolve(p);

  if (fs.existsSync(deepPath)) return

  // 有文件
  if (path.extname(deepPath)) {
    const dir = path.dirname(deepPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(deepPath, '')
  } else {
    fs.mkdirSync(deepPath, { recursive: true })
  }
}
```