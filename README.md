# 英区留学生美签办理助手

专为英区留学生设计的美国签证申请全程图文引导工具。

## 技术栈

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **lucide-react** 图标

## 快速开始

### 1. 安装依赖

```bash
cd visa-assistant
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000)

### 3. 构建生产版本

```bash
npm run build
npm start
```

## 页面结构

| 路径 | 页面 |
|------|------|
| `/` | 首页 Dashboard — 进度总览 + 三阶段入口 |
| `/ds160/step-1` | DS-160 填写指引第 1 步 |
| `/appointment/step-1` | 预约账户创建图文指引 |
| `/monitoring` | 实时 Slot 监控看板 |
| `/interview/checklist` | 线下面签材料清单 |

## 项目结构

```
visa-assistant/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx                        # 首页
│   ├── ds160/step-1/page.tsx           # DS-160 Step 1
│   ├── appointment/step-1/page.tsx     # 预约 Step 1
│   ├── monitoring/page.tsx             # Slot 监控
│   └── interview/checklist/page.tsx    # 面签清单
│
├── components/
│   ├── app-layout.tsx          # 主壳层 (TopNav + Sidebar + content)
│   ├── top-nav.tsx             # 顶部导航栏
│   ├── sidebar.tsx             # 左侧侧边栏
│   ├── bottom-action-bar.tsx   # 底部操作栏
│   ├── stage-card.tsx          # 阶段卡片
│   ├── status-pill.tsx         # 状态徽章
│   ├── hotspot-marker.tsx      # 截图热点编号
│   ├── screenshot-preview-card.tsx  # 浏览器截图容器
│   ├── info-panel-card.tsx     # 编号说明卡片
│   ├── warning-card.tsx        # 橙色警告卡片
│   └── checklist-row.tsx       # 清单行 (可勾选)
│
├── lib/
│   ├── mock-data.ts            # 所有 mock 数据
│   ├── storage.ts              # localStorage 工具
│   └── utils.ts                # cn() 工具函数
│
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## 功能说明

- **纯前端** — 无需后端、无数据库
- **localStorage** — checklist 勾选状态、步骤完成状态本地持久化
- **Mock 数据** — 所有进度数据、监控数据均为 mock
- **页面跳转** — 所有页面均可通过导航栏和按钮跳转
- **响应式** — 桌面端优先设计

## 注意事项

本工具仅为图文引导工具，不承载真实 DS-160 填写、预约提交、支付等功能。用户的真实操作需在官方签证网站完成。
