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

## Vue2 中 provide/inject
Vue2 中 provide/inject 不是响应式的
可以通过下面函数的方式来实现响应式
```js
// parents
export default {
  provide() {
    return {
      getSharedData: () => ({
        activeTab: this.activeTab,
        clueId: this.clueId,
      }),
    };
  },
}
```
```js
// child
export default {
  inject: ['getSharedData'],
  computed: {
    sharedData() {
      return this.getSharedData();
    }
  }
}
```

## 从页面 A 离开到页面 B 后再回来时需要保持页面 A 的部分状态

请使用 `keepAlive` 实现，下面方法二比较麻烦还有些bug

### 方法一
`keepAlive`
利用 `<keep-alive><keep-alive>` 组件，对于需要回到之前滚动位置的可以用下面的方式
```js
export default {
  data() {
    return {
      rememberScroll: 0,
    }
  },
  beforeRouteLeave(to, from, next) {
    const scrollTop = this.$refs.containerRef?.scrollTop;
    this.rememberScroll = scrollTop;
    next();
  },
  // 缓存组件激活时调用
  activated() {
    this.$refs.containerRef.scrollTop = this.rememberScroll;
  }
}
```


### 方法二

如页面 A 中上次选中的 tab 项，回来后需要保持和上次一致

可以通过 `beforeRouteLeave` 导航守卫来实现，先保存状态至路由再跳转

```js
export default {
  beforeRouteLeave(to, from, next) {
    const toCachedQuery = {
      activeTab: String(this.activeTab),
    };
    const cacheQuery = {
      ...this.$route.query,
      ...toCachedQuery,
    };
    if (JSON.stringify(this.$route.query) !== JSON.stringify(cacheQuery)) {
      this.$router.replace({
        path: this.$route.path,
        query: cacheQuery,
      });
      next(to);
      return;
    }
    next();
  },
  data() {
    return {
      activeTab: Number(this.$route.query.activeTab || '0')
    }
  }
}
```

上面代码在路由跳转时会有报错，但不影响实现功能，可以通过下面代码来屏蔽 vue-router 报错

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 解决报错：NavigationDuplicated: Avoided redundant navigation to current location
// 该报错不影响实现功能
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
```
