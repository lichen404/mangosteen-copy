# 项目部署到阿里云OSS

本项目提供了shell脚本来帮助你将构建后的文件上传到阿里云OSS，支持自动清空bucket功能。

## 前置要求

1. **安装 pnpm**
   ```bash
   npm install -g pnpm
   ```

2. **安装阿里云OSS命令行工具 (ossutil)**
   - 下载地址: https://help.aliyun.com/document_detail/120075.html
   - 根据你的操作系统选择对应的版本

3. **阿里云OSS配置**
   - 创建OSS Bucket
   - 获取AccessKey ID和AccessKey Secret
   - 记录Bucket名称和Endpoint

## 使用方法

### 1. 配置OSS信息

```bash
# 复制配置文件模板
cp oss-config.env.example oss-config.env

# 编辑配置文件
vim oss-config.env
```

### 2. 修改配置文件内容

```bash
# 修改以下配置项
OSS_BUCKET_NAME=mongosteen-test
OSS_ENDPOINT=oss-cn-hangzhou.aliyuncs.com  # 根据你的地域选择
OSS_ACCESS_KEY_ID=你的access-key-id
OSS_ACCESS_KEY_SECRET=你的access-key-secret
OSS_REGION=cn-hangzhou  # 根据你的地域选择
```

### 3. 执行部署

```bash
# 给脚本执行权限
chmod +x deploy-simple.sh

# 执行部署（会自动清空bucket后上传）
./deploy-simple.sh
```

## OSS Endpoint 参考

根据你的Bucket所在地域选择对应的Endpoint和Region：

| 地域 | Endpoint | Region |
|------|----------|--------|
| 华北1（青岛） | oss-cn-qingdao.aliyuncs.com | cn-qingdao |
| 华北2（北京） | oss-cn-beijing.aliyuncs.com | cn-beijing |
| 华北3（张家口） | oss-cn-zhangjiakou.aliyuncs.com | cn-zhangjiakou |
| 华北5（呼和浩特） | oss-cn-huhehaote.aliyuncs.com | cn-huhehaote |
| 华北6（乌兰察布） | oss-cn-wulanchabu.aliyuncs.com | cn-wulanchabu |
| 华东1（杭州） | oss-cn-hangzhou.aliyuncs.com | cn-hangzhou |
| 华东2（上海） | oss-cn-shanghai.aliyuncs.com | cn-shanghai |
| 华东5（南京） | oss-cn-nanjing.aliyuncs.com | cn-nanjing |
| 华东6（福州） | oss-cn-fuzhou.aliyuncs.com | cn-fuzhou |
| 华南1（深圳） | oss-cn-shenzhen.aliyuncs.com | cn-shenzhen |
| 华南2（河源） | oss-cn-heyuan.aliyuncs.com | cn-heyuan |
| 华南3（广州） | oss-cn-guangzhou.aliyuncs.com | cn-guangzhou |
| 西南1（成都） | oss-cn-chengdu.aliyuncs.com | cn-chengdu |

## 脚本功能

### deploy-simple.sh（部署脚本）
- ✅ 使用配置文件管理OSS信息
- ✅ 自动检查必要工具（pnpm、ossutil）
- ✅ 自动安装依赖
- ✅ 构建项目
- ✅ 自动清空bucket（带确认机制）
- ✅ 上传到OSS
- ✅ 彩色日志输出
- ✅ 详细错误处理

## 部署流程

1. **检查工具** - 验证pnpm和ossutil是否已安装
2. **安装依赖** - 运行 `pnpm install`
3. **构建项目** - 运行 `pnpm run build`
4. **清空Bucket** - 清空mongosteen-test bucket中的所有文件
5. **上传文件** - 将构建后的文件上传到OSS

## 注意事项

1. **安全性**
   - 不要将包含AccessKey的配置文件提交到版本控制系统
   - 建议将 `oss-config.env` 添加到 `.gitignore`
   - 使用RAM用户而不是主账号的AccessKey

2. **文件排除**
   - 脚本会自动排除 `.map` 文件和 `.DS_Store` 文件
   - 这些文件对生产环境没有用处，可以节省存储空间

3. **清空操作安全**
   - 部署前会自动检查bucket中的文件
   - 如果发现文件，会询问是否清空
   - 清空操作需要确认，输入 `y` 确认
   - 如果bucket为空，会跳过清空步骤

4. **配置要求**
   - 确保OSS_BUCKET_NAME、OSS_ENDPOINT、OSS_REGION配置正确
   - 确保AccessKey有足够的权限访问OSS

## 故障排除

### 常见问题

1. **ossutil 命令未找到**
   ```bash
   # 下载并安装ossutil
   wget http://gosspublic.alicdn.com/ossutil/1.7.7/ossutil64
   chmod 755 ossutil64
   sudo mv ossutil64 /usr/local/bin/ossutil
   ```

2. **权限不足**
   ```bash
   # 给脚本执行权限
   chmod +x deploy-simple.sh
   ```

3. **构建失败**
   - 检查 `package.json` 中的构建脚本
   - 确保所有依赖都已正确安装

4. **上传失败**
   - 检查OSS配置是否正确
   - 确认Bucket是否存在且有权限访问
   - 检查网络连接
   - 验证Region配置是否正确

5. **清空失败**
   - 检查AccessKey权限
   - 确认Bucket名称正确
   - 验证Region配置

## 自动化部署

你可以将这些脚本集成到CI/CD流程中：

```yaml
# GitHub Actions 示例
- name: Deploy to OSS
  run: |
    chmod +x deploy-simple.sh
    ./deploy-simple.sh
  env:
    OSS_ACCESS_KEY_ID: ${{ secrets.OSS_ACCESS_KEY_ID }}
    OSS_ACCESS_KEY_SECRET: ${{ secrets.OSS_ACCESS_KEY_SECRET }}
```

## 配置文件说明

### oss-config.env
- `OSS_BUCKET_NAME`: OSS Bucket名称
- `OSS_ENDPOINT`: OSS服务端点
- `OSS_ACCESS_KEY_ID`: 阿里云访问密钥ID
- `OSS_ACCESS_KEY_SECRET`: 阿里云访问密钥Secret
- `OSS_REGION`: OSS地区

## 常用命令

```bash
# 查看ossutil版本
ossutil --version

# 测试OSS连接
ossutil ls oss://mongosteen-test -i your-access-key-id -k your-access-key-secret --region cn-hangzhou

# 查看bucket内容
ossutil ls oss://mongosteen-test -i your-access-key-id -k your-access-key-secret --region cn-hangzhou
```
