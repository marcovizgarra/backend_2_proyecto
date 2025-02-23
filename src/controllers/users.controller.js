import * as services from '../services/user.services.js'

export const register = async (req, res) => {
    try {
        await services.register(req.body)

        return res.redirect('/user/login')
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await services.login(email, password);
        
        res.render('profile', user)
    } catch (error) {
        res.send(error.message)
    }
};