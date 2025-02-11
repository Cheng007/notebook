# svgicon

## vue-cli 项目如何在某个 svg 文件夹按 svg icon 方式使用，其它文件夹的 svg 文件还是使用 img 标签

相关文件路径

```
src
  main.js
  vue.config.js
  package.json
  components
    svg-icon
      index.js     // 组件注册及 svg 图标全量引入
      index.vue    // 组件实现
      demo.vue     // 组件示例
      viewer.vue   // 支持查看所有 svg 图标
      svg          // 存放所有的 svg 图标资源
        arrow.svg
        ...
```

1. 安装 `svg-sprite-loader`
```bash
npm install svg-sprite-loader --save-dev
```

2. 配置 `vue.config.js`
```js
const path = require('path');

module.exports = {
  chainWebpack: config => {
    // svg icon 文件夹
    const svgIconPath = path.resolve(__dirname, 'src/components/svg-icon');

    // 默认的 SVG 规则排除特定文件夹
    const svgRule = config.module.rule('svg');
    svgRule.exclude.add(svgIconPath);

    // 添加新的规则来处理特定文件夹中的 SVG 文件
    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(svgIconPath)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
  }
};
```

3. 相关代码

- 组件实现
```vue
<!-- src/components/svg-icon/index.vue -->
<template>
  <svg
    :class="svgClass"
    aria-hidden="true"
  >
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    name: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`;
    },
    svgClass() {
      return this.className ? `svg-icon ${this.className}` : 'svg-icon';
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
```

- 组件注册及 svg 图标全量引入
```js
// src/components/svg-icon/index.js
import Vue from 'vue';
import SvgIcon from '@/components/svg-icon/index.vue';

Vue.component('svg-icon', SvgIcon);

const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context(
  '@/components/svg-icon/svg',
  // 是否遍历子目录
  false,
  /\.svg$/,
);
requireAll(req);
```

- 项目中全局引入
```js
// src/main.js

import '@/components/svg-icon';
```

- 支持查看所有 svg 图标
```vue
<!-- src/components/svg-icon/viewer.vue -->
<template>
  <div class="svg-icon-viewer">
    <div class="icon-list">
      <div
        v-for="icon in icons"
        :key="icon"
        class="icon-item"
      >
        <svg-icon :name="icon" />
        <span class="icon-name">{{ icon }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SvgIconViewer',
  data() {
    return {
      icons: [], // 存储所有图标的名称
    };
  },
  created() {
    this.loadIcons();
  },
  methods: {
    loadIcons() {
      // 动态加载 SVG 图标文件夹中的所有文件
      const requireContext = require.context(
        '@/components/svg-icon/svg',
        false,
        /\.svg$/,
      );

      // 提取图标名称
      this.icons = requireContext.keys().map(file => file.replace(/^\.\/(.*)\.svg$/, '$1'));
    },
  },
};
</script>

<style scoped>
.svg-icon-viewer {
  padding: 20px;
}

.icon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.icon-name {
  font-size: 14px;
  color: #666;
}
</style>
```

svg 图标使用示例
```vue
<template>
  <div>
    <p>基础使用</p>
    <svg-icon name="arrow" />

    <p>默认继承父级的字体颜色和大小</p>
    <div style="color: orange; font-size: 18px;">
      <svg-icon name="arrow" />
      内容
    </div>

    <p>修改颜色</p>
    <svg-icon
      name="arrow"
      color="#f00"
    />

    <p>修改大小</p>
    <svg-icon
      name="arrow"
      font-size="30"
    />
  </div>
</template>
```

其它非 svg 图标使用示例
```vue
<template>
  <div>
    <img src="@/assets/logo.svg" />
  </div>
<template>
```

### 使用 svg-icon 组件时 `click` 事件不生效？
使用 `@click.native` 即可（vue3无需加`.native`）
