import * as services from '../services/api.services.js'

export const profile = async (req, res) => {
    try {
        const email = req.user?.email;
        if(!email) {
            return res.render('unauthorized', { message: 'Usuario no encontrado con el email proporcionado' })
        }

        const user = await services.getByEmail(email);
        if(!user) {
            return res.render('unauthorized', { message: 'Usuario no encontrado en la base de datos' })
        }

        res.render('profile', user);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};