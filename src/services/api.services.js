import { userDao } from "../dao/user.dao.js";

export const getByEmail = async (email) => {
    try {
        return await userDao.getByEmail(email)
    } catch (error) {
        throw new Error (error)
    }
};