---
title: css文本超出一定范围后显示省略号
description: css文本超出一定范围后显示省略号
publishDate: "2025-03-11"
categories: ['前端', 'css']
tags: ['css', 'ellipsis']
---

在CSS中，如果你希望文本超出一定范围后显示省略号，可以使用以下的样式来实现：

```css
.ellipsis {
    white-space: nowrap;        /* 不允许换行 */
    overflow: hidden;           /* 隐藏超出的内容 */
    text-overflow: ellipsis;   /* 用省略号表示超出的内容 */
}
```

你可以将这些样式应用到相关的HTML元素上。例如：

```html
<div class="ellipsis">
    这是一个非常长的文本，如果它超过了容器的宽度，就会显示省略号。
</div>
```

此外，如果你想要对多行文本应用相似的效果，可以使用 CSS 的 `-webkit-line-clamp` 属性（在 WebKit 及 Blink 渲染引擎下支持），如下所示：

```css
.multi-line-ellipsis {
    display: -webkit-box;               /* 使用弹性盒布局 */
    -webkit-box-orient: vertical;      /* 垂直方向排列 */
    -webkit-line-clamp: 2;             /* 设定显示的行数 */
    overflow: hidden;                   /* 隐藏超出部分 */
}
```

对应的 HTML 代码可以是：

```html
<div class="multi-line-ellipsis">
    这是一个非常长的文本，如果它超过了容器的宽度，并且行数超过了设定的数量，就会显示省略号。这里再添加一些内容，以便它能超出限制。
</div>
```

记得为这段代码设置一个固定的高度，或者限制其宽度，以便能看到省略号的效果。