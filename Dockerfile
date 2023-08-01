#Dockerfile es el archivo que lee docker para la configuración del contenedor

# Usa la imagen oficial de Node.js como punto de partida
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package.json ./
COPY package-lock.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos del proyecto al contenedor
COPY . .

# Expone el puerto en el que escucha tu aplicación Node.js
EXPOSE 3000

# Comando para ejecutar tu aplicación Node.js
CMD [ "npm", "run", "dev" ]