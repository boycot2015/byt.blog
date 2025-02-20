---
title: 解决 satori 生成的og-image无法显示中文问题
publishDate: "2025-02-20T14:23:00Z"
description: Astro 是最适合构建像博客、营销网站、电子商务网站这样的以内容驱动的网站的 Web 框架。了解为什么 Astro 可能是你下一个网站的好选择。
tags: ['satori']
---

在开发过程中，我们可能会遇到使用 satori 库生成的 og-image 不显示中文的问题。这通常是由于字体文件不支持中文字符导致的。为了解决这个问题，我们可以采取以下步骤：

### 步骤1: 选择支持中文的字体

首先，我们需要选择一个支持中文的字体。例如，你可以从 Google Fonts 或其他开源字体网站下载一个包含中文支持的字体文件（通常是 `.ttf` 文件）。

### 步骤2: 在 Astro 项目中使用该字体

将下载的字体文件放置在你的项目中合适的位置，比如 `public/fonts` 目录下。然后，在 Astro 的配置文件中引入这个字体。如果你使用的是 Astro 的默认配置，可以在项目的根目录下的 `astro.config.mjs` 文件中添加如下代码：

```javascript
import OPPOSansRegular from '@/assets/font/OPPOSans-Regular.woff'
import OPPOSansMedium from '@/assets/font/OPPOSans-Medium.woff'

const ogOptions: SatoriOptions = {
		// debug: true,
		fonts: [
			{
				// data: await fetch('https://dsfs.oppo.com/store/public/font/OPPOSans-Regular.woff').then(res => res.arrayBuffer()),
				data: Buffer.from(OPPOSansRegular),
				name: "OPPOSans-Regular",
				style: "normal",
				weight: 400,
			},
			{
				// data: await fetch('https://dsfs.oppo.com/store/public/font/OPPOSans-Medium.woff').then(res => res.arrayBuffer()),
				data: Buffer.from(OPPOSansMedium),
				name: "OPPOSans-Medium",
				style: "normal",
				weight: 700,
			}
		],
		height: 630,
		width: 1200,
		embedFont: false
	};
	const svg = await satori(markup(title, postDate), ogOptions);
	const png = new Resvg(svg).render().asPng();

```