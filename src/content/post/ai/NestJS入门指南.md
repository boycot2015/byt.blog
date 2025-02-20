---
title: NestJS入门指南
publishDate: "2025-02-17"
ai: true
categories: ['前端', '框架', 'NestJS']
tags: ['NestJS', 'javascript']
---
> 本文由ai自动生成，仅供参考。

# NestJS入门指南

## 一、什么是NestJS
NestJS是一个用于构建高效、可扩展的Node.js服务器端应用程序的框架。它采用TypeScript编写，并结合了面向对象编程、函数式编程和响应式编程的元素。NestJS的设计理念是通过模块化的方式构建应用，使得各个部分之间的耦合度降低，从而提升代码的可维护性与可扩展性。

## 二、NestJS的特点
模块化：NestJS使用模块的方式将应用组织起来。每个模块可以包含控制器、服务以及其他组件，从而使得代码结构清晰。

依赖注入：NestJS内置强大的依赖注入容器，使得组件之间的依赖管理变得简单，提高了代码的可测试性。

高性能：NestJS基于Fastify和Express.js等高性能的Web框架，具备良好的性能表现。

易于测试：NestJS鼓励使用单元测试和集成测试，提供了良好的测试支持。

丰富的生态系统：NestJS有着活跃的社区和众多的插件，可以快速集成各种功能，如认证、数据库访问等。

## 三、环境搭建
1. 安装Node.js
NestJS需要Node.js的支持，建议安装LTS版本。可以在Node.js官网下载并安装。

2. 安装Nest CLI
Nest CLI是NestJS的命令行工具，可以帮助开发者快速生成Nest应用及各类组件。在终端中执行以下命令安装：

npm install -g @nestjs/cli
3. 创建NestJS项目
使用Nest CLI创建新的NestJS项目，命令如下：

nest new project-name
根据提示选择包管理工具（npm或yarn）完成项目的初始化。

## 四、基本项目结构
使用Nest CLI创建的项目包含以下基本结构：

project-name
├── src
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── main.ts
├── test
├── node_modules
├── package.json
├── tsconfig.json
└── ...
1. 主要文件介绍
main.ts: 应用程序的入口文件，负责应用的引导。
app.module.ts: 根模块，包含应用中所有其他模块。
app.controller.ts: 控制器，负责处理请求，并返回响应。
app.service.ts: 服务，包含业务逻辑，可以被其他组件注入。
## 五、创建第一个RESTful API
1. 创建控制器
使用Nest CLI创建一个新的控制器：

nest generate controller users
这将在src目录下生成一个users目录，包含users.controller.ts文件。我们将在这里定义用户相关的路由。
```js title=users.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }
}
```
2. 创建服务
接下来，创建一个与控制器配套的服务：

nest generate service users
在users.service.ts中，我们可以定义一些业务逻辑：
```js title=users.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = ['John', 'Jane', 'Jim'];

  findAll(): string[] {
    return this.users;
  }
}
```
3. 绑定服务到控制器
现在我们将服务注入到控制器中，以获取用户数据：
```js
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): string[] {
    return this.usersService.findAll();
  }
}
```
4. 更新应用模块
记得在app.module.ts中导入UsersModule，使得控制器和服务能够工作：
```js title=app.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
```
5. 启动应用
在项目根目录下运行以下命令启动Nest应用：

npm run start
打开浏览器，访问http://localhost:3000/users，将会看到返回的用户列表。

## 六、使用数据库
NestJS可以与多种数据库轻松集成，我们选择使用TypeORM和SQLite作为示例。

1. 安装依赖
在项目中安装TypeORM和SQLite驱动：

npm install --save @nestjs/typeorm typeorm sqlite3
2. 配置TypeORM
在项目的app.module.ts中配置TypeORM：
```js title=app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
```
3. 创建实体
创建一个用户实体类user.entity.ts：
```js title=user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```
4. 更新服务
在users.service.ts中更新代码以使用数据库：
```js title=users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
```
5. 更新控制器
在users.controller.ts中更新控制器以返回用户数据：
```js title=users.controller.ts
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
```
6. 测试API
重新启动应用，并访问http://localhost:3000/users，我们将看到从数据库中获取的用户信息。

## 七、添加新的路由
除了GET请求外，我们还可以添加其他HTTP请求，例如POST、PUT和DELETE。

1. 创建新的DTO
创建新的DTO（数据传输对象）用于验证用户输入。在users目录下创建create-user.dto.ts：
```js title=create-user.dto.ts
export class CreateUserDto {
  name: string;
}
```
2. 更新控制器以支持POST请求
在users.controller.ts中添加POST请求处理逻辑：
```js title=users.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
```
3. 更新服务以支持创建用户
在users.service.ts中添加创建用户的方法：
```js title=users.service.ts
async create(createUserDto: CreateUserDto): Promise<User> {
  const user = this.usersRepository.create(createUserDto);
  return this.usersRepository.save(user);
}
```
## 八、总结
在本指南中，我们介绍了NestJS的基本知识、环境搭建、创建基本的RESTful API、与数据库的集成以及如何处理不同的HTTP请求。NestJS是一个功能强大的框架，适合构建复杂的服务器端应用。

要深入学习NestJS，建议查看其官方文档，其中包含更多的主题，如中间件、管道、守卫等。通过不断实践和学习，您将能够更好地掌握NestJS的使用。

希望本指南对您的NestJS学习之旅有所帮助！