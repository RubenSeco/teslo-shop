# Descripción

## Correr en dev

1. Clonar el repositorio
2. Crear una copia del `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno
3. Instalar dependencias `npm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Correr el proyecto `npm run dev`

## Correr en producción

1. Antes de correr el build de producción eliminar el "import/no-anonymous-default-export" del archivo .eslintrc.json
2. Ponerle nombre a todas las funciones anónimas. Ver Video 258 de la sección 17. Poner funciones anónimas, es una PRACTICA NO RECOMENDADA
