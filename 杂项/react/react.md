## `useLayoutEffect` 和 `useEffect` 的区别
- `useEffect` 是异步执行的，而 `useLayoutEffect` 是同步执行的。
- `useEffect` 的执行时机是浏览器完成渲染之后，而 `useLayoutEffect` 的执行时机是浏览器把内容真正渲染到界面之前，会阻塞页面渲染

优先使用 `useEffect`，因为它是异步执行的，不会阻塞渲染
会影响到渲染的操作尽量放到 `useLayoutEffect` 中去，避免出现闪烁问题
`useLayoutEffect` 在服务端渲染的时候使用会有一个 warning，因为它可能导致首屏实际内容和服务端渲染出来的内容不一致

## React 组件开发性能优化常用手段

1. 控制组件重新渲染的范围，只更新该更新的，灵活运用 `React.memo` 跳过重新渲染
- 一个组件触发更新会递归他所有子组件，生成新的虚拟 DOM 数，再进行 Diff，决定哪些需要提交到真实的 DOM 中
- 尽管最后更新的实际 DOM 节点不多，但组件调用和 Diff 的成本也是昂贵的。当变更的组件层级较高，或者组件内部逻辑复杂，可能会导致一些性能问题。

2. 避免组件入参的不必要变更
在使用 `React.memo` 对组件进行缓存后，默认情况下 React 将使用 Object.is 来浅比较每个 prop，就意味着当存在数组、对象、函数等形式入参时需要注意，否则 Memo 可能永远不会生效
- 对于需要生成数组、对象等场景，可使用 `useMemo` 来跳过重复生成，在不更新时保持引用不变。需要避免直接在 JSX 内直接写字面量来创建新的数组、对象。
- 对于需要向子组件传递回调函数等场景，可使用 `useCallback` 来缓存需传入的回调函数，使得此函数在父组件重新渲染时不会被重新生成，保持函数引用不变。需要避免在 JSX 内传参时写内联函数，防止在每次渲染时重新创建函数。
- 对于使用了 Context 上下文的场景，向 Provider 传递 Value 时如果 Value 是一个对象类型，可以将其用 `useMemo` 包裹，否则所有依赖此上下文的子组件都将随着 Provider 的父组件的重渲染而渲染，哪怕此子组件已经被 memo 包裹。

3. 避免频繁、重复、无意义的 setState
调用 setState 即意味着即将触发重新渲染
- 和页面展示/更新无关的数据，不维护在 state 中，如果这个变量都不会在界面上显示，或者说，不会因为这个变量的改变而触发更新，可以考虑不在 state 中维护，例如，像做计数器之类的变量，可以使用 useRef 存储。
- 合并 state，减少频繁 setState 的场景。

## 从列表进详情页然后返回列表，如何保存列表页查询状态
1. 在跳转之前保存列表查询条件至 history 的 state 中，
2. 正常跳转到详情页
3. 返回列表页时从当前 history 的 state 里拿到保存列表查询条件并重新获取列表数据

参考伪代码：
```js
// below code in list page

const search = {
  name: '1',
  pageSize: 10,
  pageNum: 1,
}

// 步骤1
history.replace(
  'currentPathname', // replace 当前路由
  state: search // 同时保存查询参数到当前路由state中
)

// 步骤2
history.push(
  'detailPathname',
  state: 'targetRouteState'
)

// 步骤3
hisotry.state
```