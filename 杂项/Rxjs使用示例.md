- 输入提示（type-ahead）建议
```js
import { fromEvent } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'

const searchBox = document.getElementById('input')

// 从输入中监听数据
const typeahead = fromEvent(searchBox, 'input').pipe(
  map(e => e.target.value),
  // 移除空字符，并确保它达到了最小长度
  filter(text => text.length > 2),
  // 防抖（这样才能防止连续按键时每次都发起API请求，而应该等到按键出现停顿时才发起）
  debounceTime(300),
  // 如果输入值没有变化，则不要发起请求（比如按某个字符，然后快速按退格）
  distinctUntilChanged(),
  // 如果已发出的 AJAX 请求的结果会因为后续的修改而变得无效，那就取消它
  switchMap(() => ajax('/api/endpoint'))
)

typeahead.subscribe(data => {
  // Handle the data from the API
  console.log(data)
})
```

- 指数化退避

指数化退避是一种失败后重试 API 的技巧，它会在每次连续的失败之后让重试时间逐渐变长，
超过最大重试次数之后就会彻底放弃。
```js
import { pipe, range, timer, zip } from 'rxjs'
import { ajax } from 'rxjs/ajax'
import { retryWhen, map, mergeMap, tap } from 'rxjs/operators'

function backoff(maxTries, ms) {
  return pipe(
    retryWhen(attempts => zip(range(1, maxTries), attempts)
      .pipe(
        map(([i]) => i * i),
        mergeMap(i => timer(i * ms))
      )
    )
  )
}

ajax('/api/endpoint')
  .pipe(backoff(30, 250))
  .subscribe(data => handleData(data))

function handleData(data) {
  console.log(data)
}
```
