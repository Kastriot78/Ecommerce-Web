import express from 'express';
const router = express.Router();
import {isAuth, isAdmin} from '../util';
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/category';

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', isAuth, isAdmin, createCategory);
router.put('/:id', isAuth, isAdmin, updateCategory);
router.delete('/:id', isAuth, isAdmin, deleteCategory);

export default router;