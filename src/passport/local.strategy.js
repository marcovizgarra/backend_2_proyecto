import passport from 'passport';
import { Strategy } from 'passport-local';
import * as services from '../services/user.services.js';

const strategyConfig = { // los campos de este objeto deben tener los mismos nombres que el modelo de usuario den MongoDb.
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true, // este parámetro es para recibir la request que se envía desde el cliente.
};

const register = async(req, email, password, done) => {
    try {
        const user = await services.getByEmail(email)
        if (user){
            return done(null, false, { message: 'El usuario ya existe' })
        }
            // La función done, es una callback para verificar el resultado del proceso de autenticación, y recibe:
            // 1 - Cómo primer parámetro un error, si lo hubiera, de lo contrario se pasa null
            // 2 - El segundo es el usuario, que en este caso es false
            // 3 - El tercer parámetro es un mensaje de error
        const newUser = await services.register(req.body);
        return done (null, newUser)
    } catch (error) {
        return res.json({ error: error })
    }
};

const login = async (req, email, password, done) => {
    try {
        const userLogin = await services.login(email, password);
        if (!userLogin) return done(null, false, { message: 'Error en autenticación' })
        return done(null, userLogin);
    } catch (error) {
        return done(error)
    }
};

const registerStrategy = new Strategy(strategyConfig, register);
const loginStrategy = new Strategy(strategyConfig, login);

passport.use('register', registerStrategy);
passport.use('login', loginStrategy);

passport.serializeUser((user, done) => {
    try {
        done(null, user._id)
    } catch (error) {
        return done(error)
    }
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await services.getById(id)
        return done(null, user)
    } catch (error) {
        return done(error)
    }
});