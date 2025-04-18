import createToken from '../middlewares/jwt/createToken.js';
import * as services from '../services/user.services.js'
// import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
    try {
        const email = req.body.email
        console.log(email);
        const token = await createToken(email);
        if (!token) {
            throw new Error(error.message)
        } else {
            // configuración de la cookie que contiene el token
            res.cookie('token', token, {
                httpOnly: true, // evita el acceso desde JS, limitando el acceso sólo mediante HTTP
                sameSite: 'Strict',
                maxAge: 3600000
            });
        }

        // const id = req.session.passport.user; // passport autentica al usuario y almacena su ID en req.session.passport.user
        // const user = await services.getUser(req.body.email)

        // // generación del token
        // const payload = {
        //     id: user._id,
        //     email: user.email,
        //     first_name: user.f_name,
        //     last_name: user.l_name,
        //     role: user.role
        // };
        // const options = { expiresIn: '1h' };
        // const token = jwt.sign(payload, SECRET_KEY, options);

        // // configuración de la cookie que contiene el token
        // res.cookie('token', token, {
        //     httpOnly: true, // evita el acceso desde JS, limitando el acceso sólo mediante HTTP
        //     sameSite: 'Strict',
        //     maxAge: 3600000
        // });

        res.redirect('/user/profile');
    } catch (error) {
        res.send(error.message);
    }
};

export const userProfile = async (email) => {
    try {
        const userProfile = await services.getUser(email);

        return userProfile;
    } catch (error) {
        throw new Error(error)
    }
};