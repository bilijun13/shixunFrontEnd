dify-agent-workspace/
├── public/                  # 静态资源
│   ├── index.html
│   ├── favicon.ico
│   └── assets/              # 图片、字体等静态资源
│       ├── icons/
│       └── images/
├── src/
│   ├── api/                 # API服务相关
│   │   ├── agentService.ts  # 智能体相关API
│   │   ├── messageService.ts # 消息相关API
│   │   ├── toolService.ts   # 工具相关API
│   │   └── index.ts         # API统一导出
│   ├── assets/              # 项目内部资源
│   │   ├── styles/          # 全局样式
│   │   │   ├── base.css     # 基础样式
│   │   │   ├── variables.css # CSS变量
│   │   │   └── components/  # 组件样式
│   │   └── icons/           # SVG图标组件
│   ├── components/          # 可复用UI组件
│   │   ├── common/          # 通用组件
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   └── ...
│   │   └── workspace/       # 工作区专用组件
│   │       ├── MessageBubble/
│   │       └── ...
│   ├── features/            # 功能模块
│   │   ├── agent/           # 智能体相关功能
│   │   │   ├── AgentAvatar/
│   │   │   └── ...
│   │   ├── chat/            # 聊天相关功能
│   │   ├── tools/           # 工具管理功能
│   │   └── workflow/        # 工作流功能
│   ├── layouts/             # 页面布局
│   │   ├── MainLayout/
│   │   └── WorkspaceLayout/
│   ├── pages/               # 页面组件
│   │   ├── Home/
│   │   ├── Workspace/
│   │   └── ...
│   ├── stores/              # 状态管理
│   │   ├── agentStore.ts    # 智能体状态
│   │   ├── chatStore.ts     # 聊天状态
│   │   └── ...
│   ├── types/               # 类型定义
│   │   ├── agent.ts
│   │   ├── message.ts
│   │   └── ...
│   ├── utils/               # 工具函数
│   │   ├── date.ts
│   │   ├── validation.ts
│   │   └── ...
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 应用入口
│   └── routes.tsx           # 路由配置
├── .eslintrc                # ESLint配置
├── .prettierrc              # Prettier配置
├── tsconfig.json            # TypeScript配置
├── package.json
└── README.md


安装依赖
npm install --save-dev @types/vite