# overflow:auto页面滚动条出现时不跳动

关于浏览器出现滚动条和消失页面不滚动终极的解决方案，经过大型项目实践已经验证相当具有可行性，代码如下：
```css
html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}
```

## 参考：
[小tip:CSS vw让overflow:auto页面滚动条出现时不跳动](http://www.zhangxinxu.com/wordpress/2015/01/css-page-scrollbar-toggle-center-no-jumping/)