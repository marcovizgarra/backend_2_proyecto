import { Router } from "express";
import cartModel from "../models/cart.model.js";

const cartRouter = Router();

const createCart = async () => {
	  try {
	    const emptyCart = await cartModel.create({
	      items: [] // Array vacío de items
	    });
	  } catch (error) {
	    console.error('Error al crear el carrito:', error);
	  }
	};

cartRouter.get('/', async (req, res) => {
    try {
        // Get cart with populate
        let cartExists = await cartModel.findOne()
        if (!cartExists) {
          createCart()
          res.send({ message: 'Carrito creado, vuelva a /products para agregar productos al carrito' })
        } else {
          let cart = await cartModel.findOne().populate('items.item');
          res.render('cart', {
              cartItems: cart.items.map(i => ({
                  product: i.item,
                  quant: i.quant
              }))
          });
        }
    
        // Rendering views with items (populate)
        
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
      }
});

export default cartRouter