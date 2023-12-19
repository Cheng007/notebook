## `useLayoutEffect` 和 `useEffect` 的区别
- `useEffect` 是异步执行的，而 `useLayoutEffect` 是同步执行的。
- `useEffect` 的执行时机是浏览器完成渲染之后，而 `useLayoutEffect` 的执行时机是浏览器把内容真正渲染到界面之前，会阻塞页面渲染

优先使用 `useEffect`，因为它是异步执行的，不会阻塞渲染
会影响到渲染的操作尽量放到 `useLayoutEffect` 中去，避免出现闪烁问题
`useLayoutEffect` 在服务端渲染的时候使用会有一个 warning，因为它可能导致首屏实际内容和服务端渲染出来的内容不一致