import { Router } from "express";
import productModel from "../models/product.model.js";
import cartModel from "../models/cart.model.js";

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    let page = parseInt(req.query.page);
    let row = parseInt(req.query.row);

    if (!row || row < 1) {
    row = 4
    };

    let query = await productModel.paginate({}, {page, limit: row, lean: true});
    query.prevLink = query.hasPrevPage ? `http://localhost:8080/products?row=${row}&page=${query.prevPage}` : '';
    query.nextLink = query.hasNextPage ? `http://localhost:8080/products?row=${row}&page=${query.nextPage}` : '';

    res.render('products', query)
});

productsRouter.post('/add', async (req, res) => {
    const { cartId, itemId, quantity = parseInt(quantity) } = req.body;        

    try {
      const cart = await cartModel.findOne({ _id: cartId, 'items.item' : itemId });
  
      if (cart) {
        const updatedCart = await cartModel.updateOne(
          { _id: cartId, 'items.item': itemId},
          {
            $inc: { 'items.$.quant': quantity}
          }
        );
  
        console.log('Cart updated');
        res.send("Producto añadido satisfactoriamente");
        return updatedCart;
      } else {
        const updatedCart = await cartModel.findByIdAndUpdate(
          cartId, {
            $push: { items: {item: itemId, quant: quantity } }
          },
          { new: true }
        );
  
        console.log('Item created');
        res.send("Producto añadido satisfactoriamente");
        return updatedCart;
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  })

export default productsRouter