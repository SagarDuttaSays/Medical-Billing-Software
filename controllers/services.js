const Service = require('../models/service');
const mongoose = require('mongoose')

exports.addOneService = async(req, res)=>{
    const {name, description, price} = req.body;
    const newService = new Service({name, description, price});
    try{
        await newService.save();
    } catch(err){
        return res.json({message:err.message})
    }
    res.status(200).json({message:"service added successfully"});
}

exports.addManyServices = async(req, res)=>{
    const {services} = req.body;
    Service.insertMany(services)
    .then(()=>res.status(200).json({message:"Data inserted successfully"}))
    .catch((err)=>res.json({message:err.message}))
}

exports.getAllServices = async (req, res) =>{
    const services = await Service.find();
    if(!services){
        return res.status(404).json({message:"No service found"})
    }
    res.status(200).send(services);
}

exports.getOneService = async (req, res) =>{
    const service = await Service.findById(req.params.id);

    if(!service) {
        res.status(500).json({success: false})
    } 
    res.send(service);
}

exports.updateOneService = async (req, res)=> {
    if(!mongoose.isValidObjectId(req.params.id)) {
       return res.status(400).send('Invalid service Id')
    }

    const service = await Service.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price
        },
        { new: true}
    )

    if(!service)
    return res.status(500).send('the service cannot be updated!')

    res.send(service);
}

exports.deleteOneService = async (req, res)=>{
    Service.findByIdAndRemove(req.params.id).then(service =>{
        if(service) {
            return res.status(200).json({success: true, message: 'the service is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "service not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
}

exports.deleteAllServices = async (req, res)=>{
    Service.deleteMany()
    .then(()=>res.status(200).json({message:`All services deleted successfully`}))
    .catch((err)=>res.json({message:err.message}))
}