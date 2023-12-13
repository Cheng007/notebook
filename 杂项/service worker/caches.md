# Cache Storage
`window.caches` 是定义在[service worker](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorker)标准下，
但他不一定要配合 service workder 使用。
和 service workder 一样，`caches` 相关的方法只支持异步，Cache 接口为缓存的 Request / Response 对象对提供存储机制。
除非明确地更新缓存，否则缓存将不会被更新；除非删除，否则缓存数据不会过期。

`Cache.put`, `Cache.add` 和 `Cache.addAll` 只能在GET请求下使用
`Cache.add` / `Cache.addAll` 不会缓存 Response.status 值不在 200 范围内的响应，而 `Cache.put` 允许你存储任何请求/响应对。因此，Cache.add/Cache.addAll 不能用于不透明的响应，而 Cache.put 可以

```ts
// 先打开（或创建）缓存域
caches.open('my-test-cache-v1').then(async (cache: Cache) => {
  // 添加单个缓存
  await cache.add('/test.html')
  // 一次添加多个缓存
  await cache.addAll([
    '/test/',
    '/test/t.js',
    '/test/t1.js',
    '/test/t2.jpg'
  ])
  // 删除一个缓存
  await cache.delete('/test/t1.js')
})
```

## StorageManager
`StorageManager` 接口提供了用于管理数据本地存储权限和估算可用存储空间的接口。
可以使用 `navigator.storage` 对此接口进行引用。