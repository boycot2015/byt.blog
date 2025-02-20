---
title: js实现俄罗斯方块
publishDate: "2025-02-17"
ai: true
categories: ['前端', '游戏']
tags: ['游戏', 'javascript']
---
> 本文由ai自动生成，仅供参考。

<p><p>实现一个简化版本的俄罗斯方块（Tetris）游戏需要使用HTML、CSS和JavaScript。以下是一个简单的例子，展示了如何使用这些技术来构建一个基础的俄罗斯方块游戏。

### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>俄罗斯方块</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>俄罗斯方块</h1>
    <canvas id="board" width="240" height="400"></canvas>
    <div>
        <button id="startButton">开始游戏</button>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### CSS (style.css)

```css
body {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
}

canvas {
    border: 1px solid #000;
    background-color: #fff;
}

h1 {
    font-family: 'Arial', sans-serif;
}
```

### JavaScript (script.js)

```javascript
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 20;

const COLORS = [
    null,
    'cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red'
];

const SHAPES = [
    [],
    [[1, 1, 1, 1]], // I
    [[2, 2, 2], [0, 0, 2]], // L
    [[3, 3, 3], [3, 0, 0]], // J
    [[4, 4], [4, 4]], // O
    [[5, 5, 0], [0, 5, 5]], // S
    [[6, 6, 6], [0, 6, 0]], // T
    [[7, 7, 7], [0, 0, 7]]  // Z
];

let board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
let currentPiece;
let currentPosition;

// 生成新的方块
function newPiece() {
    const index = Math.floor(Math.random() * (SHAPES.length - 1)) + 1;
    currentPiece = {
        shape: SHAPES[index],
        color: COLORS[index],
        row: 0,
        col: Math.floor(COLS / 2) - 1
    };
}

// 检查碰撞
function isCollision(offsetRow, offsetCol) {
    for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
            if (currentPiece.shape[r][c]) {
                const newRow = currentPiece.row + r + offsetRow;
                const newCol = currentPiece.col + c + offsetCol;
                if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS || board[newRow][newCol]) {
                    return true;
                }
            }
        }
    }
    return false;
}

// 将方块放入棋盘
function placePiece() {
    for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
            if (currentPiece.shape[r][c]) {
                board[currentPiece.row + r][currentPiece.col + c] = currentPiece.color;
            }
        }
    }
}

// 消除满行
function clearRows() {
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(cell => cell)) {
            board.splice(r, 1);
            board.unshift(Array(COLS).fill(0));
        }
    }
}

// 绘制棋盘
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    board.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (cell) {
                ctx.fillStyle = cell;
                ctx.fillRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeRect(c * BLOCK_SIZE, r * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        });
    });

    // 绘制当前方块
    currentPiece.shape.forEach((row, r) => {
        row.forEach((cell, c) => {
            if (cell) {
                ctx.fillStyle = currentPiece.color;
                ctx.fillRect((currentPiece.col + c) * BLOCK_SIZE, (currentPiece.row + r) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                ctx.strokeRect((currentPiece.col + c) * BLOCK_SIZE, (currentPiece.row + r) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        });
    });
}

// 下落方块
function dropPiece() {
    if (!isCollision(1, 0)) {
        currentPiece.row++;
    } else {
        placePiece();
        clearRows();
        newPiece();
        if (isCollision(0, 0)) {
            alert('游戏结束！');
            board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
        }
    }
}

// 控制方块移动
function control(event) {
    if (event.key === 'ArrowLeft' && !isCollision(0, -1)) {
        currentPiece.col--;
    } else if (event.key === 'ArrowRight' && !isCollision(0, 1)) {
        currentPiece.col++;
    } else if (event.key === 'ArrowDown') {
        dropPiece();
    }
}

// 游戏循环
function gameLoop() {
    dropPiece();
    drawBoard();
    setTimeout(gameLoop, 1000);
}

// 开始游戏
document.getElementById('startButton').addEventListener('click', () => {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(0));
    newPiece();
    gameLoop();
});

document.addEventListener('keydown', control);
```

### 使用说明

1. 将以上代码分别保存到`index.html`、`style.css`和`script.js`文件中。
2. 打开`index.html`文件在浏览器中查看和玩游戏。

### 游戏玩法

- 使用箭头键控制方块的移动。
- 按“开始游戏”按钮开始游戏。

这个示例是一个非常简单的俄罗斯方块游戏实现，您可以根据需要进行扩展，例如增加得分系统、不同形状的方块、旋转方块、提高游戏难度等。