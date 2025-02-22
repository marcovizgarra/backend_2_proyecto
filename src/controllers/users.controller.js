import { userDao } from "../dao/user.dao.js";
import * as services from '../services/user.services.js'

export const register = async (req, res) => {
    try {
        const user = await services.register(req.body)

        return res.redirect('/user/login')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.login(email, password);
        if(user){
            req.session.email = email;
            req.session.info = {
                loggedIn: true,
                admin: user.role,
            }
            res.render('profile', user)
        } else {
            res.redirect('/errorLogin');
        }
    } catch (error) {
        res.send(error.message)
    }
};