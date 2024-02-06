# 如何解决img标签下面的小空隙

[demo](https://github.com/Cheng007/case-demo/blob/master/replace-element/index.html)

在 CSS 中，参与行内布局的内容被称为行级内容[inline-level content](https://developer.mozilla.org/zh-CN/docs/Glossary/Inline-level_content)。默认情况下，大多数文本、替换元素以及生成的内容都是行级的。在行内布局中，通常，它们与文本的基线进行对齐。

`vertical-align` 只对行内元素、行内块元素和表格单元格元素生效：不能用它垂直对齐块级元素。默认值为`baseline`

解决方案：
1. `display:block`
2. 修改 默认的 `vertical-align` 为 `bottom`、`top`、`middle`
3. 父元素 `font-size` 设为 0
4. 父元素 `line-height` 设为 0
