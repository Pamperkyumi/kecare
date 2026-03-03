FROM oven/bun:1.3.10-slim

ARG EDGEONE_API_TOKEN
ENV EDGEONE_API_TOKEN=$EDGEONE_API_TOKEN

ENV COOKBOOK_VERSION=1.0.0-beta.201

ENV TZ=UTC
ENV COOKBOOK_MODE=prod-zh-cn
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /workspace

SHELL ["/bin/bash", "-c"]

RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates curl wget git zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /tmp/.cookbook-installer && cd /tmp/.cookbook-installer \
    && wget -O cookbook.tgz https://mirrors.cloud.tencent.com/npm/@milkio/cookbook-linux-x64/-/cookbook-linux-x64-${COOKBOOK_VERSION}.tgz \
    && tar -xzf cookbook.tgz \
    && mv /tmp/.cookbook-installer/package/co /usr/local/bin/co \
    && chmod +x /usr/local/bin/co \
    && rm -rf /tmp/.cookbook-installer

COPY package.json bun.lock bunfig.toml /workspace/
COPY projects/kecare/package.json /workspace/projects/kecare/
COPY .commands /workspace/.commands/

RUN source /root/.bashrc \
    && cd /workspace \
    && bun install

COPY . /workspace

RUN bun install

RUN co build kecare

WORKDIR /workspace/projects/kecare

RUN if [ -d ".output/public/_nuxt" ]; then \
        echo ".output/public/_nuxt 目录存在"; \
    else \
        echo "错误: .output/public/_nuxt 目录不存在，构建失败"; \
        exit 1; \
    fi

RUN cd .output/public && zip -r ../kecare-zh-cn.zip .

CMD ["bash", "-c", "bun x edgeone pages deploy ./.output/kecare-zh-cn.zip -n kecare-zh-cn -t $EDGEONE_API_TOKEN"]