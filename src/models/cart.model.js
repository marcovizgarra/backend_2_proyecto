import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartCollection = 'carts';

const cartSchema = mongoose.Schema({
    items: [
        {
            item: {type: mongoose.Schema.Types.ObjectId, ref: 'products'},
            quant: { type: Number, require: true, default: 1 }
        }
    ],
});

cartSchema.plugin(mongoosePaginate);
const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;