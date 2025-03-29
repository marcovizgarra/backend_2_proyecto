import * as services from '../services/api.services.js'

export const profile = async (req, res) => {
    try {
        const email = req.user?.email;
        if(!email) {
            return res.status(400).json({ error: 'Usuario no encontrado en token' });
        }

        const user = await services.getByEmail(email);
        if(!user) {
            return res.status(400).json({ error: 'Usuario no encontrado en base de datos' });
        }

        res.render('profile', user);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
};