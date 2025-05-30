---
title: NextJS入门指南
publishDate: "2025-02-17"
categories: ['前端', '框架', 'NextJS']
tags: ['NextJS', 'javascript']
img: https://svgl.app/library/nextjs_logo_light.svg
ai: true
---
> 本文由ai自动生成，仅供参考。

# Next.js 入门指南

## 目录

1. 什么是 Next.js
2. Next.js 的核心特性
3. 环境准备
4. 创建第一个 Next.js 应用
5. 页面路由
6. 静态生成与服务器端渲染
7. 数据获取
8. API 路由
9. 样式处理
10. 部署 Next.js 应用
11. 总结

---

## 1. 什么是 Next.js

Next.js 是一个基于 React 的开源框架，由 Vercel 创建。它提供了一系列特性，使得构建现代 web 应用变得更加简单和高效。Next.js 的核心理念是“开发者体验”和“生产就绪”。借助于 Next.js，开发者可以轻松地创建具有高性能、高可扩展性的应用。

### 主要特点：

- **静态生成（Static Generation）**：可以在构建时生成 HTML，即安全且快速的页面。
- **服务器端渲染（Server-Side Rendering）**：在请求时生成 HTML，适用于数据实时变化的页面。
- **API 路由**：可以在 Next.js 应用中轻松创建无服务器的 API。
- **文件系统路由**：基于文件的路由，非常直观。
- **CSS 和 Sass 支持**：内置支持 CSS Modules 和 Sass。

## 2. Next.js 的核心特性

Next.js 提供了多种特性，使得开发过程更为高效，以下是一些核心特性：

- **文件系统路由**：通过在 `pages` 目录中添加文件来创建路由。
- **内置的 CSS 和 Sass 支持**：支持多种样式解决方案，可以无缝地使用 CSS Modules 和全局 CSS。
- **支持 TypeScript**：Next.js 默认支持 TypeScript。
- **支持静态导出**：可以将 Next.js 应用导出为静态网站。
- **图像优化**：内置的图像优化功能可以自动处理图像的尺寸和格式。

## 3. 环境准备

在开始使用 Next.js 之前，需要确保你的系统中已安装以下工具：

