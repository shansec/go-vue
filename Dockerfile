# 声明镜像来源为node:16.15.0
FROM node:16.15.0

# 声明工作目录
WORKDIR /go/go-vue

# 拷贝整个web项目到当前工作目录
COPY . .

# npm 修改淘宝镜像
RUN npm config set registry https://registry.npm.taobao.org

# npm 安装 pnpm
RUN npm install -g pnpm

# pnpm 修改淘宝镜像
RUN pnpm config set registry https://registry.npm.taobao.org

# 使用pnpm进行安装依赖
RUN pnpm install

# 使用 pnpm build 命令打包web项目
RUN pnpm build

# 声明镜像来源为nginx:alpine
FROM nginx:alpine

# 从.docker-compose/nginx/conf.d/目录拷贝my.conf到容器内的/etc/nginx/conf.d/my.conf
COPY .docker-compose/nginx/conf.d/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY .docker-compose/nginx/conf.d/my.conf /etc/nginx/conf.d/my.conf

# 从第一阶段进行拷贝文件
COPY --from=0 /go/go-vue/dist /usr/share/nginx/html

# 查看/etc/nginx/nginx.conf文件
RUN cat /etc/nginx/nginx.conf

# 查看 /etc/nginx/conf.d/my.conf
RUN cat /etc/nginx/conf.d/my.conf

# 查看 文件是否拷贝成功
RUN ls -al /usr/share/nginx/html
