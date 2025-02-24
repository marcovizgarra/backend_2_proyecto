import * as services from '../services/user.services.js'

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
        res.render('profile', user)
    } catch (error) {
        res.send(error.message)
    }
};