# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# Instalar 'serve' para servir los archivos estáticos
RUN npm install -g serve

# Copiar los archivos construidos desde la etapa anterior
COPY --from=builder /app/dist ./dist

# El puerto es inyectado por Cloud Run
ENV PORT=8080

# Comando para iniciar la aplicación, escuchando en el puerto configurado
CMD ["sh", "-c", "serve -s dist -l tcp://0.0.0.0:${PORT}"]
