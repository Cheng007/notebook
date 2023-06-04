## type
类型别名，可以为任意类型命名
```ts
interface Animal {
  name: string
}
interface Bear extends Animal {
  honey: boolean
}

interface Window {
  title: string
}
interface Window {
  ts: TypeScriptAPI
}
```

## interface
接口
```ts
type Animal = {
  name: string
}

type Bear = Animal & { 
  honey: Boolean 
}

type Window = {
  title: string
}

type Window = {
  ts: TypeScriptAPI
}

 // Error: Duplicate identifier 'Window'.
```

## 区别

在大多数情况下 `type` 和 `interface` 可以自由选择，几乎所有的 `interface` 功能都能在 `type` 中使用
`interface` 通过 `extends`扩展，`type`通过`&`扩展
`interface` 可以向现有接口添加新字段，`type` 类型创建后不能更改
`type` 不能参与声明合并，但 `interface` 可以

