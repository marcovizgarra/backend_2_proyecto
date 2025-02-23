import { userDao } from "../dao/user.dao.js";
import { createHash, isValidPassword } from "../utils/bcrypt.js";

export const register = async (user) => {
    try {
        const { email, password } = user;       
        const existsUser = await userDao.getByEmail(email);

        if (existsUser && existsUser.email == user.email) throw new Error('El usuario ya existe');
        if (!existsUser) {
            return await userDao.register({
                ...user,
                password: createHash(password)
            });
        }

        return await userDao.register({
            ...user,
            password: createHash(password)
        })
    } catch (error) {
        throw (error)
    }
};

export const login = async (email, password) => {
    try {
        const existsUser = await userDao.getByEmail(email)
        if (!existsUser) throw new Error('Usuario no encontrado');
        
        const validPassword = isValidPassword(password, existsUser);
        if(!validPassword) throw new Error('Usuario y/o contraseña incorrectos')
        
        return existsUser
    } catch (error) {
        throw (error)
    }
};