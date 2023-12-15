# Vue 相关

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