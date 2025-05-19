# 社交媒体系统API文档

## API概述

社交媒体系统API基于RESTful架构设计，提供了完整的用户认证、内容管理、社交互动和消息通知功能。API使用JSON格式进行数据交换，采用JWT进行认证，支持WebSocket实时通信。

### 基本信息

- **基础URL**: `https://api.social-media.com/v1` 或本地开发环境 `http://localhost:3001/v1`
- **WebSocket URL**: `wss://api.social-media.com/v1/realtime` 或 `ws://localhost:3001/v1/realtime`
- **内容类型**: `application/json`
- **认证方式**: Bearer Token (JWT)
- **API版本**: v1

## 认证与授权

### 认证方式

API使用JWT (JSON Web Token) 进行认证。客户端需要在HTTP请求头中包含有效的访问令牌：

```
Authorization: Bearer <access_token>
```

WebSocket连接需要在连接时提供JWT令牌。

### 获取访问令牌

#### 用户登录

```
POST /auth/login
```

请求体:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

响应:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "username": "johndoe",
      "email": "user@example.com",
      "avatar": "https://example.com/avatars/johndoe.jpg",
      "bio": "摄影爱好者",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

#### 用户注册

```
POST /auth/register
```

请求体:

```json
{
  "username": "johndoe",
  "email": "user@example.com",
  "password": "password123"
}
```

响应:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c85",
      "username": "johndoe",
      "email": "user@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

## 内容API

### 获取内容动态

```
GET /posts/feed
```

权限:

- 需要用户身份验证

查询参数:

- `page`: 页码 (默认: 1)
- `limit`: 每页数量 (默认: 10)
- `type`: 内容类型 (all, image, video, text)
- `sort`: 排序方式 (newest, popular)

响应:

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "60d21b4667d0d8992e610c85",
        "content": "今天的日落太美了！",
        "media": ["https://example.com/media/sunset.jpg"],
        "author": {
          "id": "60d21b4667d0d8992e610c86",
          "username": "photographer",
          "avatar": "https://example.com/avatars/photographer.jpg"
        },
        "likes": 42,
        "comments": 5,
        "isLiked": false,
        "createdAt": "2023-06-18T14:30:00Z"
      }
    ],
    "pagination": {
      "totalItems": 100,
      "totalPages": 10,
      "currentPage": 1,
      "pageSize": 10
    }
  }
}
```

### 创建内容

```
POST /posts
```

权限:

- 需要用户身份验证

请求体:

```json
{
  "content": "分享我的最新作品",
  "media": ["https://example.com/media/artwork.jpg"],
  "tags": ["art", "design"]
}
```

响应:

```json
{
  "success": true,
  "data": {
    "post": {
      "id": "60d21b4667d0d8992e610c86",
      "content": "分享我的最新作品",
      "media": ["https://example.com/media/artwork.jpg"],
      "author": {
        "id": "60d21b4667d0d8992e610c85",
        "username": "johndoe",
        "avatar": "https://example.com/avatars/johndoe.jpg"
      },
      "tags": ["art", "design"],
      "likes": 0,
      "comments": 0,
      "createdAt": "2023-06-19T10:15:00Z"
    }
  }
}
```

### 点赞内容

```
POST /posts/:id/like
```

权限:

- 需要用户身份验证

路径参数:

- `id`: 内容ID

响应:

```json
{
  "success": true,
  "data": {
    "likes": 43,
    "isLiked": true
  }
}
```

### 评论内容

```
POST /posts/:id/comments
```

权限:

- 需要用户身份验证

路径参数:

- `id`: 内容ID

请求体:

```json
{
  "content": "拍得真棒！"
}
```

响应:

```json
{
  "success": true,
  "data": {
    "comment": {
      "id": "60d21b4667d0d8992e610c87",
      "content": "拍得真棒！",
      "author": {
        "id": "60d21b4667d0d8992e610c85",
        "username": "johndoe",
        "avatar": "https://example.com/avatars/johndoe.jpg"
      },
      "createdAt": "2023-06-19T11:30:00Z"
    }
  }
}
```

## 社交互动API

### 关注用户

```
POST /users/:id/follow
```

权限:

- 需要用户身份验证

路径参数:

- `id`: 用户ID

响应:

```json
{
  "success": true,
  "data": {
    "isFollowing": true,
    "followersCount": 124
  }
}
```

### 获取用户资料

```
GET /users/:id
```

路径参数:

- `id`: 用户ID

响应:

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "60d21b4667d0d8992e610c86",
      "username": "photographer",
      "avatar": "https://example.com/avatars/photographer.jpg",
      "bio": "专业摄影师 | 旅行爱好者",
      "followersCount": 124,
      "followingCount": 56,
      "postsCount": 42,
      "isFollowing": true
    }
  }
}
```

