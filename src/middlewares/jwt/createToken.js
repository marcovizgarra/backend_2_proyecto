import * as services from '../../services/user.services.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv/config';

const createToken = async (email) => {
    try {
        const user = await services.getByEmail(email)
        console.log({user: user});
        
        // generación del token
        const payload = {
            email: user.email,
            first_name: user.f_name,
            last_name: user.l_name,
            role: user.role
        };
        const options = { expiresIn: '1h' };
        const token = jwt.sign(payload, process.env.SECRET_KEY, options);
        if(token) return token
    } catch (error) {
        throw new Error(error)
    };
};

export default createToken;