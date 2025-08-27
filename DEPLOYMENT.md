# Vercel 部署指南

此指南将详细说明如何将 SoundBoard 项目部署到 Vercel。

## 前提条件

✅ **您已完成的准备工作：**
1. **Supabase 数据库** - 已建立并上传数据
2. **Cloudflare R2 存储** - 已创建 bucket 并上传音频文件
3. **GitHub 仓库** - 项目代码已推送到 GitHub

✅ **需要准备的账户：**
- Vercel 账户（免费即可）
- GitHub 账户（用于连接仓库）

## 环境变量配置

在 Vercel 项目设置中，配置以下环境变量：

   **Supabase 配置：**
   | 变量名 | 值 | 说明 |
   |--------|----|----- |
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | Supabase 项目 URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `your-anon-key` | Supabase 匿名密钥 |

   **Cloudflare R2 配置：**
   | 变量名 | 值 | 说明 |
   |--------|----|----- |
   | `R2_ACCOUNT_ID` | `your-r2-account-id` | R2 账户 ID |
   | `R2_ACCESS_KEY_ID` | `your-r2-access-key` | R2 访问密钥 ID |
   | `R2_SECRET_ACCESS_KEY` | `your-r2-secret-key` | R2 密钥 |
   | `R2_BUCKET_NAME` | `your-bucket-name` | R2 存储桶名称 |
   | `R2_PUBLIC_URL` | `https://your-bucket.r2.cloudflarestorage.com` | R2 公共 URL |

   **站点配置：**
   | 变量名 | 值 | 说明 |
   |--------|----|----- |
   | `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | 部署后的域名 |

### 步骤 3：首次部署

1. **开始部署**
   - 配置完环境变量后，点击 "Deploy"
   - Vercel 会自动开始构建和部署

2. **监控部署过程**
   ```
   构建过程约 2-5 分钟
   可以在 "Deployments" 标签查看实时日志
   ```

3. **获取部署 URL**
   - 部署成功后会自动生成域名
   - 格式：`https://soundboard-xxx.vercel.app`

### 步骤 4：更新站点 URL

部署完成后，需要更新 `NEXT_PUBLIC_SITE_URL` 环境变量：

1. **复制实际域名**
   - 从 Vercel 项目主页复制生成的域名

2. **更新环境变量**
   ```
   Project Settings → Environment Variables
   编辑 NEXT_PUBLIC_SITE_URL = https://你的实际域名.vercel.app
   ```

3. **重新部署**
   ```
   Deployments → 点击最新部署旁的 "..." → "Redeploy"
   ```

## 🚀 详细部署步骤

### 步骤 1：创建 Vercel 项目

