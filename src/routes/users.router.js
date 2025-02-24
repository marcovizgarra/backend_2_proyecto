import passport from 'passport';
import { Router } from 'express';
import * as controllers from '../controllers/users.controller.js'

const usersRouter = Router();

usersRouter.get('/register', (req, res) => {
    res.render('register')
});

usersRouter.get('/login', (req, res) => {
    res.render('login')
});

usersRouter.post('/register', passport.authenticate('register'), controllers.register);
usersRouter.post('/login', passport.authenticate('login'), controllers.login);

export default usersRouter