# 使用するベースイメージを指定
FROM node:16-alpine

# 作業ディレクトリを指定
WORKDIR /app

# パッケージ管理のためのファイルをコピー
COPY package*.json ./

# 依存パッケージをインストール
RUN npm install

# ソースコードをコピー
COPY . .

# ポートの公開
EXPOSE 3000

# 開発サーバーを起動
CMD ["npm", "start"]