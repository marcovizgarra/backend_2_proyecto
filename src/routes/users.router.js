import passport from 'passport';
import jwtAuth from '../middlewares/jwt/jwtAuth.js';
import { Router } from 'express';
import * as controllers from '../controllers/users.controller.js'

const usersRouter = Router();

//get
usersRouter.get('/register', (req, res) => {
    res.render('register')
});

usersRouter.get('/login', (req, res) => {
    res.render('login')
});

usersRouter.get('/profile', jwtAuth, async (req, res) => {
    const email = req.user.email; // extrae el email de req.user.email, el correo se encuentra seteado allí porque el middleware jwtAuth realiza ese procedimiento antes de llegar a esta instancia     
    const profile = await controllers.userProfile(email);
    
    res.render('profile', profile)
});

usersRouter.get('/unauthorized', (req, res) => {
    res.render('unauthorized')
});

//post
usersRouter.post('/register', (req, res, next) => {
    passport.authenticate('register', (error, user, info) => {
        if (error) {
            return next(error);
        }
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        
        return res.redirect('/user/login');
    })(req, res, next);
});

usersRouter.post('/login', controllers.login);

export default usersRouter