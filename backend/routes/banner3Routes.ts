import express from 'express';
const router = express.Router();
import { isAuth, isAdmin } from '../util';
import upload from '../fileUpload';
import { getBanner3All, getBanner3, createBanner, updateBanner3, deleteBanner3 } from '../controllers/banner3';

router.get('/', getBanner3All);
router.get('/:id', getBanner3);
router.post('/', isAuth, isAdmin, upload.array('image', 1), createBanner);
router.put('/:id', isAuth, isAdmin, upload.array('image', 1), updateBanner3);
router.delete('/:id', isAuth, isAdmin, deleteBanner3);

export default router;