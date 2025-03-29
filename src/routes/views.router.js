import { Router } from "express";
import productsRouter from '../routes/products.router.js';
import cartRouter from '../routes/cart.router.js';
import usersRouter from '../routes/users.router.js';
import apiRouter from '../routes/api.router.js';

const router = Router();

router.get('/', async (req, res) => {
    res.render('index', {})
});

router.use('/products', productsRouter);
router.use('/cart', cartRouter);
router.use('/user', usersRouter)
router.use('/api', apiRouter)

export default router