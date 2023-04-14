import {Router} from 'express';
import CartManager from "../daos/manager/cartManager"

const routerCarts = Router();
const cartManager = new CartManager("./src/db/carrito.json");

routerCarts.get('/', async(req,res)=>{
    try {
        return res.send( await cartManager.getCarts())
    } catch (error) {
        console.log("🚀 ~ file: carts.js:11 ~ routerCarts.get ~ error:", error)
        
    }
})
routerCarts.post('/', async(req,res)=>{
    try {
        return res.send(await cartManager.createCart())
    } catch (error) {
        
    }
})

routerCarts.get('/:cid', async(req,res)=>{
    let cartId= req.params.cid ; 
    const carrito = await cartManager.getCartById(cartId);
    return res.send(carrito)
})

routerCarts.post('/:cid/product/:pid', async(req,res)=>{
    let cartId = req.params.cid
    let pId = req.params.pid
    
    const newProduct = await cartManager.addProduct(cartId,pId);
    return res.send(newProduct)
})

routerCarts.delete('/:cid/product/:pid', async(req,res)=>{
    let cartId = req.params.cid
    let pId = req.params.pid
    const deleteProduct = await cartManager.deleteProduct(cartId,pId);
    return res.send(deleteProduct)
})
export default routerCarts;