import { Router } from "express";
import productsRouter from '../routes/products.router.js';
import cartRouter from '../routes/cart.router.js';

const router = Router();

router.get('/', async (req, res) => {
    res.render('index', {})
});

router.use('/products', productsRouter);
router.use('/cart', cartRouter);

export default router