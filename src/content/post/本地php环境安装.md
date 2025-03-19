---
title: 本地php环境安装
description: 本地php环境安装
publishDate: "2025-03-12T11:23:00Z"
categories: ['后端', 'php']
tags: ['php']
---
我们这里以apple m2 系统为例子。
我们以https://github.com/shivammath...第三方tap源为例子，官方的brew速度太慢了。
这里文章主要分为两部分

安装php
安装composer
这里我们安装php会分两种

没有php情况
已有php情况，比如php7.3，我们要更新成php7.4。
我们这里使用 https://github.com/hisheng/first 测试php代码其中
composer.json里面php的版本要求7.3.0以上
```json
"require": {
    "php": ">=7.3.0",
    "phpunit/phpunit": "^4.8"
}
```
## 一、安装php步骤之--（没有php环境的情况）
1、查看 php 版本
php -v
此时发现没有php环境的话，就全新安装

2、brew tap加速，使用github库
homebrew默认使用官方的库，但这个源很慢，一般我们会使用第三方tap

```bash
  brew tap shivammathur/php
```

3、安装php7.3
```bash
  brew install shivammathur/php/php@7.3
```
4、创建link，这样可以在全局环境里访问
```bash
  brew link --overwrite --force php@7.3
```
5、查看是否安装 php -v
我们会发现已经安装好了

```
PHP 7.3.33 (cli) (built: Dec  8 2022 08:29:04) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.3.33, Copyright (c) 1998-2018 Zend Technologies
with Zend OPcache v7.3.33, Copyright (c) 1999-2018, by Zend Technologies
```
## 二、安装php步骤之--（已经安装php环境的情况）
在上面我们介绍了，mac电脑里，没有php环境的安装的方法，其实大部分情况下，我们的电脑已经有php了，此时要更新php版本如何做呢？

1、查看 php 版本
php -v
此时我们发现了安装了php7.3
```
PHP 7.3.33 (cli) (built: Dec  8 2022 08:29:04) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.3.33, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.3.33, Copyright (c) 1999-2018, by Zend Technologies
```
2、brew tap加速，使用github库
homebrew默认使用官方的库，但这个源很慢，一般我们会使用第三方tap

brew tap shivammathur/php
3、安装php7.4
```bash
brew install shivammathur/php/php@7.4
```
4、创建link，这样可以在全局环境里访问
```bash
brew link --overwrite --force php@7.4
```
5、查看是否安装 php -v
我们会发现已经安装好php7.4了,我们看下返回如下：
```bash
PHP 7.4.33 (cli) (built: Dec  8 2022 21:24:25) ( NTS )
Copyright (c) The PHP Group
Zend Engine v3.4.0, Copyright (c) Zend Technologies
    with Zend OPcache v7.4.33, Copyright (c), by Zend Technologies
```
## 三、安装composer
composer已经是php开发必要的库了，每次安装完php后。第一件事，我们就是按照composer。

1、下载composer
https://getcomposer.org/downl...
我们可以看到官方文档已经给出下载的方式
我们可以执行下面的命令下载：
image.png

2、把composer放到 全局环境变量中
```bash
mv composer.phar /usr/local/bin/composer
```
## 四、项目初始化。
1、下载php代码
我们这里使用https://github.com/hisheng/first我以前的一个php项目为例子。
```bash
git clone git@github.com:hisheng/first.git
```
2、进入到项目中，执行composer install安装扩展初始化项目
```bash
cd first
composer install
```
执行完成后，我们会看到项目多了一个vendor包，这里就是我们用到依赖。