## 优先级如何计算的？

优先级就是分配给指定的 CSS 声明一个权重，它由 匹配的选择器中的 每一种选择器类型的 数值 决定。
而当优先级与多个 CSS 声明中任意一个声明的优先级相等的时候，CSS 中最后的那个声明将会被应用到元素上。
当同一个元素有多个声明的时候，优先级才会有意义。因为每一个直接作用于元素的 CSS 规则总是会覆盖该元素从祖先元素继承而来的规则。
文档树中元素的接近度（Proximity of elements）对优先级没有影响

### 简单来说，优先级如下
1. !important
2. 内联样式(如`style="font-weight:bold"`)，权重1千
3. ID选择器(如`#example`)，权重1百
4. 类选择器(如`.example`)，属性选择器(如`[type="radio"]`)，伪类(如`:hover`)，权重1十
5. 标签选择器(如`h1`)，伪元素（如`::before`），权重1个
6. `:where` 权重为 0

本质上，不同类型的选择器有不同的分数值，把这些分数相加就得到特定选择器的权重
在相同权重的多条规则，后面的规则覆盖前面的规则

### 权重计算：
- 通用选择器 (*)，组合符 (+, >, ~, ' ')，和否定伪类 (:not) 不会影响优先级
- 在进行计算时不允许进行进位，例如，20 个类选择器仅仅意味着 20 个十位，而不能视为 两个百位，也就是说，无论多少个类选择器的权重叠加，都不会超过一个 ID 选择器

| 选择器 | 千位 | 百位 | 十位 | 个位 | 优先级 |
| ----- | ---- | ---- | ---- | ---- | ---- |
| h1 | 0 | 0 | 0 | 1 | 0001 |
| h1 + p::first-letter | 0 | 0 | 0 | 3 | 0003 |
| li > a[href*="en-US"] > .inline-warning | 0 | 0 | 2 | 2 | 0022 |
| #identifier | 0 | 1 | 0 | 0 | 0100 |
| 内联样式 | 1 | 0 |0 | 0 | 1000 |


#### 一些经验法则：

- 一定要优先考虑使用样式规则的优先级来解决问题而不是 !important
- 只有在需要覆盖全站或外部 CSS 的特定页面中使用 !important
- 永远不要在你的插件中使用 !important
- 永远不要在全站范围的 CSS 代码中使用 !important

### 与其使用 !important，你可以：
1. 使用更具体的规则。在选择的元素之前，增加一个或多个其他元素，使选择器变得更加具体，并获得更高的优先级。
```html
<div id="test">
  <span>Text</span>
</div>
```

```css
div#test span { color: green; }
div span { color: blue; }
span { color: red; }
```

无论 c​ss 语句的顺序是什么样的，文本都会是绿色的（green），因为这一条规则是最有针对性、优先级最高的。
（同理，无论语句顺序怎样，蓝色 blue 的规则都会覆盖红色 red 的规则）

2. 对于上面的一种特殊情况，当无其他要指定的内容时，可以复制简单的选择器以增加特异性。
```css
#myId#myId span { color: yellow; }
.myClass.myClass span { color: orange; }
```

### 怎样覆盖 `!important`
- 再添加一条带 `!important` 的CSS规则，再给这个选择器更高的优先级（添加一个标签，ID或类）
- 使用相同的选择器，但是置于已有的样式之后

### 无视DOM树中的距离
```css
body h1 {
  color: green;
}

html h1 {
  color: purple;
}
```
当它应用在下面的 HTML 时：
```html
<html>
  <body>
    <h1>Here is a title!</h1>
  </body>
</html>
```
`h1` 将会渲染成 purple，在同一优先级权重时，后面的规则覆盖前面的规则

### 直接添加样式 vs. 继承样式
为目标元素直接添加样式，永远比继承样式的优先级高，无视优先级的遗传规则
```css
#parent {
  color: green;
}

h1 {
  color: purple;
}
```
当它应用在下面的 HTML 时：
```html
<html>
  <body id="parent">
    <h1>Here is a title!</h1>
  </body>
</html>
```
`h1` 将会渲染成 purple


### 参考
[层叠与继承](https://developer.mozilla.org/zh-CN/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance#%E7%90%86%E8%A7%A3%E5%B1%82%E5%8F%A0)
