# Vue 相关

## 官方文档
见[这里](https://cn.vuejs.org/)

## 组件二次封装透传
- 属性和事件等：`$attrs` 对象包含了除组件所声明的 `props` 和 `emits` 之外的所有其他 attribute，例如 class，style，v-on 监听器等等
(vue2 中事件没集合到 $attrs 里需单独设置 v-on="$listeners")
<!-- inheritAttrs: false -->
- slot 
- 实例方法
目前没有很好的方法统一透传，只能手动重新处理

```vue
<template>
  <div>
    <el-select v-bind="$attrs" ref="targetRef">
      <template v-for="(value, name) in $slots" #[name]="scopeData">
        <slot :name="name" v-bind="scopeData || {}"></slot>
      </template>
    </el-select>
  </div>
</template>
<script setup>
import { onMounted, ref, defineExpose } from 'vue'

const expose = {}

const targetRef = ref(null)

onMounted(() => {
  for (const [method, fn] in Object.entries(targetRef.value)) {
    expose[method] = fn
  }
})

defineExpose(expose)
</script>
```

## nextTick

当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个“tick”才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。
`nextTick()` 可以在状态改变后立即使用，以等待 DOM 更新完成。
底层是通过 Promise.then 来实现的

## Vue 组件优化常用手段
- 使用 `computed` 缓存重复计算变量
- 对于需要频繁切换的视图，使用 `v-show` 代替 `v-if`
- 路由组件使用 `keep-alive` 缓存
- 循环列表中指明 key
- 避免在模板中直接使用内联函数和对象（会导致每次渲染是都创建新的）