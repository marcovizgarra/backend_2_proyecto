import { userDao } from "../dao/user.dao.js";
import ProfileDTO from '../dto/users/profile.res.dto.js';

class UserRepository{
    constructor(){
       this.dao = userDao;
    }

    getByEmail = async (email) => {
        try {
            const user = await this.dao.getByEmail(email);
            
            return new ProfileDTO(user)
        } catch(error) {
            throw new Error(error);
        }
    };
}

export const userRepository = new UserRepository();