---
title: NuxtJS入门指南
publishDate: "2025-02-17"
updatedDate: "2025-02-20"
categories: ['前端', '框架', 'NuxtJS']
tags: ['NuxtJS', 'javascript']
ai: true
---
> 本文由ai自动生成，仅供参考。
<p><p>## Nuxt.js 3.0 入门指南

### 介绍

Nuxt.js 是一个基于 Vue.js 的高性能框架，它为开发人员简化了构建服务端渲染 (SSR) 应用的流程。Nuxt.js 3.0 是该框架的最新版本，在性能、开发体验和功能方面都有显著改进。本指南将帮助您快速入门 Nuxt.js 3.0，展示如何使用其核心功能构建一个简单的应用。

### 安装与设置

要开始使用 Nuxt.js 3.0，首先确保您的开发环境中安装了 Node.js（推荐版本 14 及以上）。接下来，可以通过命令行工具创建新的 Nuxt 项目。

```bash
npx nuxi init my-nuxt-app
cd my-nuxt-app
npm install
```

执行以上命令后，您会看到一个新的文件夹 `my-nuxt-app`，其中包含 Nuxt.js 的基本项目结构。

### 项目结构

Nuxt.js 3.0 的项目结构与之前的版本略有不同。以下是主要的文件和文件夹说明：

- **`/pages`**: 存放页面组件，Nuxt 会根据此文件夹的结构自动生成路由。
- **`/layouts`**: 用于定义应用的布局，您可以为不同页面指定不同的布局。
- **`/components`**: 存放可复用的 Vue 组件。
- **`/plugins`**: 用于定义应用的插件，您可以在此注册 Vue 插件或其他库。
- **`/store`**: Vuex 状态管理，管理应用状态。
- **`/middleware`**: 用于定义中间件，应用路由守卫。
- **`/assets`**: 存放静态文件，如样式、图片等。
- **`nuxt.config.ts`**: 配置文件，用于定义 Nuxt 的配置选项。

### 创建页面

在 Nuxt.js 中，创建页面非常简单。您只需要在 `/pages` 文件夹中创建 `.vue` 文件即可。

例如，我们创建一个 `index.vue` 文件：

```vue
<template>
  <div>
    <h1>欢迎来到我的 Nuxt.js 3 应用！</h1>
    <nuxt-link to="/about">关于我们</nuxt-link>
  </div>
</template>

<script setup>
</script>

<style>
h1 {
  color: #3490dc;
}
</style>
```

接下来，我们创建一个 `about.vue` 文件：

```vue
<template>
  <div>
    <h1>关于我们</h1>
    <nuxt-link to="/">返回首页</nuxt-link>
  </div>
</template>

<script setup>
</script>

<style>
h1 {
  color: #e3342f;
}
</style>
```

### 路由

当您创建页面组件时，Nuxt.js 会自动为其生成路由。例如，`index.vue` 对应根路径 `/`，而 `about.vue` 对应路径 `/about`。

运行开发服务器：

```bash
npm run dev
```

打开浏览器，访问 `http://localhost:3000/`，您将看到主页，并可以通过点击链接跳转到 "关于我们" 页面。

### 创建布局

在 Nuxt.js 中，您可以使用布局来管理页面的整体结构。我们可以在 `/layouts` 文件夹中创建一个新的布局 `default.vue`：

```vue
<template>
  <div>
    <header>
      <h1>我的 Nuxt.js 应用</h1>
      <nav>
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/about">关于我们</nuxt-link>
      </nav>
    </header>
    <main>
      <nuxt-page />
    </main>
    <footer>
      <p>© 2023 我的 Nuxt.js 应用</p>
    </footer>
  </div>
</template>

<script setup>
</script>

<style>
header {
  background: #3490dc;
  color: white;
  padding: 1em;
}

footer {
  text-align: center;
  padding: 1em;
}
</style>
```

### 使用组件

在 `/components` 文件夹中，您可以存放可复用的 Vue 组件。例如，您可以创建一个按钮组件 `BaseButton.vue`：

```vue
<template>
  <button @click="handleClick" class="base-button" :style="{ backgroundColor }">
    <slot />
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  backgroundColor: {
    type: String,
    default: '#3490dc'
  }
});

const handleClick = () => {
  console.log('按钮被点击了');
};
</script>

<style>
.base-button {
  color: white;
  padding: 0.5em 1em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

现在，我们可以在 `index.vue` 页面中使用这个按钮组件：

```vue
<template>
  <div>
    <h1>欢迎来到我的 Nuxt.js 3 应用！</h1>
    <BaseButton background-color="#e3342f">点击我</BaseButton>
    <nuxt-link to="/about">关于我们</nuxt-link>
  </div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
