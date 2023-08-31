import express from 'express';
const router = express.Router();
import { isAuth, isAdmin } from '../util';
import upload from '../fileUpload';
import { getBanner2All, getBanner2, createBanner, updateBanner2, deleteBanner2 } from '../controllers/banner2';

router.get('/', getBanner2All);
router.get('/:id', getBanner2);
router.post('/', isAuth, isAdmin, upload.array('image', 1), createBanner);
router.put('/:id', isAuth, isAdmin, upload.array('image', 1), updateBanner2);
router.delete('/:id', isAuth, isAdmin, deleteBanner2);

export default router;