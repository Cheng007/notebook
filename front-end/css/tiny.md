# :root

`:root` 这个 CSS 伪类匹配文档数的根元素。对于 HTML 来说，`root` 表示 `<html>` 元素，除了优先级更高之外，与 `html` 选择器相同。

# CSS 选择器种类
基本选择器
- 通配，*
- 标签，如 `h1`
- 类，如 `.box`
- ID，如 `#unique`
- 属性，如 `a[title]` 或 `a[href="https://example.com"]`

伪选择器
- 伪类，用来表示一个元素的特定状态，如 `a:hover`
- 伪元素，用于表示无法用 HTML 语义表达的实体，如 `p::first-line`

分组选择器
- `,`

组合选择器
- 后代， ` `，选择前一个元素的后代节点，如 `div span`
- 直接子代，`>`，选择前一个元素的直接子代节点，如 `ul > li`
- 一般兄弟，`~`，选择后一个节点在前一个节点后面任意位置，并且共享同一个父节点。，如 `p ~ span`
- 紧邻兄弟，`+`，选择相邻后一个紧跟的元素，并且共享同一个父节点，如 `h2 + p`
- 列组合，`||`，选择属于某个表格行的节点

# 常见伪类
- `:active`, `:focus`, `:hover`, `:visited`,
- `:disabled`, `:valid`, `:checked`, `:enabled`,
- `:first`, `:first-child`, `:first-of-type`, `:nth-of-type`, `:nth-last-child`, `:nth-last-of-type`, `:only-child`, `:only-of-type`
- `:empty`, `:root`
- `:where()`, `:is()`

# 常见伪元素
`::after`, `::before`, `::first-line`, `::first-letter`, `::selection`

# `:is()`和`:where()`区别
`:is()`和`:where()`都可接受一个可容错选择器列表,`:is()`计入整体选择器优先级，而`:where()`优先级为0

在 CSS 中使用选择器列表时，如果任何选择器无效，则整个列表被视为无效。当使用 `:is()` 或 `:where()` 而不是整个选择器列表时，如果某个选择器无法解析，则被视为无效，不正确或不受支持的选择器将被忽略，其他选择器将被使用
```css
/*即使在不支持 :unsupported 的浏览器中，仍将正确解析 :valid*/
:is(:valid, :unsupported) {
  /* … */
}

/*在不支持 :unsupported 浏览器中即使它们支持 :valid，仍将忽略*/
:valid,
:unsupported {
  /* … */
}
```

# 祖先元素预判
可以使用`:is()`或`:where()`

# 子孙元素预判
可以使用`:has()`
