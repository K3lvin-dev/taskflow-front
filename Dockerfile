# Stage 1: Construir a aplicação
FROM node:22-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia primeiro os ficheiros de dependências para aproveitar o cache do Docker
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Agora, copia todo o resto do código fonte
COPY . .

# Executa o build
RUN npm run build

# Stage 2: Servir a aplicação a partir de um servidor leve
FROM nginx:1.29-alpine AS final

# Copia apenas os ficheiros construídos do stage anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]