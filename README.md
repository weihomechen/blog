# blog-front

## 概述

本项目是全栈博客应用的前端部分

[服务端地址](https://github.com/weihomechen/blog-node)

[在线预览](http://rulifun.cn/blog)

主要技术栈：

- react
- dva
- webpack
- es6+
- axios
- antd/material-ui

主要模块和实现：

- 文章模块：写文章、看文章、文章管理（编辑和删除等）和文章搜索
- 用户模块：用户注册和登录，个人中心（管理个人事务），个人主页（对外展示）
- 圈子模块：用户聚集的圈子，管理员可对圈子和成员进行管理
- 社交功能：可对文章进行评论，对评论和回复进行回复；对文章进行打赏；可在反馈页面反馈问题，提交建议，所用用户可以进行讨论
- 消息模块：收到新消息（文章评论和回复、反馈讨论等）、需要同意/审批的流程进度更新时（申请加入圈子等），用户可以实时收到消息推送，便于及时处理

## Quick Start

### 开始使用

安装依赖
```
cnpm i
```

本地开发
```
npm start
```

如果没有报错，项目就会运行在 [127.0.0.1:8080](http://127.0.0.1:8080)

## 目录结构

```
├── README.md
├── app           // 后台部分
├── config        // egg配置文件
├── dispatch.js
├── logs          // 运行日志
├── node_modules
├── package.json
├── run
├── scripts      
├── static        // 前端部分 
├── test
└── db.sql    // 数据库表设计
```

## 前端流程

```
├── build               // webpack配置  
└── src
    ├── _index.js
    ├── components      // 通用或无状态组件
    ├── img
    ├── index.html
    ├── index.js
    ├── models          // 管理路由组件的状态
    │   ├── app.js
    │   └── article.js
    ├── router.js       // 前端路由配置
    ├── routes          // 路由组件
    │   ├── app.js
    │   ├── article
    │   ├── error
    │   └── logins
    ├── services        // 前端和后台交互的逻辑（发起请求）
    │   ├── app.js
    │   └── article.js 
    ├── tests
    ├── theme.js
    └── utils
```
前端路由(router) --> 渲染路由组件(routes) --> 状态管理、与后台交互，发起请求(models) --> 后台对应路由配置进行处理(app) --> 返回结果 --> 前端接收后处理(models)

## 后台流程

```
├── controller      // 处理对应的后台路由
│   ├── article.js
│   └── client.js
├── extend
│   └── helper.js
├── middleware
├── public
├── router.js       // 后台路由映射
├── service         // 后台和数据库交互逻辑
│   └── article.js
└── view
```

收到请求（router） --> 根据路由映射调用处理函数（controller） --> 与数据库交互（service） --> 返回结果（controller）

## 生产部署

需要先clone[deploy-tool](https://github.com/weihomechen/deploy-tool)到本地，[deploy-tool说明](https://github.com/weihomechen/deploy-tool/blob/master/README.md)

```sh
# 使用示例
node ./bin/deploy.js -n blog -t /Users/weihome/my-projects/blog  -w 118.18.18.118 -d /var/proj/ -p 123456
```