## 消息API

### 发送私信

```
POST /messages
```

权限:

- 需要用户身份验证

请求体:

```json
{
  "recipientId": "60d21b4667d0d8992e610c86",
  "content": "你好，我很喜欢你的作品！"
}
```

响应:

```json
{
  "success": true,
  "data": {
    "message": {
      "id": "60d21b4667d0d8992e610c88",
      "content": "你好，我很喜欢你的作品！",
      "sender": {
        "id": "60d21b4667d0d8992e610c85",
        "username": "johndoe",
        "avatar": "https://example.com/avatars/johndoe.jpg"
      },
      "recipient": {
        "id": "60d21b4667d0d8992e610c86",
        "username": "photographer",
        "avatar": "https://example.com/avatars/photographer.jpg"
      },
      "createdAt": "2023-06-21T11:00:00Z"
    }
  }
}
```

### 获取对话列表

```
GET /conversations
```

权限:

- 需要用户身份验证

响应:

```json
{
  "success": true,
  "data": {
    "conversations": [
      {
        "id": "60d21b4667d0d8992e610c89",
        "user": {
          "id": "60d21b4667d0d8992e610c86",
          "username": "photographer",
          "avatar": "https://example.com/avatars/photographer.jpg"
        },
        "lastMessage": {
          "content": "你好，我很喜欢你的作品！",
          "createdAt": "2023-06-21T11:00:00Z"
        },
        "unreadCount": 1
      }
    ]
  }
}
```

## 通知API

### 获取通知

```
GET /notifications
```

权限:

- 需要用户身份验证

查询参数:

- `type`: 通知类型 (all, likes, comments, follows)
- `unread`: 只获取未读通知 (true/false)

响应:

```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "60d21b4667d0d8992e610c90",
        "type": "like",
        "user": {
          "id": "60d21b4667d0d8992e610c86",
          "username": "photographer",
          "avatar": "https://example.com/avatars/photographer.jpg"
        },
        "post": {
          "id": "60d21b4667d0d8992e610c85",
          "preview": "今天的日落太美了！"
        },
        "isRead": false,
        "createdAt": "2023-06-22T09:15:00Z"
      }
    ]
  }
}
```

## 订阅API

### 订阅创作者

```
POST /subscriptions
```

权限:

- 需要用户身份验证

请求体:

```json
{
  "creatorId": "60d21b4667d0d8992e610c86",
  "plan": "premium"
}
```

响应:

```json
{
  "success": true,
  "data": {
    "subscription": {
      "id": "60d21b4667d0d8992e610c91",
      "creator": {
        "id": "60d21b4667d0d8992e610c86",
        "username": "photographer"
      },
      "plan": "premium",
      "status": "active",
      "expiresAt": "2023-07-22T09:15:00Z"
    }
  }
}
```

## 错误处理

所有API错误响应都使用统一的格式:

```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "找不到请求的资源",
    "status": 404,
    "details": {
      "resource": "Post",
      "id": "60d21b4667d0d8992e610c89"
    }
  }
}
```

### 常见错误代码

| 代码                  | HTTP状态码 | 描述                 |
| --------------------- | ---------- | -------------------- |
| AUTHENTICATION_FAILED | 401        | 认证失败，无效的凭据 |
| AUTHORIZATION_FAILED  | 403        | 授权失败，权限不足   |
| RESOURCE_NOT_FOUND    | 404        | 找不到请求的资源     |
| VALIDATION_ERROR      | 400        | 请求数据验证失败     |
| INTERNAL_SERVER_ERROR | 500        | 服务器内部错误       |
| CONTENT_VIOLATION     | 422        | 内容违反社区准则     |
| RATE_LIMIT_EXCEEDED   | 429        | 请求过于频繁         |
