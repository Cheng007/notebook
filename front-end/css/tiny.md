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

# 子孙、兄弟元素预判
可以使用`:has()`

# line-height
1. `line-height` 是可以继承的。父元素不同的行高单位影响子元素的继承，比如：
- 父元素的行高为 `15px` 时，子元素直接继承此固定的行高
- 父元素的行高为 `150% `或 `1.5em` 时，会根据父元素的 `font-size` 先计算出行高值然后再让子元素继承
- 父元素的行高为 `1.5` 时，根据子元素的 `font-size` 动态计算出行高值让子元素继承

2. 对于行内元素（除可替换元素外）来说，尽管内容周围存在内边距与边框，但其占用空间（每一行文字的高度）由 line-height 属性决定，
即使边框和内边距仍会显示在内容周围

3. `line-height` 不同取值情况
- 1.5（无单位）
`line-height` 实际结果为 1.5 * 该元素的字体大小，推荐设置方法，不会在继承时产生不确定结果
- 150%
`line-height` 实际结果为 150% * 元素计算出的字体大小，可能产生不确定的结果
- 1.5 em
可能会产生不确定的结果

# flex 布局让子元素高度为容器的100%
```css
.container {
    display: flex;
    /* align-items: center，子元素会按自己的实际高度来 */
}
.child-100 {
    display: flex;
    /* align-items: center; */
}
```

## 关于 `box-shadlow` 阴影被覆盖问题
可以添加 `position: relative` 和 `z-index` 来解决

## `svg` 元素下 `xlink:href` 属性选择不生效问题
有如下 `svg`，需要通过CSS选择器选中 `xlink:href` 属性值为 `#qdms-icon-sousuo` 的 `use` 标签
```html
<svg>
  <use xlink:href="#qdms-icon-sousuo"></use>
</svg>
```

常规方式如下：
```css
svg use[xlink\:href="#qdms-icon-sousuo"] {

}
```
实测下来不生效，需要使用如下方式，参考[这里](https://stackoverflow.com/questions/27398745/how-to-use-css-attribute-selector-for-an-svg-element-with-namespaced-attribute-h)
```css
@namespace xlink 'http://www.w3.org/1999/xlink';
svg use[xlink|href='#qdms-icon-sousuo'] {

}
```

## 块级元素靠右

HTML 如下：
```html
<div class="parent">
  <div class="block"></div>
</div>
```
1. 使用 `margin` 属性
```css
.block {
  margin-left: auto;
}
```

将 `margin-left` 设为 `auto` 后, 元素左边的 `margin` 会被尽可能的撑大, 所以自然就把元素挤到右边去了

2. 使用 `position` 属性
```css
.parent {
  position: relative;
}
.block {
  position: absolute;
  right: 0;
}
```

3. 使用 `float` 属性
```css
.block {
  float: right;
}
```

4. 使用 `text-align` 属性
```css
.parent {
  text-align: right;
}
.block {
  display: inline-block;
}
```

5. 使用 `flex` 属性
```css
.parent {
  display: flex;
  justify-content: flex-end;
}
```

# 宽度不定元素，定宽高比实现
```html
<div class="parent">
  <div class="child"></div>
</div>
```
1. 使用 `aspect-ratio`
```css
.child {
  aspect-ratio: 1 / 1;
}
```

2. 使用 `padding-top` 或 `padding-bottom` 的原理是：垂直方向上的 `margin` 和 `padding`,使用百分比做单位时，是根据父元素的宽度作为标准的来进行计算的
```css
.parent{
  width: 500px;
  height: 500px;
}
.child{
  width:100%;
  height: 0;
  padding: 0;
  padding-top:75%;
}
```

# Img 图标变色
```html
<div class="icon"></div>
```
```css
.icon {
  width: 200px;
  height: 200px;
  background: red;
  /* B站字幕防遮挡就是用的这种方式 */
  -webkit-mask: url(./icon.png) no-repeat;
}
```

# 自适应多倍图
响应式背景图
```css
.img {
  /* 根据分辨率自动选择 */
  background-image: image-set(
    url('./service-1.png') 1x,
    url('./service-2.png') 2x
  );
}
```
响应式图片（图片尺寸 = CSS 尺寸 * DPR）
```html
<img srcset="img1.jpg 1x, img2.jpg 2x" />
```

# flex:1 文本超出省略
```html
<div class="flex-container">
  <div class="flex-item">
    <div class="text-container">
      这是一个很长的文本内容，当它超出容器宽度时会显示省略号...
    </div>
  </div>
</div>
```
```css
.flex-container {
  display: flex;
  width: 300px; /* 外层容器宽度 */
}

.flex-item {
  flex: 1; /* 使子元素占满剩余空间 */
  display: flex;
  min-width: 0; /* 关键：防止 flex 子元素溢出 */
}

.text-container {
  white-space: nowrap; /* 防止换行 */
  overflow: hidden; /* 隐藏超出内容 */
  text-overflow: ellipsis; /* 显示省略号 */
}
```

## 关键点
`min-width: 0`：`min-width` 默认值是 `auto`，将 `min-width` 设置为 `0` 告诉浏览器，即使内容超出容器的宽度，也应该允许元素收缩到容器大小，而不会导致溢出

原理是当你设置了 `min-width: 0;`，它实际上是在告诉浏览器，在计算 flex 布局时，不要考虑元素的最小宽度限制，而是将元素的宽度视为可以收缩到 0 的。
这样一来，即使元素的内容超出了容器的宽度，元素也会在不溢出容器的情况下收缩到容器的大小，保持布局的完整性。

## 三张背景图拼满容器，中间的图按 y 轴拉伸
```less
.box {
  @bg-top-height: 16px;
  @bg-bottom-height: 16px;
  background:
    url(./img/top.png) no-repeat center top / 100% @bg-top-height,
    url(./img/middle.png) no-repeat center @bg-top-height / 100% calc(100% - @bg-top-height - @bg-bottom-height),
    url(./img/bottom.png) no-repeat center bottom / 100% @bg-bottom-height;
}
```