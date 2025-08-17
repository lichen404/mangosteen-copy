#!/bin/bash

# 简化版部署脚本 - 使用配置文件
# 使用方法: ./deploy-simple.sh

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查配置文件
if [ ! -f "oss-config.env" ]; then
    log_error "配置文件 oss-config.env 不存在"
    log_info "请先创建配置文件并填入你的OSS信息"
    exit 1
fi

# 加载配置文件
source oss-config.env

# 检查必要的配置
if [ "$OSS_BUCKET_NAME" = "your-bucket-name" ] || [ "$OSS_ACCESS_KEY_ID" = "your-access-key-id" ]; then
    log_error "请在 oss-config.env 中配置正确的OSS信息"
    exit 1
fi

# 检查工具
check_tool() {
    if ! command -v $1 &> /dev/null; then
        log_error "未找到 $1"
        return 1
    fi
    return 0
}

log_info "检查必要工具..."
check_tool "pnpm" || {
    log_info "请安装 pnpm: npm install -g pnpm"
    exit 1
}

check_tool "ossutil" || {
    log_info "请安装阿里云OSS命令行工具:"
    log_info "下载地址: https://help.aliyun.com/document_detail/120075.html"
    exit 1
}

log_info "开始部署..."

# 1. 清理并安装依赖
log_info "安装依赖..."
pnpm install

# 2. 构建项目
log_info "构建项目..."
pnpm run build

# 检查构建结果
if [ ! -d "dist" ]; then
    log_error "构建失败"
    exit 1
fi

log_success "构建完成"

# 3. 清空OSS Bucket
log_info "清空OSS Bucket..."
log_info "Bucket: $OSS_BUCKET_NAME"
log_info "Endpoint: $OSS_ENDPOINT"


# 检查bucket是否存在文件
log_info "检查bucket中的文件..."
if ossutil list oss://$OSS_BUCKET_NAME -i $OSS_ACCESS_KEY_ID -k $OSS_ACCESS_KEY_SECRET --region $OSS_REGION &>/dev/null; then
    log_warning "发现bucket中存在文件，准备清空..."
    
    # 确认清空操作
    read -p "确认要清空 oss://$OSS_BUCKET_NAME/ 中的所有文件吗？(y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        log_info "开始清空bucket..."
        ossutil rm oss://$OSS_BUCKET_NAME/ -i $OSS_ACCESS_KEY_ID -k $OSS_ACCESS_KEY_SECRET --region $OSS_REGION -r -f
        
        if [ $? -eq 0 ]; then
            log_success "Bucket清空成功！"
        else
            log_error "Bucket清空失败"
            exit 1
        fi
    else
        log_info "取消清空操作，继续上传..."
    fi
else
    log_info "Bucket为空，无需清空"
fi

# 4. 上传到OSS
log_info "上传到OSS..."

# 上传文件
ossutil cp -r dist/ oss://$OSS_BUCKET_NAME/ --exclude "*.map" --exclude ".DS_Store" -i $OSS_ACCESS_KEY_ID -k $OSS_ACCESS_KEY_SECRET --region $OSS_REGION

if [ $? -eq 0 ]; then
    log_success "上传成功！"
    log_info "访问地址: https://$OSS_BUCKET_NAME.$OSS_ENDPOINT/"
else
    log_error "上传失败"
    exit 1
fi

log_success "部署完成！"
