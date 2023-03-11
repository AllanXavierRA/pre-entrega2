import { request, response } from "express";
import mongoose from "mongoose";
import { Producto } from "../dao/model/producto.js";




const productPost = async( req=request, res=response ) => {
    const body = req.body;
    

    const producto = new Producto(body);

    await producto.save();

    res.json({
        producto
    })

}

const productGet = async ( req=request, res=response) => {
    const {limit} = req.query;
    const  productos = await Producto.find()
    .limit(Number(limit)||10)
    

    console.log(productos);
    res.json({
        productos
    })
}



const productById = async(req=request, res=response) => {

    const {pid} = req.params;


    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ message: 'El ID del producto no es válido' });
      }

    const product = await Producto.findById(pid);

    if(product === null){
        return res.status(404).json({message: 'Producto no encontrado'})

    }

    res.json({
        product
    })


}

const productDelete = async( req=request, res=response ) => {
    const {pid} = req.params;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ message: 'El ID del producto no es válido' });
    }

    const product = await Producto.findByIdAndDelete(pid)

    if(product === null){
        return res.status(404).json({message: 'Producto no encontrado'})
    }


    res.json({
        product
    })
}

const productPut = async(req=request, res=response) => {
    const {pid} = req.params;
    const {title, description, price, thumbnail, stock} = req.body;

    if (!mongoose.Types.ObjectId.isValid(pid)) {
        return res.status(400).json({ message: 'El ID del producto no es válido' });
    }

    const product =  await Producto.findByIdAndUpdate( pid, {title, description, price, thumbnail, stock}, {new: true})

    if(product === null){
        return res.status(404).json({message: 'Producto no encontrado'})
    }

    res.json({
        product
    })

}

export {
    productPost,
    productGet,
    productDelete,
    productById,
    productPut
}