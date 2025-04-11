import passport from 'passport';
import jwtAuth from '../middlewares/jwt/jwtAuth.js';
import { Router } from 'express';
import * as controllers from '../controllers/users.controller.js'

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

usersRouter.post('/register', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Si no hay usuario, significa que hubo un error de autenticación
            return res.status(400).json({ message: info.message });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/user/login');
        });
    })(req, res, next);
});

usersRouter.post('/login', passport.authenticate('login'), controllers.login);

export default usersRouter