</script>

<style>
h1 {
  color: #3490dc;
}
</style>
```

### 状态管理

在 Nuxt 3 中，Vuex 状态管理依然适用，但官方推荐使用 `pinia` 作为新的状态管理解决方案。以下是如何在 Nuxt.js 3 项目中使用 `pinia` 的步骤：

1. 首先安装 `pinia`：

   ```bash
   npm install pinia
   ```

2. 在 `nuxt.config.ts` 中添加 `pinia` 插件：

   ```typescript
   import { defineNuxtConfig } from 'nuxt';

   export default defineNuxtConfig({
     buildModules: ['@pinia/nuxt'],
   });
   ```

3. 创建一个新的 store。在 `/stores` 文件夹中创建 `useCounterStore.js`：

   ```javascript
   import { defineStore } from 'pinia';

   export const useCounterStore = defineStore('counter', {
     state: () => ({
       count: 0,
     }),
     actions: {
       increment() {
         this.count++;
       },
       decrement() {
         this.count--;
       },
     },
   });
   ```

4. 在页面中使用 store：

```vue
<template>
  <div>
    <h1>计数器: {{ counter.count }}</h1>
    <button @click="counter.increment">增加</button>
    <button @click="counter.decrement">减少</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/useCounterStore';

const counter = useCounterStore();
</script>

<style>
h1 {
  color: #3490dc;
}
</style>
```

### API 请求

在 Nuxt.js 3.0 中，您可以利用 `asyncData` 和 `fetch` 方法进行 API 请求。以下示例展示了如何在页面加载时获取数据：

```vue
<template>
  <div>
    <h1>用户列表</h1>
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([]);

const fetchUsers = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  users.value = await response.json();
};

// 在组件加载时请求数据
fetchUsers();
</script>

<style>
h1 {
  color: #3490dc;
}
</style>
```

### 中间件

中间件是处理路由守卫的有效方式。您可以在 `/middleware` 文件夹中创建一个新的中间件 `auth.js`，用于检查用户是否已认证：

```javascript
export default defineNuxtRouteMiddleware((to, from) => {
  const isAuthenticated = /* 检查用户是否已登录的逻辑 */;
  if (!isAuthenticated) {
    return navigateTo('/login');
  }
});
```

然后，您可以在页面中添加中间件：

```javascript
export default definePageMeta({
  middleware: 'auth',
});
```

### 插件

Nuxt.js 允许您在应用中注册 Vue 插件。在 `/plugins` 文件夹中创建自定义插件。例如，创建一个插件 `my-plugin.js`：

```javascript
export default defineNuxtPlugin((nuxtApp) => {
  // 在这里注册 Vue 插件
  nuxtApp.vueApp.config.globalProperties.$myPluginFunction = () => {
    console.log('Hello from my plugin!');
  };
});
```

您可以在组件中使用此插件：

```vue
<template>
  <button @click="callMyPluginFunction">调用插件函数</button>
</template>

<script setup>
const callMyPluginFunction = () => {
  $myPluginFunction();
};
</script>
```

### 部署

部署 Nuxt.js 应用可以选择多种方式，例如 Vercel、Netlify 或传统的 VPS。以 Vercel 为例，您只需遵循以下步骤：

1. 在 Vercel 上创建一个新项目。
2. 将您的应用代码推送到 GitHub 或 GitLab。
3. 在 Vercel 上选择您推送的仓库进行自动部署。

Vercel 会自动检测到 Nuxt.js 应用并为其配置适当的构建设置。

### 总结

通过本指南，您已经了解了 Nuxt.js 3.0 的基本用法，包括：

- 项目设置与目录结构
- 页面、布局与组件的创建
- 状态管理与 API 请求
- 路由守卫与中间件的使用
- 插件的注册与使用
- 应用的部署

Nuxt.js 3.0 具有更快的性能和更好的开发体验，是构建现代 Web 应用的理想选择。随着您深入学习和实践，相信您能够使用 Nuxt.js 构建出高质量的应用。希望这篇指南能帮助您顺利入门！