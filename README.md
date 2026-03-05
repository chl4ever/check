# 前线简报 · Cloudflare Pages 版

## 部署步骤（约10分钟）

### 1. 上传到 GitHub
新建仓库 → 把所有文件上传

### 2. 部署到 Cloudflare Pages
- 去 https://pages.cloudflare.com
- Create a project → Connect to Git → 选仓库
- Build settings 全部留空 → Save and Deploy

### 3. 创建 KV 数据库
- CF控制台 → Workers & Pages → KV → Create namespace
- 名字填 BRIEFS → Add
- 回到Pages项目 → Settings → Functions → KV namespace bindings
- Variable name: BRIEFS，选刚建的namespace → Save

### 4. 重新部署
Deployments → Retry deployment

### 使用
- 主页: https://xxx.pages.dev
- 编辑器: https://xxx.pages.dev/editor
国内无需梯子 ✓
