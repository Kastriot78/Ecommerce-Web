import express from 'express';
const router = express.Router();
import {isAuth, isAdmin} from '../util';
import { getSubCategories, getSubCategory, createSubCategory, updateSubCategory, deleteSubCategory } from '../controllers/subcategory';

router.get('/', getSubCategories);
router.get('/:id', getSubCategory);
router.post('/', isAuth, isAdmin, createSubCategory);
router.put('/:id', isAuth, isAdmin, updateSubCategory);
router.delete('/:id', isAuth, isAdmin, deleteSubCategory);

export default router;