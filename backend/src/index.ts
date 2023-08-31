import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';
// routes
import categoryRoutes from '../routes/categoryRoutes';
import contactRoutes from '../routes/contactRoutes';
import subscribeRoutes from '../routes/subscribeRoutes';
import productRoutes from '../routes/productRoutes';
import userRoutes from '../routes/userRoutes';
import colorRoutes from '../routes/colorRoutes';
import orderRoutes from '../routes/orderRoutes';
import banner1Routes from '../routes/banner1Routes';
import banner2Routes from '../routes/banner2Routes';
import banner3Routes from '../routes/banner3Routes';
import adminRoutes from '../routes/checkUserValidAdmin';
import subCategoryRoutes from '../routes/subCategoryRoutes';

import bodyParser from 'body-parser';
import cors from 'cors';
env.config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.CORS_DOMAINS
};

app.use(cors(corsOptions));

app.use('/categories', categoryRoutes);
app.use('/contacts', contactRoutes);
app.use('/subscribers', subscribeRoutes);
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/colors', colorRoutes);
app.use('/orders', orderRoutes);
app.use('/banner1', banner1Routes);
app.use('/banner2', banner2Routes);
app.use('/banner3', banner3Routes);
app.use('/admin/user', adminRoutes);
app.use('/sub-categories', subCategoryRoutes);

mongoose.connect(process.env.DB_CONNECTION_URL);

app.get('/', (req, res) => {
  res.send('Welcome to Project.');
});

app.use("/images", express.static("images"));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;