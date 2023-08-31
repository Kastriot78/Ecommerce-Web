import mongoose, { Schema } from 'mongoose';

const SubCategorySchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
});

const SubCategoryModel = mongoose.model('SubCategory', SubCategorySchema);

export default SubCategoryModel;
