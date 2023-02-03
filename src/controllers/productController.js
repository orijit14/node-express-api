const dbConfig = require("../../config/db");
const { body, validationResult } = require('express-validator');

const Product = require("../models/ProductModel");

exports.validate = (method) => {
    switch (method) {
        case 'productFields': {
            return [ 
                body('product_name', 'Enter product name').notEmpty(),
                //body('email', 'Invalid email').exists().isEmail(),
                
                body('product_desc', 'Enter product description').notEmpty(),
                body('price', 'Enter product price').notEmpty(),
                body('price', 'Enter Number only').isInt(),
                body('status', 'Select status').notEmpty(),
                //body('phone').optional().isInt(),
                //body('status').optional().isIn(['enabled', 'disabled'])
            ]   
        }
        case 'addProductValidation': {
            return [ 
                body('product_name', 'Enter product name').notEmpty(),
                //body('email', 'Invalid email').exists().isEmail(),
                
                body('product_desc', 'Enter product description').notEmpty(),
                body('price', 'Enter product price').notEmpty(),
                body('price', 'Enter Number only').isInt(),
                body('status', 'Select status').notEmpty(),
                //body('phone').optional().isInt(),
                //body('status').optional().isIn(['enabled', 'disabled'])
            ]   
        }
    }
}

exports.index = async(req,res) => {
    let response = await Product.allProduct().catch((e) => {
        return res.send({ success: false, error: [{ msg: e.message, }], status:500 })
    });
    return res.send(response);
}

exports.singleProduct = async(req,res) => {
    let response = await Product.getProductById(req.params.id);
    
    return res.send(response);
}

exports.addProduct = async(req, res) => {
    //console.log(req.body.product_name);
    const errors = validationResult(req);
    //console.log("dsdasdasdasd");
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status:500,
            success: false,
            errors: errors.array()
        });
    }

    let data = {
        product_name: req.body.product_name,
        product_desc: req.body.product_desc,
        price: req.body.price,
        discount: req.body.discount,
        status: req.body.status,
    }
    let response = await Product.add(data);

    try {
        if(response){
            res.json({status:202, success:true, message:'Product added successfully!'});
        }else{
            return({success:false, status:404,  message:'Something went wrong!'}); 
        }
    } catch (error) {
        
    }

    //console.log("req.body", req.body.product_name);
    /* if(req.body.constructor === Object && Object.keys(req.body).length == 0){
        res.send({success:false, status:400, message: "no value getting."});
    }else{
        if(req.body.product_name == ''){
            req.send({success: false, message:"Please enter product name"});
        }else{
            let data = {
                product_name: req.body.product_name,
                product_desc: req.body.product_desc,
                price: req.body.price,
                discount: req.body.discount,
                status: req.body.status,
            }
            let response = await Product.add(data);

            try {
                if(response){
                    res.json({status:202, success:true, message:'Product added successfully!'});
                }else{
                    return({success:false, status:404,  message:'Something went wrong!'}); 
                }
            } catch (error) {
                
            }

        }
    } */    
}


exports.updateProduct = async(req,res) =>{
   
    let id = req.params.id;

    const errors = validationResult(req);

    //console.log("errors", errors);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status:500,
            success: false,
            errors: errors.array()
        });
    }

    let data = {
        product_name: req.body.product_name,
        product_desc: req.body.product_desc,
        price: req.body.price,
        discount: req.body.discount,
        status: req.body.status,
    }
    let response = await Product.update(id,data);

    try {
        if(response){
            res.json({status:202, success:true, message:'Product updated successfully!'});
        }else{
            return({success:false, status:404,  message:'Something went wrong!'}); 
        }
    } catch (error) {
        return({success:false, status:404,  message:error});
    }

    //return false;

    /* if(req.body.constructor === Object && Object.keys(req.body).length == 0){
        res.send({success:false, status:400, message: "no value getting."});
    }else{
        if(req.body.product_name == ''){
            req.send({success: false, message:"Please enter product name"});
        }else{
            let data = {
                product_name: req.body.product_name,
                product_desc: req.body.product_desc,
                price: req.body.price,
                discount: req.body.discount,
                status: req.body.status,
            }
            let response = await Product.update(id,data);

            try {
                if(response){
                    res.json({status:202, success:true, message:'Product updated successfully!'});
                }else{
                    return({success:false, status:404,  message:'Something went wrong!'}); 
                }
            } catch (error) {
                return({success:false, status:404,  message:error});
            }

        }
    }  */

    //res.send("oks");

}

exports.deleteProduct = async(req,res) => {
    console.log(req.params.id);

    if(req.params.id == ''){
        return res.status(400).json({
            status:500,
            success: false,
            errors: 'Product not found!'
        });
    }



    try {
        let result = await dbConfig('products').where('id', req.params.id).del();
        //console.log(result);
        if(result == 1){
            return({success:true, status:202,  msg:'Product deleted successfully!'}); 
        }else{
            return({success:false, status:404,  msg:'Something went wrong.Please try again later!'}); 
        }
    } catch (error) {
        return error;    
    }

   // res.send("oks");

}