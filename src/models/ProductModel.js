const { json } = require("body-parser");
const dbConfig = require("../../config/db");

var Product = function(product){
    this.product_name = product.product_name;
    this.product_desc = product.product_desc;
    this.price = product.price;
    this.discount = product.discount;
    this.status = product.status;
    this.created_at = new Date();
}

Product.allProduct = async(req,res) => {

    const results = await dbConfig('products').select('*').orderBy('id', 'DESC');

    return ({status:200, result:results});

}

Product.getProductById = async(id) => {

    if(id){
        const result = await dbConfig('products').where({id:id});
        console.log("result =", result.length);
        if(result && result.length == 1){
            return result;
        }else{
            return({success:false, status:404,  msg:'No product found!'}); 
        }
    }else{
        return({success: false, status:404, msg: "id not found!"}); //return json({success: false, msg: "id not found!"});
    }

}

Product.add = (data) => {
    const insert = dbConfig('products').insert({
        product_name: data.product_name,
        product_desc: data.product_desc,
        price: data.price,
        discount: data.discount,
        status: data.status,
    });

    try {
        if(insert){
            return insert;
        }else{
            return({success:false, status:404,  msg:'Something went wrong.Please try again later!'}); 
        }
    } catch (error) {
        return error;    
    }

    /* if (insert) {
        return insert;
    } else {
        return({success:false, status:404,  msg:'Something went wrong.Please try again later!'}); 
    } */
}

Product.update = (id,data) => {
    if(id){

        const update = dbConfig('products').where({id:id}).update({
            product_name: data.product_name,
            product_desc: data.product_desc,
            price: data.price,
            discount: data.discount,
            status: data.status,
        });

        try {
            if(update){
                return update;
            }else{
                return({success:false, status:404, message:'updation falied. Please try after sometime.'})
            }
        } catch (error) {
            return error;
        }

    }else{
        return({success:false, status:404,  msg:'Something went wrong.Please try again later!'});
    }
}

module.exports = Product;