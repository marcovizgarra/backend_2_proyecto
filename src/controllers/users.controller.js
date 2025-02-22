import { userDao } from "../dao/user.dao.js";

export const register = async (req, res) => {
    try {
        const user = await userDao.register({
            ...req.body
        });
        if (!user) return res.redirect('/errorRegistro');
        return res.redirect('/user/login')
    } catch (error) {
        res.send({ error: error.message })
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