1. **Node.js**：Next.js 需要 Node.js 环境，可以通过 [Node.js 官网](https://nodejs.org/) 下载和安装。
2. **npm 或 yarn**：Node.js 安装完成后，npm（Node 包管理器）会自动安装。你也可以选择安装 yarn。

### 安装 Node.js 的步骤：

1. 下载并安装 Node.js。
2. 验证安装：在命令行中输入以下命令，查看 Node.js 和 npm 的版本。

   ```bash
   node -v
   npm -v
   ```

## 4. 创建第一个 Next.js 应用

在安装好 Node.js 和 npm 后，接下来就可以创建一个新的 Next.js 应用。

### 使用 Create Next App

Next.js 提供了一个官方的脚手架工具 Create Next App，方便用户快速创建项目。可以通过以下命令利用 Create Next App 创建一个新的 Next.js 项目：

```bash
npx create-next-app@latest my-next-app
```

上面的命令会创建一个名为 `my-next-app` 的新文件夹，并在其中生成一个新的 Next.js 应用。

### 进入项目目录并启动开发服务器

```bash
cd my-next-app
npm run dev
```

运行后，打开浏览器并访问 `http://localhost:3000`，你应该能看到默认的 Next.js 欢迎页面。

## 5. 页面路由

在 Next.js 中，路由是基于文件系统的。任何在 `pages` 目录中创建的 JavaScript 文件都会自动成为一个路由。

### 创建页面

1. 打开 `pages/index.js` 文件，你会看到默认的内容。通常，这个文件对应的是首页。
2. 创建一个新的文件 `about.js`，并添加以下内容：

```jsx
export default function About() {
  return <h1>About Page</h1>;
}
```

3. 保存文件后，访问 `http://localhost:3000/about`，应能看到“About Page”。

### 嵌套路由

你还可以通过在 `pages` 目录中创建子目录来创建嵌套路由。例如，创建 `pages/blog/index.js` 和 `pages/blog/[id].js`：

- `pages/blog/index.js`：

```jsx
export default function Blog() {
  return <h1>Blog Home</h1>;
}
```

- `pages/blog/[id].js`：

```jsx
export default function Post({ params }) {
  return <h1>Blog Post: {params.id}</h1>;
}
```

这样，当访问 `http://localhost:3000/blog` 会显示“Blog Home”，而访问 `http://localhost:3000/blog/1` 会显示“Blog Post: 1”。

## 6. 静态生成与服务器端渲染

Next.js 支持两种页面渲染方式：静态生成和服务器端渲染。

### 静态生成

使用 `getStaticProps` 函数可以在构建时生成页面。例如，创建一个新的页面 `pages/static.js`：

```jsx
export async function getStaticProps() {
  // 在此处获取数据
  const data = { message: 'This is static generated content' };

  return {
    props: {
      data,
    },
  };
}

export default function StaticPage({ data }) {
  return <h1>{data.message}</h1>;
}
```

当你访问 `/static` 时，这个页面的内容将在构建时生成。

### 服务器端渲染

使用 `getServerSideProps` 函数可以在每次请求时生成页面内容：

```jsx
export async function getServerSideProps() {
  // 在此处获取数据，例如从数据库
  const data = { message: 'This is server-side rendered content' };

  return {
    props: {
      data,
    },
  };
}

export default function ServerRenderedPage({ data }) {
  return <h1>{data.message}</h1>;
}
```

访问 `/server` 时，页面内容会在每次请求时生成。

## 7. 数据获取

Next.js 提供了几种数据获取方法：

- `getStaticProps`：用于静态生成，即构建时获取数据。
- `getServerSideProps`：用于服务器端渲染，即每次请求时获取数据。
- `getStaticPaths`：与 `getStaticProps` 结合使用，用于动态路由的静态生成。

### 使用 `getStaticPaths` 进行动态路由的静态生成

在 `pages/posts/[id].js` 中，你可以这样设置：

```jsx
export async function getStaticPaths() {
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const data = { id: params.id, content: `This is post ${params.id}` };

  return { props: { data } };
}

export default function Post({ data }) {
  return <div>{data.content}</div>;
}
```

## 8. API 路由

Next.js 允许你创建后端 API，只需在 `pages/api` 目录中添加文件即可。

### 创建简单的 API

创建一个新的文件 `pages/api/hello.js`：

```jsx
export default function handler(req, res) {
  res.status(200).json({ message: 'Hello from API!' });
}
```

在浏览器中访问 `http://localhost:3000/api/hello`，你会看到 `{"message":"Hello from API!"}` 的响应。

## 9. 样式处理

Next.js 内置支持 CSS 和 Sass，可以使用 CSS Modules 来生成独特的 CSS 类。

### 使用 CSS Modules

1. 创建一个 CSS 文件，例如 `styles/Home.module.css`：

```css
.title {
  color: blue;
}
```

2. 在 `pages/index.js` 中引入并使用：

```jsx
import styles from '../styles/Home.module.css';

export default function Home() {
  return <h1 className={styles.title}>Hello Next.js!</h1>;
}
```

### 使用 Sass

1. 安装 Sass：

```bash
npm install sass
```

2. 创建一个 Sass 文件，例如 `styles/Home.module.scss`，并使用：

```scss
.title {
  color: red;
}
```

3. 在 `pages/index.js` 中引入并使用：

```jsx
import styles from '../styles/Home.module.scss';
```

## 10. 部署 Next.js 应用

Next.js 应用可以轻松部署到多个平台，如 Vercel、Netlify 或自托管服务器。

### 部署到 Vercel

1. 注册一个 Vercel 帐户。
2. 通过 `vercel` CLI 部署你的应用：

```bash
npm i -g vercel
vercel
```

### 部署到其他平台

对于其他平台，通常只需构建应用并将输出内容部署到服务器。

1. 构建应用：

```bash
npm run build
```

2. 输出内容通常在 `.next` 目录下，你可以将其上传到静态托管服务。

## 11. 总结

Next.js 是一个强大且灵活的框架，结合了静态生成和服务器端渲染的优点，使得开发人员能够轻松构建高性能的 web 应用。通过内置的路由、API 路由、数据获取函数及样式处理，Next.js 帮助开发者简化了许多繁琐的流程。

希望这份入门指南能帮助你快速上手 Next.js，开启你的前端开发之旅！如果你有任何问题或需要更深入的学习，欢迎查阅 [Next.js 官方文档](https://nextjs.org/docs)。