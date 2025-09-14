# Utiliza uma imagem Nginx super leve, pois só precisamos de servir ficheiros estáticos
FROM nginx:1.29-alpine

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a sua própria configuração do Nginx (opcional, mas recomendado)
COPY nginx.conf /etc/nginx/conf.d

# Copia os ficheiros da aplicação que foram construídos no passo anterior (no workflow)
COPY dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o servidor
CMD ["nginx", "-g", "daemon off;"]