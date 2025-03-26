import * as services from '../services/user.services.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv/config'

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res) => {
    try {
        // res.json({
        //     msg: 'Register ok !',
        //     session: req.session
        // });
        // await services.register(req.body)

        return res.redirect('/user/login')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        // const { email, password } = req.body;
        // const user = await services.login(email, password);
        const id = req.session.passport.user;
        const user = await services.getById(id);
        
        // generación del token
        const payload = {
            id: user._id,
            user: user.email,
            frist_name: user.f_name,
            last_name: user.l_name,
            role: user.role
        }
        const options = { expiresIn: '1h' }
        const token = jwt.sign(payload, SECRET_KEY, options);
        console.log('Token generado:', token);
        
        res.render('profile', user)
    } catch (error) {
        res.send(error.message)
    }
};