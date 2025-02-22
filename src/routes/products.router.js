import { Router } from "express";
import * as productsController from '../controllers/products.controller.js'

const productsRouter = Router();

productsRouter.get('/', productsController.getAllProducts);
productsRouter.post('/add', productsController.addProduct);

export default productsRouter