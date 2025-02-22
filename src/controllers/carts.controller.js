import cartModel from "../models/cart.model.js";

const createCart = async () => {
    try {
        const emptyCart = await cartModel.create({
            items: [] // Array vacío de items
        });
    } catch (error) {
        console.error('Error al crear el carrito:', error);
    }
};

export const getCart = async (req, res) => {
    try {
        // Cart con populate
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
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los productos');
    }
};