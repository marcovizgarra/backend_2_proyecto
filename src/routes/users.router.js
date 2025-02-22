import { Router } from 'express';
import { userDao } from '../dao/user.dao.js';

const usersRouter = Router();

usersRouter.get('/register', (req, res) => {
    res.render('register')
})

usersRouter.get('/login', (req, res) => {
    res.render('login')
})

usersRouter.post('/register', async (req, res) => {
    try {
        const user = await userDao.register({
            ...req.body
        });
        if(!user) return res.redirect('/errorRegistro');
        return res.redirect('/user/login')
    } catch (error) {
        res.send({ error: error.message })
    }
})

usersRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userDao.login(email, password);
        if(user){
            req.session.email = email;
            res.render('perfil', { user })
        } else {
            res.redirect('/errorLogin');
        }
    } catch (error) {
        res.send(error.message)
    }
})

export default usersRouter