1. **访问 Vercel 控制台**
   - 前往 [vercel.com](https://vercel.com)
   - 点击右上角 "Sign up" 或 "Login"
   - 选择 "Continue with GitHub" 登录

2. **导入项目**
   - 点击 "Add New..." → "Project"
   - 在 "Import Git Repository" 部分找到您的 `sound-board` 仓库
   - 点击仓库右侧的 "Import"

3. **配置项目设置**
   - **Project Name**: `soundboard` (或您喜欢的名称)
   - **Framework Preset**: `Next.js` (应该自动检测)
   - **Root Directory**: `./` (保持默认)
   - **Build Command**: `npm run build` (保持默认)
   - **Output Directory**: `.next` (保持默认)
   - **Install Command**: `npm install` (保持默认)

### 步骤 2：配置环境变量

⚠️ **重要：在首次部署前必须配置环境变量**

1. **展开 "Environment Variables" 部分**
   - 在项目配置页面向下滚动
   - 找到 "Environment Variables" 部分

2. **逐个添加环境变量**
   
   对于每个变量：
   - **Name**: 输入变量名称（如 `NEXT_PUBLIC_SUPABASE_URL`）
   - **Value**: 输入对应的值
   - **Environments**: 选择 "Production", "Preview", "Development" (全选)
   - 点击 "Add"

   **必需变量列表：**
   ```
   ✅ NEXT_PUBLIC_SUPABASE_URL
   ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY  
   ✅ R2_ACCOUNT_ID
   ✅ R2_ACCESS_KEY_ID
   ✅ R2_SECRET_ACCESS_KEY
   ✅ R2_BUCKET_NAME
   ✅ R2_PUBLIC_URL
   ✅ NEXT_PUBLIC_SITE_URL (暂时填写临时值，后续更新)
   ```

### 步骤 3：开始部署

1. **确认配置并部署**
   - 确保所有环境变量已添加
   - 点击 "Deploy" 按钮
   - Vercel 开始自动构建项目

2. **监控构建过程**
   - 构建过程通常需要 2-5 分钟
   - 可以查看实时构建日志
   - 等待显示 "✅ Your project has been deployed"

3. **获取项目 URL**
   - 部署成功后，会显示项目访问地址
   - 类似：`https://soundboard-abc123.vercel.app`
   - 点击访问测试基本功能

### 步骤 4：更新站点 URL（重要）

首次部署后，需要用实际域名更新环境变量：

1. **复制实际域名**
   - 从部署成功页面复制完整 URL

2. **更新环境变量**
   - 进入项目 → "Settings" → "Environment Variables"
   - 找到 `NEXT_PUBLIC_SITE_URL`
   - 点击 "Edit" → 更新为实际域名 → "Save"

3. **触发重新部署**
   - 进入 "Deployments" 标签
   - 点击最新部署右侧的菜单 "..." 
   - 选择 "Redeploy" → "Redeploy"

## ✅ 验证部署

部署完成后，请验证以下功能：

**请按以下检查清单验证功能：**

### 🎵 音频功能测试
- [ ] **首页加载** - 音频列表正常显示
- [ ] **分类筛选** - 点击左侧分类能正确筛选
- [ ] **音频播放** - 点击播放按钮音频正常播放
- [ ] **音频下载** - 点击下载按钮能下载 MP3 文件
- [ ] **分页功能** - 翻页功能正常工作

### 🔍 搜索功能测试  
- [ ] **搜索功能** - 在顶部搜索框输入关键词能找到结果
- [ ] **模糊搜索** - 输入部分单词能匹配相关音频
- [ ] **大小写不敏感** - 输入大小写混合能正常搜索
- [ ] **搜索结果计数** - 显示"Found X results for 'keyword'"

### 📊 数据库连接测试
- [ ] **Supabase 连接** - 数据能正常从数据库加载
- [ ] **R2 存储连接** - 音频文件能从 R2 正常加载
- [ ] **统计更新** - 播放和下载次数能正确更新

## 🛠️ 故障排除

### ❌ 部署失败

**症状：** 构建过程中出错，部署失败

**解决方案：**
1. **检查构建日志**
   - 在 Vercel 部署页面查看详细错误信息
   - 常见错误：环境变量缺失、TypeScript 类型错误

2. **环境变量检查**
   ```bash
   确保所有必需的环境变量都已正确设置
   特别注意：NEXT_PUBLIC_SUPABASE_URL 和 NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

3. **重新部署**
   - 修复问题后，推送代码到 GitHub 或手动触发重新部署

### ❌ 音频无法播放

**症状：** 点击播放按钮，音频不播放或报错

**解决方案：**
1. **检查 R2 配置**
   ```bash
   R2_PUBLIC_URL 必须正确
   音频文件必须在 R2 中可访问
   ```

2. **检查浏览器控制台**
   - 查看是否有 CORS 错误
   - 检查音频文件 URL 是否正确

### ❌ 数据无法加载

**症状：** 首页显示空白或"加载中"状态

**解决方案：**
1. **Supabase 连接检查**
   ```bash
   确认 NEXT_PUBLIC_SUPABASE_URL 正确
   确认 NEXT_PUBLIC_SUPABASE_ANON_KEY 正确
   ```

2. **数据库权限检查**
   - 确保 Supabase RLS 策略允许匿名读取
   - 检查数据库中是否有数据

### ❌ 搜索不工作

**症状：** 搜索框输入关键词，但没有结果

**解决方案：**
1. **检查 API 端点**
   - 访问 `https://你的域名.vercel.app/api/audio?search=test`
   - 应该返回 JSON 数据

2. **检查网络请求**
   - 打开浏览器开发者工具
   - 查看 Network 标签中的 API 请求是否成功

## 🎯 后续优化建议

### 1. 自定义域名（可选）
如果您有自己的域名：
1. 在 Vercel 项目设置中添加域名
2. 配置 DNS 记录指向 Vercel
3. 更新 `NEXT_PUBLIC_SITE_URL` 环境变量

### 2. 性能监控
- 启用 Vercel Analytics 监控访问量
- 监控 Supabase 数据库使用情况
- 关注 R2 存储费用和流量

### 3. 自动化部署
- 配置 GitHub Actions（可选）
- 设置开发/生产环境分离
- 配置自动测试流程

## 📞 获得帮助

如果部署过程中遇到问题：

1. **检查 Vercel 日志**
   - Project → Deployments → 点击失败的部署查看日志

2. **联系支持**
   - Vercel: [vercel.com/support](https://vercel.com/support)
   - Supabase: [supabase.com/docs](https://supabase.com/docs)

3. **常用调试 URL**
   ```
   https://你的域名.vercel.app/api/audio (测试 API)
   https://你的域名.vercel.app/api/categories (测试分类)
   ```

---

## 🎉 部署成功！

恭喜！您的 SoundBoard 项目现在已经成功部署到 Vercel。

**下一步：**
- ✅ 测试所有功能
- ✅ 分享您的项目链接
- ✅ 根据需要调整配置

🌟 **项目特性：**
- 🎵 在线音频播放
- 📱 响应式设计，支持移动端
- 🔍 强大的搜索功能
- 📊 实时播放统计
- ⚡ 快速 CDN 分发