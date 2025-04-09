import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';import path from 'path';
import viewsRouter from './routes/views.router.js'
import passport from 'passport';
import cookieParser from 'cookie-parser';
import __dirName from './utils.js';
import { initMongoDb } from './db/db.config.js';
import './passport/local.strategy.js';
import './passport/jwt.strategy.js';

const app = express();

app.use(cookieParser()); // 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirName + '/public'));

const sessionConfig = {
  secret: process.env.SECRET_KEY,// string para firmar cookies
  cookie: {maxAge: 300000}, // cookie con su tiempo de expiración
  saveUninitialized: true, // crea la sesión vacía
  resave: false // fuerza a guardar la sesión aunque aún no se haya utilizado
}

app.use(session(sessionConfig));

// app.post('login', (req, res) => {
//   const { username, password } = req.body;
//   const index = users.findIndex
// })

// conexión a Mongo
initMongoDb()
  .then(() => console.log('Base de datos conectada'))
  .catch((error) => console.log(error));

// passport configurado a nivel de aplicación, va SIEMPRE antes de las rutas, porque de lo contrario no va a inicializar passport
app.use(passport.initialize());
app.use(passport.session())

// path routers config
app.use('/', viewsRouter);

// handlebars engine config
app.engine('handlebars', handlebars.engine({
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
  }
}));

app.set('views', path.join(__dirName + '/views'));
app.set('view engine', 'handlebars');

// server init
const port = 8080
const httpServer = app.listen(port, () => {
    console.log('Servidor en el puerto', port);
});