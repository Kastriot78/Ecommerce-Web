import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';
// routes
import categoryRoutes from './routes/categoryRoutes';
import contactRoutes from './routes/contactRoutes';
import subscribeRoutes from './routes/subscribeRoutes';
import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import colorRoutes from './routes/colorRoutes';
import orderRoutes from './routes/orderRoutes';
import banner3Routes from './routes/banner3Routes';
import banner2Routes from './routes/banner2Routes';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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
app.use('/banner2', banner2Routes);
app.use('/banner3', banner3Routes);

mongoose.connect(process.env.DB_CONNECTION_URL);
// mongoose.connect('mongodb+srv://Kastriot:fU4BERd8D2s3ufqi@cluster-shop.qmsbd0e.mongodb.net/?retryWrites=true&w=majority');

app.get('/', (req, res) => {
    res.send('Welcome to Ecommerce APP.');
});

app.use("/images", express.static("images"));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export the Express API
module.exports = app;