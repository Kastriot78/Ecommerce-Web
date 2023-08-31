import Banner2 from '../models/Banner2';
import { Request, Response } from "express";

const getBanner2All = async (req: Request, res: Response) => {
    try {
        const categories = await Banner2.find().sort({ 'createdAt': -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getBanner2 = async (req: Request, res: Response) => {
    try {
        const banner = await Banner2.findOne({ _id: req.params.id });
        if (!banner) {
            return res.status(404).json({ message: 'Banneri nuk ekziston.' });
        }
        res.json(banner);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createBanner = async (req: any, res: Response) => {
    const url = req.protocol + '://' + req.get('host');
    const newBanner = new Banner2({
        image: url + '/images/' + req.files[0].filename,
        title: req.body.title,
        createdAt: new Date().toISOString()
    });
    try {
        await newBanner.save();
        res.status(201).json({ newBanner: newBanner, success: true });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateBanner2 = async (req: any, res: Response) => {
    const id = req.params.id;
    const url = req.protocol + '://' + req.get('host')

    const banner2 = await Banner2.findById(id);

    if (!id) {
        return res.status(404).send('No banner with that id.');
    }

    if (banner2) {
        if (req.files[0]) {
            banner2.image = url + '/images/' + req.files[0].filename;
        }
        banner2.title = req.body.title;
        const updatedPost = await banner2.save();

        if (updatedPost) {
            return res.status(200).send({ msg: 'banner2 Updated', data: updatedPost, success: true });
        } else {
            return res.status(500).send({ msg: 'Error in Updating banner2' });
        }
    }
}

const deleteBanner2 = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No banner with that id.');
    }
    const deletedBanner = await Banner2.findByIdAndRemove(id);

    res.json({ message: 'Banner deleted successfully', post: deletedBanner });
}

export { getBanner2All, getBanner2, createBanner, updateBanner2, deleteBanner2 };