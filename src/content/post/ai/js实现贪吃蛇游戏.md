---
title: js实现贪吃蛇游戏
publishDate: "2025-02-17"
ai: true
categories: ['前端', '游戏']
tags: ['游戏', 'javascript']
img: https://plus.unsplash.com/premium_vector-1721522713858-2d8b773fd24d?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
---
> 本文由ai自动生成，仅供参考。

### js实现贪吃蛇游戏

<p><p>实现一个简单的贪吃蛇游戏可以使用 HTML 和 JavaScript。以下是一个基本的示例，通过画布（Canvas）来绘制游戏界面。

```html
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>贪吃蛇游戏</title>
    <style>
        canvas {
            background: #f0f0f0;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="400" height="400"></canvas>
    <script>
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");

        const box = 20; // 每个方块的大小
        let snake = [{ x: 9 * box, y: 9 * box }];
        let direction = '';
        let food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };

        document.addEventListener("keydown", changeDirection);
        
        function changeDirection(event) {
            if (event.key === "ArrowUp" && direction !== 'DOWN') {
                direction = 'UP';
            } else if (event.key === "ArrowDown" && direction !== 'UP') {
                direction = 'DOWN';
            } else if (event.key === "ArrowLeft" && direction !== 'RIGHT') {
                direction = 'LEFT';
            } else if (event.key === "ArrowRight" && direction !== 'LEFT') {
                direction = 'RIGHT';
            }
        }

        function collision(head, array) {
            for (let i = 0; i < array.length; i++) {
                if (head.x === array[i].x && head.y === array[i].y) {
                    return true;
                }
            }
            return false;
        }

        function draw() {
            ctx.fillStyle = "#f0f0f0";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 画蛇
            for (let i = 0; i < snake.length; i++) {
                ctx.fillStyle = (i === 0) ? "green" : "lightgreen";
                ctx.fillRect(snake[i].x, snake[i].y, box, box);
                ctx.strokeStyle = "darkgreen";
                ctx.strokeRect(snake[i].x, snake[i].y, box, box);
            }

            // 画食物
            ctx.fillStyle = "red";
            ctx.fillRect(food.x, food.y, box, box);

            // 蛇的头的位置
            let snakeX = snake[0].x;
            let snakeY = snake[0].y;

            // 根据方向更新蛇头位置
            if (direction === 'LEFT') snakeX -= box;
            if (direction === 'UP') snakeY -= box;
            if (direction === 'RIGHT') snakeX += box;
            if (direction === 'DOWN') snakeY += box;

            // 判断蛇是否吃到食物
            if (snakeX === food.x && snakeY === food.y) {
                food = {
                    x: Math.floor(Math.random() * 20) * box,
                    y: Math.floor(Math.random() * 20) * box
                };
            } else {
                // 移除蛇尾
                snake.pop();
            }

            // 添加新的蛇头
            let newHead = { x: snakeX, y: snakeY };

            // 游戏结束条件
            if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
                clearInterval(game);
                alert("游戏结束!");
            }

            snake.unshift(newHead);
        }

        let game = setInterval(draw, 100); // 每100毫秒更新一次
    </script>
</body>
</html>
```

### 如何运行
1. 复制上述代码。
2. 将其粘贴到一个 `.html` 文件中，例如 `snake.html`。
3. 使用浏览器打开该文件。

### 简要说明
- 使用 `canvas` 画布来绘制游戏界面。
- 按键事件监听来控制蛇的移动方向。
- 每次绘制时更新时间，检查蛇是否吃到食物，更新蛇的身体。
- 检查游戏结束的条件（碰到边界或自己）。

这是一个简单的贪吃蛇实现，你可以根据需要添加更多功能，比如得分系统、困难模式、暂停功能等。