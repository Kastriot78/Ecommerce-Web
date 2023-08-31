import express from 'express';
const router = express.Router();
import upload from '../fileUpload';

import { isAdmin, isAuth } from '../util';
import { getProducts, getProduct, getProductsByCategory, getProductsBySubCategory, createProduct, updateProduct, deleteProduct } from '../controllers/product';

router.get('/', getProducts);
router.get('/:id', getProduct);
router.get('/by-category/:category', getProductsByCategory);
router.get('/by-sub-category/:subCategory', getProductsBySubCategory);
router.post('/', isAuth, isAdmin, upload.array('images', 6), createProduct);
router.put('/:id', isAuth, isAdmin, upload.array('images', 6), updateProduct);
router.delete('/:id', isAuth, isAdmin, deleteProduct);

export default router;