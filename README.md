# Server Stack MERN boilerplate

Stack MERN boilerplate

Backend realizado en nodeJS
Conexión a base de datos MySQL
Atenticación con passport con estrategia local y estrategias OAuth de redes sociales (Login, Signin)
Servicio de envío de emails con nodemailer
CRUD (Get, Post, Put, Delete)
Estructura de carpetas

## Dependencias 🔧
nodemailer
passport
passport-local
express
mysql

# 🚀 Instalación 🔧
Para poder ver y probar este proyecto en tu ordenador local, haz Fork tanto de este repositorio como el [repositorio del front-end (con ReactJS)](https://github.com/GitSkynet/OpenBooks-react-server)


Crea  un **archivo .env** en el directorio raíz y modifica las variables de entorno para adaptarlas a tu configuración:

```
# PORT & SECRET SESSION 
PORT=4000
# For more security, Generate a unique random key, you can use `openssl rand -hex 32` in terminal
SECRET_SESSION=boilerplate-mern-nodeJS

# Connection to DDBB MySQL
HOSTSQL= # your host sql
USERMYSQL= # your username mysql
PASSWORD= your password mysql
DATABASESQL=database name
PORTSQL=port sql (by default, 3306)

# Connection/configuration of nodemailer
NODEMAILER_USER=example@gmail.com
NODEMAILER_KEY=passworduserKey
NODEMAILER_DIRECTION=exampleto@gmail.com

# APIS Connections
API_OPENLIBRA=https://www.etnassoft.com/api/v1/get/?
API_TMDB= Your api of TMDB 
API_OPEN_WEATHER_MAP=your api Open Weather Map
```

## Instalamos todas las dependencias: 📋

```
npm install
```
_Levantamos el servidor_
```
npm start
```

<!-- _Ya tenemos nuestro backend escuchando en http://localhost:4000 y conectado a mongoDB_

## Realizando el deploy en Heroku ⚙️

## 📌Una vez tengas la build hecha del repo del cliente📌, ejecutamos:

_Para comprobar que se ha añadido a la carpeta public los cambios de la build_
```
git status
```
_Añadimos  Todos los cambios_
```
git add .
```
_Creamos el commit_
```
git commit -m"myCommit"
```
_Hacemos el push a Heroku_
```
git git push heroku master"
```

### Configurando Heroku 🔩

_Habrá que crear en Heoku las mismas variables que declaramos arriba para el archivo .env, pero en este caso; en la dirección de la base de datos le daremos la dirección de mongoDB Atlas_

```
MONGODB_URI=tu dirección de mongodb atlas
```

## Construido con 🛠️

_Server realizado con_

* [nodeJS](https://nodejs.org/es/) - entorno de ejecución para JavaScript construido con el motor de JavaScript V8 de Chrome.
* [Express](https://expressjs.com/es/) - Framework de nodeJS
* [Cloudinary](https://cloudinary.com/) - Nube para gestionar y almacenar imágenes en la web

## Actualemente trabajando🖇️

- Refactorizar y pulir todo el código del backend, para mejorar la eficiencia y rendimiento a la hora de hacer/recibir llamadas de la base de datos.
- Incorporar nodeMailer
- Incorporar Disquss en la web
- Habilitar la creación de listas (user)
- Habilitar feed social
- Habilitar añadir a favoritos/user Lists  

## Autor ✒️

* **LinkedIn** - [Carlos Curtido](https://www.linkedin.com/in/carlos-curtido/)
* **GitHub** - [GitSkynet](https://github.com/GitSkynet)

También puedes mirar mi [portfolio](https://portfoliocurtido.herokuapp.com/) donde muestro otros proyectos en los que estoy trabajando 

## Licencia 📄

Este proyecto está bajo Licencia libre - mira el archivo [LICENSE.md](LICENSE.md) para detalles

---
⌨️ con ❤️ por [Carlos Curtido](https://github.com/GitSkynet) ❤️ -->

