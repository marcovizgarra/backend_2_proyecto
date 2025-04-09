import passport from 'passport';
import { Router } from 'express';
import * as controllers from '../controllers/users.controller.js'
import jwtAuth from '../middlewares/jwt/jwt.js';

const usersRouter = Router();

usersRouter.get('/register', (req, res) => {
    res.render('register')
});

usersRouter.get('/login', (req, res) => {
    res.render('login')
});

usersRouter.get('/profile', jwtAuth, (req, res) => {
    res.render('profile')
});

usersRouter.get('/unauthorized', (req, res) => {
    res.render('unauthorized')
});

usersRouter.post('/register', passport.authenticate('register'), controllers.register);
usersRouter.post('/login', passport.authenticate('login'), controllers.login);

export default usersRouter