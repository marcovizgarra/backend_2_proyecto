import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productCollection = 'products';

const productSchema = mongoose.Schema({
    title: { type: String, require: true },
    platform: { type: String, require: true },
    brief_overview: { type: String, require: true },
    full_description: String,
    image: { type: String, require: false },
    price: { type: Number, require: true }
});

productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);

export default productModel;