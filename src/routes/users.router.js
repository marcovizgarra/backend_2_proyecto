import { Router } from 'express';
import * as controllers from '../controllers/users.controller.js'

const usersRouter = Router();

usersRouter.get('/register', (req, res) => {
    res.render('register')
});

usersRouter.get('/login', (req, res) => {
    res.render('login')
});

usersRouter.post('/register', controllers.register);
usersRouter.post('/login', controllers.login);

export default usersRouter