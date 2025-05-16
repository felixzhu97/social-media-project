# 社交应用 Monorepo

基于 Turborepo 的社交应用 monorepo 项目。

## 项目概述

这是一个现代化的社交网络应用，提供用户连接、内容分享和实时互动功能。项目采用模块化架构设计，包含前端Web应用和后端API服务。

## 项目结构

```
social-media/
├── apps/
│   ├── web/           # Next.js 前端应用
│   └── api/           # Express.js 后端API服务
├── packages/
│   ├── ui/            # UI组件库
│   └── shared/        # 共享工具和类型
├── docs/              # 项目文档
│   ├── COMMIT_CONVENTION.md    # 提交规范
│   ├── VERSIONING.md          # 版本管理
│   └── ENVIRONMENT.md         # 环境变量配置
```

## 使用技术

- [Turborepo](https://turbo.build/repo) - Monorepo 构建系统
- [Next.js](https://nextjs.org/) - React 框架
- [Express.js](https://expressjs.com/) - Node.js Web 框架
- [MongoDB](https://www.mongodb.com/) - 文档数据库
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM
- [TypeScript](https://www.typescriptlang.org/) - 类型系统
- [PNPM](https://pnpm.io/) - 包管理器
- [Storybook](https://storybook.js.org/) - UI 组件开发环境
- [Vercel](https://vercel.com/) - 部署平台
- [Vercel Speed Insights](https://vercel.com/docs/speed-insights) - 性能监控和分析
- [Vitest](https://vitest.dev/) - 测试框架
- [Testing Library](https://testing-library.com/) - React 组件测试工具

## 主要功能

### 前端功能
- 用户认证（登录/注册）
- 个人资料管理
- 发布和浏览动态
- 实时消息系统
- 通知中心
- 用户搜索和连接
- 响应式设计，支持移动端和桌面端

### 后端功能
- RESTful API 接口
- 用户认证和授权
- 内容管理（帖子、评论）
- 实时消息处理
- 通知系统
- 数据验证和错误处理

## 配置说明

### Turborepo 配置

项目使用 Turborepo 进行构建管理，主要配置在 `turbo.json` 文件中：

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "remoteCache": {
    "enabled": true
  },
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "lint": {},
    "dev": {
      "cache": false,
      "persistent": true
    },
    "clean": {
      "cache": false
    },
    "start": {
      "dependsOn": ["build"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": []
    }
  }
}
```

配置说明：

- `globalDependencies`: 全局依赖文件，环境变量文件变化会触发所有任务重新运行
- `remoteCache`: 启用 Turborepo 远程缓存功能
- `pipeline.build`: 构建命令，依赖于所有上游包的构建完成
- `pipeline.dev`: 开发命令，禁用缓存并设为持久运行
- `pipeline.clean`: 清理命令，禁用缓存
- `pipeline.start`: 启动命令，依赖于构建完成
- `pipeline.test`: 测试命令，依赖于构建完成

### GitHub Actions 配置

项目使用 GitHub Actions 进行 CI/CD，配置文件位于 `.github/workflows/ci.yml`。主要功能：

- 自动运行测试和构建
- 集成 Turborepo 远程缓存
- PNPM 依赖缓存优化

要启用 Turborepo 远程缓存，需要配置以下环境变量：

1. `TURBO_TOKEN`: 从 [Vercel 账户设置](https://vercel.com/account/tokens) 获取
2. `TURBO_TEAM`: 从 Vercel 团队设置中获取团队 ID

### Vercel 部署配置

项目使用 Vercel 进行部署，配置文件位于 `vercel.json`：

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

## 开发指南

### 环境要求

- Node.js >= 18.0.0
- PNPM >= 8.0.0
- MongoDB >= 6.0

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建项目

```bash
pnpm build
```

### 运行测试

```bash
pnpm test
```

### 代码规范检查

```bash
pnpm lint
```

## 测试说明

项目使用 Vitest 和 Testing Library 进行测试：

- 组件测试：使用 Testing Library 进行 React 组件测试
- API 测试：使用 Vitest 进行后端 API 测试
- 集成测试：使用 Vitest 进行端到端测试

测试文件位于各包的 `tests` 目录下，遵循以下命名规范：
- 组件测试：`*.test.tsx`
- API 测试：`*.test.ts`
- 集成测试：`*.integration.test.ts`

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

MIT License
