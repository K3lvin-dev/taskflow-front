# Stage 1: Construir a aplicação
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .

# --- PASSO DE DEPURAÇÃO ADICIONADO ---
# Lista todos os ficheiros de forma recursiva para vermos o que está dentro do contentor
RUN ls -laR

# Executa o build
RUN npm run build

# Stage 2: Servir a aplicação a partir de um servidor leve
FROM nginx:1.29-alpine AS final
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]