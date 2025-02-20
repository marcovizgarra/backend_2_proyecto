import express from 'express';
import handlebars from 'express-handlebars';import path from 'path';
import __dirName from './utils.js';
import viewsRouter from './routes/views.router.js'
import { initMongoDb } from './db/db.config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirName + '/public'));

// conexión a Mongo
initMongoDb()
  .then(() => console.log('Base de datos conectada'))
  .catch((error) => console.log(error));

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