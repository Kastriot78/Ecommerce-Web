import SubCategory from '../models/SubCategory';
import { Request, Response } from "express";

const getSubCategories = async (req: Request, res: Response) => {
    try {
        const categories = await SubCategory.find().sort({ _id: -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getSubCategory = async (req: Request, res: Response) => {
    try {
        const category = await SubCategory.findOne({ _id: req.params.id });
        if (!category) {
            return res.status(404).json({ message: 'Nën Kategoria nuk ekziston.' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createSubCategory = async (req: Request, res: Response) => {
    const newSubCategory = new SubCategory({
        name: req.body.name,
        subCategories: req.body.subCategories,
        createdAt: new Date().toISOString()
    });
    try {
        await newSubCategory.save();
        res.status(201).json({ newSubCategory: newSubCategory, success: true });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateSubCategory = async (req: Request, res: Response) => {
    const id = req.params.id;

    const subCategory = await SubCategory.findById(id);

    if (!id) {
        return res.status(404).send('No sub category with that id.');
    }

    if (subCategory) {
        subCategory.name = req.body.name;
        subCategory.subCategories = req.body.subCategories;
        const updatedPost = await subCategory.save();

        if (updatedPost) {
            return res.status(200).send({ msg: 'Sub Category Updated', data: updatedPost, success: true });
        } else {
            return res.status(500).send({ msg: 'Error in Updating sub category' });
        }
    }
}

const deleteSubCategory = async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id) {
        return res.status(404).send('No sub category with that id.');
    }
    const deletedCategory = await SubCategory.findByIdAndRemove(id);

    res.json({ message: 'Sub Category deleted successfully', post: deletedCategory });
}

export { getSubCategories, getSubCategory, createSubCategory, updateSubCategory, deleteSubCategory };