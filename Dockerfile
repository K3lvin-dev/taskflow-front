# Build stage: usa Node para instalar dependências e gerar os ficheiros estáticos
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package manifests e instala dependências
COPY package.json package-lock.json* ./
RUN npm ci --silent || npm install --silent --force

# Copia o restante do código e gera o build de produção
COPY . .
RUN npm run build

# Runtime stage: Nginx para servir os ficheiros estáticos
FROM nginx:1.29-alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a sua própria configuração do Nginx (opcional, mas recomendado)
COPY nginx.conf /etc/nginx/conf.d

# Copia o build gerado no estágio anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o servidor
CMD ["nginx", "-g", "daemon off;"]