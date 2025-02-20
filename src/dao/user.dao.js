import usersModel from '../models/user.model.js'

class UserDao {
    constructor(model){
        this.model = model
    }
    
    async register(user){
        try {
            return await this.model.create(user)
        } catch (error) {
            throw new Error(error);
        }
    }

    async login(email, pass){
        try {
            return await this.model.findOne({ email, password })
        } catch (error) {
            throw new Error(error)
        }
    }
};

export const userDao = new UserDao(usersModel)