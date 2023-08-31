import express from 'express';
const router = express.Router();

import { isAdmin, isAuth } from '../util';

router.get('/', isAuth, isAdmin, (req, res) => {
    res.send({ validAdmin: false })
});

export default router;