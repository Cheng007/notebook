#!/usr/bin/env node

// 自动生成 README.md 文件内容

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const blackFile = ['readme.md', '泛泛而谈.md']
const blackDir = ['img', 'temp']

const readmePath = path.resolve(__dirname, './README.md')

async function getDir() {
  const genContent = (dir, deep = 0) => {
    const list = fs.readdirSync(dir, { withFileTypes: true })
    return list.filter(i => {
      if (
        i.isDirectory()
        && !i.name.startsWith('.')
        && !blackDir.includes(i.name.toLowerCase())
      ) return true
      if (i.isFile()) {
        return i.name.endsWith('.md') && !blackFile.includes(i.name.toLowerCase())
      }
      return false
    }).sort((a, b) => {
      if (a.isFile() && !b.isFile()) {
        return -1;
      } else if (!a.isFile() && b.isFile()) {
        return 1;
      } else {
        return a.name.localeCompare(b.name);
      }
    }).map(i => {
      if (i.isDirectory()) {
        const title = `#`.repeat(deep + 1) + ' ' + i.name
        const children = genContent(`${dir}/${i.name}`, deep + 1)
        return '\n' + title + '\n' + children
      } else {
        const filename = i.name.slice(0, -3)
        const relativePath = path.relative(__dirname, dir)
        const url = encodeURIComponent(`${relativePath}/${filename}.md`)
        const item = `- [${filename}](${url})`
        return item
      }
    }).join('\n')
  }

  const content = genContent(__dirname)
  await fs.promises.writeFile(readmePath, content, { encoding: 'utf8' })
}

getDir()
