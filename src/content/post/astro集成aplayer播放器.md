---
title: astro集成aplayer播放器
description: astro集成aplayer播放器
publishDate: "2025-02-10"
categories: ['前端', '框架']
tags: ['astro', 'aplayer']
---
> 本文详细阐述了在Astro框架中集成aplayer音乐播放器的完整流程。通过npm安装插件后创建动态播放器组件，引入APlayer并处理自动播放逻辑。针对Astro默认路由刷新问题，通过配置ClientRouter组件和transition:persist指令实现类SPA的页面导航效果。最后特别给出替换meeting-js为meting API的解决方案，包含自动获取播放列表数据、浏览器自动播放策略兼容处理等关键技术细节。

# astro集成aplayer播放器

本文交大家如何在Astro项目中集成aplayer播放器。

## 步骤1：安装aplayer插件
```bash
pnpm i aplayer --save
```

## 步骤2：创建Aplayer组件

`components` 目录下创建 `Aplayer.astro` 文件：

```js title='Aplayer.astro'
---
import 'aplayer/dist/APlayer.min.css'; // 引入 APlayer 的样式文件
---
<div id="player-container" class="z-999" transition:persist></div>
<script>
    import APlayer from 'aplayer';
    let player;
    let playerContainer;
    // 在组件加载时初始化播放器并恢复状态
    document.addEventListener('DOMContentLoaded', async () => {
      playerContainer = document.getElementById('player-container');
      player = new APlayer({
        container: playerContainer,
        autoplay: true,
        fixed: true,
        audio: [{
            name: '示例音频',
            artist: '艺术家',
            url: 'your-audio-file.mp3',
            cover: 'your-cover-image.jpg',
        }],
      });
    }, false);
  
    // 在组件卸载时保存播放器状态
    {/* document.addEventListener('unloaded', () => {
      savedPlayerState = {
        currentTime: player.currentTime,
        paused: player.paused,
        volume: player.volume,
      };
    }); */}
  </script>
```
## 步骤3：Layout引入aplayer组件

```js title='layouts/Layout.astro'
// ...
import Aplayer from "@/components/Aplayer.astro";

<Aplayer />
// ...
```

## 步骤4：astro 项目开启 PWA （不刷新页面跳转， 类似Vue 单页面应用）
>关键步骤：由于astro 默认跳转页面会刷新浏览器，这样会导致播放状态被重置，我们需要手动开启PWA维持状态。

Astro 提供了一个  视图过渡动画 `<ClientRouter />` 路由组件, 视图过渡动画可以在不刷新浏览器的情况下更新页面内容，并在页面之间提供无缝的动画效果。

1. 全局引入 `ClientRouter`

```js title='src/layouts/Header.astro'
import { ClientRouter } from 'astro:transitions';
...
<ClientRouter />
{/* Icons */}
<link href="/icon.svg" type="image/svg+xml" />
...
```
2. 使用 transition:persist 指令在页面导航时保持组件和 HTML 元素的状态（而不是替换它们）。

```js title='src/components/APlayer.astro'
<div id="player-container" class="z-999 !left-auto" transition:persist></div>
```

## 注意事项

如果你用meeting-js 播放器，`transition:persist` 可能失效（测试过无法保持状态）。建议使用 `meeting api` 接口获取数据，然后传递给 `aplayer` 播放器。参考如下：
```js title='aplayer.astro'
---
import 'aplayer/dist/APlayer.min.css'; // 引入 APlayer 的样式文件
---
<div id="player-container" class="z-999" transition:persist>
  <pre class="aplayer-lrc-content">
  </pre>
</div>
<script>
    /**
   * {
      "title": "给自己的信",
      "author": "苏见信 (信)",
      "url": "https://api.i-meto.com/meting/api?server=netease&type=url&id=22854031&auth=3f09ae2cfed515c1ff494bb67558c22f724f1bcc",
      "pic": "https://api.i-meto.com/meting/api?server=netease&type=pic&id=109951164092166041&auth=3f008fc744fe34cee424d02ace9c1aa03a52c990",
      "lrc": "https://api.i-meto.com/meting/api?server=netease&type=lrc&id=22854031&auth=8faf0360b5c4e8d24891bef58886f8b0e4a5ae50"
  }
   */
    import APlayer from 'aplayer';
    let player;
    let playerContainer;
    // 在组件加载时初始化播放器并恢复状态
    window.addEventListener('load', async () => {
      playerContainer = document.getElementById('player-container');
      let params = {
        server: 'netease',
        type: 'playlist',
        id: '60192',
        r: Math.random()
      }
      let url = 'https://api.i-meto.com/meting/api'
      //拼接参数  
      let paramsArray = [];
      Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
      if (url.search(/\?/) === -1) {
          url += '?' + paramsArray.join('&')  
      } else {
          url += '&' + paramsArray.join('&')
      }
      // ?server=netease&type=playlist&id=60192&r=0.49295886527008737
      let res = await fetch(url, {})
      let data = await res.json()
      player = new APlayer({
        container: playerContainer,
        autoplay: true,
        fixed: true,
        lrcType: 3,
        audio: [...data.map(el => ({
          lrc: el.lrc,
          name: el.title,
          artist: el.author,
          url: el.url,
          cover: el.pic,
        }))],
      });
      // 处理google浏览器内核自动播放问题
      player.on('loadeddata', () => {
        player.audio.muted = true
        player.play()
        player.audio.muted = false
      })
    }, false);
</script>
```