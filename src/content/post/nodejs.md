---
title: Node.js 简介
description: Node.js 是一个开源的、跨平台的 JavaScript 运行时环境。
publishDate: "2025-02-06T11:23:00Z"
output: html_document
categories: ['前端', 'Nodejs']
tags: ['Node']
---
`Node.js` 是一个开源和跨平台的 `JavaScript` 运行时环境。它是几乎所有类型项目的流行工具！

`Node.js` 在浏览器之外运行 `V8 JavaScript` 引擎，即 `Google Chrome` 的核心。这使 `Node.js` 的性能非常出色。

`Node.js` 应用在单个进程中运行，不会为每个请求创建新线程。`Node.js` 在其标准库中提供了一组异步 `I/O` 原语，可防止 `JavaScript` 代码阻塞，并且通常，`Node.js` 中的库是使用非阻塞范例编写的，这使得阻塞行为成为例外而不是常态。

当 `Node.js` 执行 `I/O` 操作（如从网络读取、访问数据库或文件系统）时，`Node.js` 不会阻塞线程并浪费 `CPU` 周期等待，而是会在响应返回时恢复操作。

这使 `Node.js` 能够使用单个服务器处理数千个并发连接，而​​不会带来管理线程并发的负担，这可能是错误的重要来源。

`Node.js` 具有独特的优势，因为数百万为浏览器编写 `JavaScript` 的前端开发者现在能够编写服务器端代码以及客户端代码，而无需学习完全不同的语言。

在 `Node.js` 中，可以毫无问题地使用新的 `ECMAScript` 标准，因为你不必等待所有用户更新其浏览器 - 你可以通过更改 `Node.js` 版本来决定使用哪个 `ECMAScript` 版本，并且还可以通过使用标志运行 `Node.js` 来启用特定的实验性功能。

`Node.js `应用示例
`Node.js` 最常见的示例 `Hello World` 是一个 `Web` 服务器：

```js title="app.js"
const { createServer } = require('node:http');
// import { createServer } from 'node:http'; // ES6+ 模块语法
const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

要运行此代码段，请将其保存为 `server.js` 文件并在终端中运行 `node server.js`。如果你使用 `mjs` 版本的代码，你应该将其保存为 `server.mjs` 文件并在终端中运行 `node server.mjs`。

此代码首先包含 `Node.js http` 模块。

`Node.js` 有一个很棒的 标准库，包括对网络的一流支持。

`http` 的 `createServer()` 方法创建一个新的 `HTTP` 服务器并返回它。

服务器设置为监听指定的端口和主机名。当服务器准备就绪时，将调用回调函数，在这种情况下通知我们服务器正在运行。

每当收到新请求时，就会调用 `request` 事件，提供两个对象：请求（`http.IncomingMessage` 对象）和响应（`http.ServerResponse` 对象）。

这两个对象对于处理 `HTTP` 调用至关重要。

第一个提供请求详细信息。在此简单示例中，未使用此功能，但你可以访问请求标头和请求数据。

第二个用于将数据返回给调用者。

在这种情况下：
```js
res.statusCode = 200;
```
我们将 `statusCode` 属性设置为 `200`，以指示成功响应。

我们设置了 `Content-Type` 标头：
```js
res.setHeader('Content-Type', 'text/plain');
```
我们关闭响应，将内容作为参数添加到 end()：
```js
res.end('Hello World\n');
```
如果你还没有这样做，download `Node.js`。
