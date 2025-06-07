# 概述

## 选题

> 备选项
>
> 1. web应用：需要构思场景，方便进行压测
> 2. 存算分离应用：比较陌生
> 3. 读写分离应用：可以借此熟悉Kafka，但是场景也需要构思

<span style="font-size: 2em;">💡</span>web应用：<span style="font-size: 1.5em;">影视推荐平台</span>

## 截止时间

<p style="color: red; font-size: 2em;">2025年6月15日</p>

## 架构

前台：nextjs

后台：springboot+MySQL

# 技术方案

## 需求分析

核心：推荐

暂定类别：音乐、影视

### 功能：

- 展示
  - 默认列表
  - 筛选功能
  - 排序功能
- 添加
  - 标题
  - 封面
  - 介绍
  - tag



## todo list

- 数据库表设计
- 前端界面搭建
- 后端接口实现
- 部署准备
- 部署
- 结果录制

## 接口设计

### 题材

- 获取热门题材
- 查询搜索题材

### 影视

- 分页获取影视列表
  - 无条件
  - 类型限制
  - 题材限制
  - 年份限制
- 获取排行榜前十
- 上传接口
- 获取详情

### 评论

- 获取评论
- 发表评论



# 报告

## 要求

- [x] 完整的功能界面
- [x] 数据库支持
- [x] 开发环境通过Dockerfile制作镜像
- [x] 应用服务器负载均衡、CCE部署 -- 尝试**容器镜像服务 SWR**中引导
- [x] 部署环境中支持分布式部署和弹性伸缩
- [x] 压测
- [ ] 总结配置和使用步骤

## 部署步骤

1. 开发

2. 制作Dockerfile镜像（本地），WSL2中有docker环境，所以利用，懒得另外搭建Windows Docker desktop了

3. 将镜像推送到华为云容器镜像服务

4. 购买CCE集群

5. 购买RDS、执行SQL

6. 部署前后端工作负载+负载均衡服务

7. 添加节点池、扩缩容（增加节点）



   

# 相关命令

推送

```shell
# tag
sudo docker tag irec-frontend:latest swr.cn-north-4.myhuaweicloud.com/yuqiu/irec-frontend:latest
sudo docker tag irec-backend:latest swr.cn-north-4.myhuaweicloud.com/yuqiu/irec-backend:latest

# push
sudo docker push swr.cn-north-4.myhuaweicloud.com/yuqiu/irec-frontend:latest
sudo docker push swr.cn-north-4.myhuaweicloud.com/yuqiu/irec-backend:latest
```



# 问题

## 推送镜像问题

登录后推送报错

``` shell
The push refers to repository [swr.cn-north-4.myhuaweicloud.com/yuqiu/irec-frontend]
89cd49416de9: Preparing
df24e052e2f7: Preparing
45956122da26: Preparing
e0df4b6a3449: Preparing
86d11448d6ef: Preparing
cc2447e1835a: Waiting
denied: You may not login yet
```

逆天了

问题是 我使用`docker login ...` 登录， 然后`sudo docker push ..`推送， 这两者不是一个用户的操作，所以识别为没有登录



``` shell
MYSQL_HOST=mysql
MYSQL_PORT=3306
MYSQL_DB=irec
MYSQL_USERNAME=root
MYSQL_PASSWD=250@wangqiang
JWT_SECRET_KEY=jwt-test
SERVER_PORT=8080
```

