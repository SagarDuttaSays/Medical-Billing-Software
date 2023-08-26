const Product = require('../models/product');
const mongoose = require('mongoose')

exports.addOneProduct = async(req, res)=>{
    const {name, description, price} = req.body;
    const newProduct = new Product({name, description, price});
    try{
        await newProduct.save();
    } catch(err){
        return res.json({message:err.message})
    }
    res.status(200).json({message:"Product added successfully"});
}

exports.addManyProducts = async(req, res)=>{
    const {products} = req.body;
    Product.insertMany(products)
    .then(()=>res.status(200).json({message:"Data inserted successfully"}))
    .catch((err)=>res.json({message:err.message}))
}

exports.getAllProducts = async (req, res) =>{
    const products = await Product.find();
    if(!products){
        return res.status(404).json({message:"No products found"})
    }
    res.status(200).send(products);
}

exports.getOneProduct = async (req, res) =>{
    const product = await Product.findById(req.params.id);

    if(!product) {
        res.status(500).json({success: false})
    } 
    res.send(product);
}

exports.updateOneProduct = async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid Product Id')
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        },
        { new: true}
    )

    if(!product)
    return res.status(500).send('the product cannot be updated!')

    res.send(product);
}

exports.deleteOneProduct = async (req, res)=>{
    Product.findByIdAndRemove(req.params.id).then(product =>{
        if(product) {
            return res.status(200).json({success: true, message: 'the product is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "product not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
}

exports.deleteAllProducts = async (req, res)=>{
    Product.deleteMany()
    .then(()=>res.status(200).json({message:`All products deleted successfully`}))
    .catch((err)=>res.json({message:err.message}))
}