import mongoose, { Schema } from 'mongoose';

const productSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    priceShumice: { type: Number, required: true },
    pricePakice: { type: Number, required: true },
    images: { type: Array, required: true },
    description: { type: String, required: true },
    InStock: { type: Boolean, required: true, default: false },
    sasia: { type: Number, required: true },
    createdAt: { type: Date, default: new Date() },
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;
