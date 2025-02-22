import { Router } from "express";
import * as cartsControler from '../controllers/carts.controller.js'

const cartRouter = Router();

cartRouter.get('/', cartsControler.getCart);

export default cartRouter