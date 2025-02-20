import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const usersCollection = 'users';

const usersSchema = mongoose.Schema({
    f_name: {
        type: String,
        require: true
    },
    l_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    role: {
        type: String
    }
});

usersSchema.plugin(mongoosePaginate);
const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;