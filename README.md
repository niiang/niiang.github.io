# HONG HUANG 的 GitHub Pages 个人主页

一个**零构建、零依赖**的双语单页主页：纯 HTML + CSS + JS，推送到 GitHub 即自动上线。

- 中文版：根路径 `/`（`index.html`）
- 英文版：`/en/`（`en/index.html`），导航栏有 **EN / 中文** 切换按钮，两页互相跳转

内容已按 [github.com/niiang](https://github.com/niiang) 的公开资料填好：
名字 HONG HUANG、华科计算机硕士身份、两个真实仓库（zotero-GPT-glm-coding / RL）、
推断的技术栈、GitHub 头像（自动同步）、GitHub 匿名转发邮箱。

功能：中英双语、深色/浅色主题（自动跟随系统 + 手动切换）、移动端响应式、
打字机效果、滚动淡入动画、复制邮箱、项目卡片。

```
github-pages-site/
├── index.html       # 中文页面
├── en/index.html    # 英文页面
├── style.css        # 共用样式（换主色只需改 2 个变量）
├── script.js        # 共用交互（打字机短语写在各页面 #typed 的 data-phrases 里）
└── README.md        # 本指南
```

---

## 一、部署上线（约 5 分钟）

### 第 1 步：建仓库

1. 登录 GitHub，点击右上角 **+** → **New repository**
2. 仓库名必须是：**`niiang.github.io`**
3. 选择 **Public**，其他都不勾选，点 **Create repository**

### 第 2 步：上传这 3 个文件

**方式 A：网页上传（不用装任何东西）**

在新建好的仓库页面点 **uploading an existing file**，
把 `index.html`、`style.css`、`script.js` 和整个 `en` 文件夹拖进去，点 **Commit changes**。

**方式 B：命令行（推荐，以后更新方便）**

在本目录下执行：

```bash
git init
git add .
git commit -m "init: 我的个人主页"
git branch -M main
git remote add origin https://github.com/niiang/niiang.github.io.git
git push -u origin main
```

### 第 3 步：访问

打开 **https://niiang.github.io** 🎉
（首次部署约 1~2 分钟生效，刷不出来稍等片刻）

> 一般无需任何配置；若页面没出现，去仓库 **Settings → Pages** 确认
> Source 是 *Deploy from a branch* 且分支为 `main`、目录为 `/ (root)`。

### 以后怎么更新？

改完文件后提交推送即可，网站 1~2 分钟内自动更新：

```bash
git add .
git commit -m "update: 更新内容"
git push
```

---

## 二、以后想调整内容怎么改

| 想改什么 | 去哪改 |
|---|---|
| 自我介绍 / 近况 / 项目描述 | `index.html`（中文）与 `en/index.html`（英文）对应区块，两边都要改 |
| 打字机轮播短语 | 各页面 `#typed` 元素的 `data-phrases` 属性，用 `\|` 分隔 |
| 语言切换按钮位置/样式 | 导航栏 `.nav-lang`，样式在 `style.css` |
| 主色调（全站渐变、按钮、光斑） | `style.css` 顶部 `--accent` / `--accent-2` 两个变量 |
| 技能标签 | `index.html` 技能区块，增删 `<li class="chip">` |
| 项目卡片 | `index.html` 项目区块，整块 `<article>` 复制或删除 |
| 头像 | 无需改——直接引用你的 GitHub 头像，在 GitHub 换头像即自动同步 |
| 邮箱 | `index.html` 中搜索 `users.noreply.github.com`（共 2 处） |

**加自定义域名**（可选）：仓库 **Settings → Pages → Custom domain**
填入你的域名，并添加一条 CNAME 解析记录指向 `niiang.github.io`。

---

## 三、常见问题

- **改了没生效？** 浏览器缓存所致，`Ctrl+F5` 强制刷新；或等 1~2 分钟部署完成。
- **404？** 检查仓库名是否严格为 `niiang.github.io`、仓库是否为 Public。
- **英文页 404？** 确认仓库里有 `en/index.html`（注意 `en` 是文件夹）。
- **想加博客/更多页面？** 直接往仓库加 `blog.html` 等页面，访问 `niiang.github.io/blog.html`。
