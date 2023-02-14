## 懒加载

延迟加载 (懒加载) 是一种将资源标识为非阻塞（非关键）资源并仅在需要时加载它们的策略。这是一种缩短关键渲染路径长度的方法，可以缩短页面加载时间

### 策略

综述：代码拆分可以将JS,CSS,HTML分割成小块，发送最少的关键代码，其余的部分在需要时加载
可以：入口处代码分割, 动态import

- JS，脚本类型模块 任何类型为 type="module" 的脚本标签都被视为一个 JavaScript 模块，并且默认情况下会被延迟。
- CSS，默认情况下，CSS 被视为渲染阻塞资源，因此，在 CSSOM 被构造完成之前，浏览器不会渲染任何已处理的内容。CSS 必须很薄，才能尽快交付，建议使用媒体类型和查询实现非阻塞渲染。
- Fonts，默认情况下，字体请求会延迟到构造渲染树之前，这可能会导致文本渲染延迟，可以使用`<link rel="preload" as="font" />`（preload 会预加载，但不会执行: 	Tells the browser to download a resource because this resource will be needed later during the current navigation.）
- 图片和ifarme，可以使用`loading="lazy"`来延迟加载，直到他们要出现在视口的时候
```html
<img src="image.jpg" alt="..." loading="lazy" />
<iframe src="video-player.html" title="..." loading="lazy" />
```

### preload示例
```html
<head>
  <meta charset="utf-8" />
  <title>JS and CSS preload example</title>

  <link rel="preload" href="style.css" as="style" />
  <link rel="preload" href="main.js" as="script" />

  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <h1>bouncing balls</h1>
  <canvas></canvas>

  <script src="main.js" defer></script>
</body>
```

### link `preload` 和 `prefetch` 区别
`<link rel="prefetch" href="/images/big.jpeg" />`

`preload`会以最高优先级下载（一定会下载），`prefetch`会以较低优先级在浏览器空闲的时候下载（也可能不下载）

### 与`async`/`defer` 区别
- `async` 对于普通脚本，如果存在 `async` 属性，那么普通脚本会被并行请求，并尽快解析和执行。 对于模块脚本，如果存在 async 属性，那么脚本及其所有依赖都会在延缓队列中执行，因此它们会被并行请求，并尽快解析和执行。 该属性能够消除解析阻塞的 Javascript。解析阻塞的 Javascript 会导致浏览器必须加载并且执行脚本，之后才能继续解析。defer 在这一点上也有类似的作用，多个`async`脚步先加载完的会先执行

- `defer`，这个布尔属性被设定用来通知浏览器该脚本将在文档完成解析后，触发 DOMContentLoaded 事件前执行。 有 defer 属性的脚本会阻止 DOMContentLoaded 事件，直到脚本被加载并且解析完成，defer 属性对模块脚本没有作用 —— 他们默认 defer，多个`defer`会按照文档中的顺序执行

- 使用 `async`/`defer` 属性在加载脚本的时候不阻塞 HTML 的解析，defer 加载脚本执行会在所有元素解析完成，DOMContentLoaded 事件触发之前完成执行。它的用途其实跟 preload 十分相似

![看图](./img/script-async-defer.jpeg)
