import { userRepository as UserRepository } from "../repository/user.repository.js";

export const getUser = async (email) => {
    try {
        return await UserRepository.getByEmail(email);
    } catch(error) {
        throw new Error (error)
    }
};