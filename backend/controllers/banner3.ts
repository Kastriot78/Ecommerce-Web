import Banner3 from '../models/Banner3';
import { Request, Response } from "express";

const getBanner3All = async (req: Request, res: Response) => {
    try {
        const banners = await Banner3.find().sort({ 'createdAt': -1 });
        res.status(200).json(banners);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getBanner3 = async (req: Request, res: Response) => {
    try {
        const banner = await Banner3.findOne({ _id: req.params.id });
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
    const newBanner = new Banner3({
        image: url + '/images/' + req.files[0].filename,
        title: req.body.title,
        subTitle: req.body.subTitle,
        createdAt: new Date().toISOString()
    });
    try {
        await newBanner.save();
        res.status(201).json({ newBanner: newBanner, success: true });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateBanner3 = async (req: any, res: Response) => {
    const id = req.params.id;
    const url = req.protocol + '://' + req.get('host')

    const banner3 = await Banner3.findById(id);

    if (!id) {
        return res.status(404).send('No banner with that id.');
    }

    if (banner3) {
        if (req.files[0]) {
            banner3.image = url + '/images/' + req.files[0].filename;
        }
        banner3.title = req.body.title;
        banner3.subTitle = req.body.subTitle;
        const updatedPost = await banner3.save();

        if (updatedPost) {
            return res.status(200).send({ msg: 'banner3 Updated', data: updatedPost, success: true });
        } else {
            return res.status(500).send({ msg: 'Error in Updating banner3' });
        }
    }
}

const deleteBanner3 = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No banner with that id.');
    }
    const deletedBanner = await Banner3.findByIdAndRemove(id);

    res.json({ message: 'Banner deleted successfully', post: deletedBanner });
}

export { getBanner3All, getBanner3, createBanner, updateBanner3, deleteBanner3 };