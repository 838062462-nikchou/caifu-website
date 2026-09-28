# 财赋网官网 - 静态网站

## 📁 文件结构

```
website/
├── index.html              首页（品牌介绍 + 业务总览 + CTA）
├── business.html           19 项业务总览（5 大类）
├── empower.html            5 步赋能路径（详细讲解）
├── cases.html              客户案例（4 个真实案例 + 数据汇总）
├── about.html              关于财赋网（公司介绍 + 创始人团队）
├── contact.html            联系我们（表单 + 直接联系方式）
├── faq.html                常见问题（12 个 FAQ）
├── join.html               申请加盟（3 种合作模式 + 申请表单）
├── blog.html               行业洞察（19 篇文章列表）
├── article-01.html         示例文章详情页（总纲文章）
├── assets/
│   └── style.css          全局样式（9 KB）
└── README.md               本文件
```

## ✨ 特点

- **静态 HTML** — 无需后端，任何环境都能跑
- **响应式设计** — 手机 / 平板 / 电脑自适应
- **SEO 友好** — 每个页面有独立 title / description / keywords
- **商务蓝风格** — 专业、可信、B2B 调性
- **10 个核心页面** — 覆盖所有业务场景
- **3 类客户入口** — 首页分流（财税老板 / 终端客户 / 渠道合伙人）

## 🚀 部署方式

### 方式 1：直接打开（最快）
双击 `index.html` 即可在浏览器中预览。

### 方式 2：上传到云存储（推荐）
**阿里云 OSS / 腾讯云 COS / 七牛云**：
1. 把整个 `website/` 文件夹上传到存储桶
2. 开启静态网站托管
3. 绑定自定义域名（如 `www.caifuwang.com`）

### 方式 3：部署到云服务器
**Nginx / Apache**：
```bash
# 复制整个 website 目录到服务器
scp -r website/ root@你的服务器:/var/www/caifuwang/

# Nginx 配置
server {
    listen 80;
    server_name www.caifuwang.com;
    root /var/www/caifuwang;
    index index.html;
}
```

### 方式 4：GitHub Pages（免费 + 国际化）
1. 把 website/ 推送到 GitHub
2. Settings → Pages → 选 main 分支
3. 访问 `https://用户名.github.io/repo/`

## 📝 后续优化建议

1. **替换占位图** — 联系二维码、案例照片需要替换为真实图片
2. **接入真实表单** — 联系表单目前是 HTML，需接入后端（Formspree / 阿里云函数）
3. **添加百度统计** — 在 `</body>` 前加 `hm.baidu.com/hm.js` 统计代码
4. **添加客服系统** — 推荐美洽 / 智齿 / udesk
5. **SEO 优化** — 每页添加 OG / Twitter Card meta
6. **HTTPS** — 上线必须用 HTTPS（Let's Encrypt 免费）
7. **ICP 备案** — 国内域名必须备案才能访问

## 📞 联系信息（请替换）

`contact.html` 中的以下信息需替换为真实数据：
- 电话：400-XXX-XXXX
- 邮箱：business@caifuwang.com
- 地址：广东省东莞市（详细地址）
- 微信二维码：替换为真实二维码图片

## 🎯 内容来源

本网站的文案基于：
- 《财赋网财税机构供应链商业 BP》（23 页）
- 19 篇已发布的公众号文章（`articles/01-19`）

需要修改内容时，直接编辑对应的 HTML 文件即可。
