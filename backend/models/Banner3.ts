import mongoose, { Schema } from 'mongoose';

const bannerSchema: Schema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },
});

const banner3Model = mongoose.model('Banner3', bannerSchema);

export default banner3Model;
