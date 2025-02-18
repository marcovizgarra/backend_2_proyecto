import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import __dirName from './utils.js';
import viewsRouter from './routes/views.router.js'

// environment variables config
dotenv.config();
const URLConnection = process.env.URLMongoDb;

// conexión a la base de datos
mongoose.connect(URLConnection);

// server init
const port = 8080
const app = express();
const httpServer = app.listen(port, () => {
    console.log('Server on port', port);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirName + '/public'));

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