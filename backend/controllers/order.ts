import Order from '../models/Order';
import Product from '../models/Product';
import { Request, Response } from "express";
import { sendOrderConfirmationEmail } from '../util';

const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().sort({ _id: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getOrder = async (req: Request, res: Response) => {
    try {
        let id = req.params.id;
        await Order.findById(id, (err: any, data: any) => {
            if (err) return res.json({ message: 'Porosia nuk ekziston.' });
            res.send(data);
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getMyOrders = async (req: Request, res: Response) => {
    try {
        const orders = await Order.find({ user: req.params.userId }).sort({ _id: -1 })
        res.status(201).json({ orders: orders, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createOrder = async (req: Request, res: Response) => {
    const isoDate = new Date().toISOString();
    const localDate = new Date(isoDate).toLocaleString();

    const newOrder = new Order({
        user: req.body.user,
        orderItems: req.body.orderItems,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        zip: req.body.zip,
        phone: req.body.phone,
        email: req.body.email,
        // createdAt: new Date().toISOString()
        createdAt: localDate
    });
    const data = { address: req.body.address, city: req.body.city, phone: req.body.phone, time: localDate }
    try {
        for (const item of req.body.orderItems) {
            const product = await Product.findById(item.product._id);
            if(product.sasia < 1) {
                return res.status(409).json({ message: 'Produkti nuk ka sasi te mjaftushme ne stock', product: product });
            }
            product.sasia -= item.quantity;
            await product.save();
        }

        await newOrder.save();
        sendOrderConfirmationEmail(req.body.email, req.body.firstName, data);

        res.status(200).json({ newOrder: newOrder, success: true });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const deleteOrder = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No order with that id.');
    }
    const deletedOrder = await Order.findByIdAndRemove(id);

    res.json({ message: 'Order deleted successfully', post: deletedOrder });
}

export { getOrders, getMyOrders, getOrder, createOrder, deleteOrder };