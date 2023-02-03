const { body, validationResult } = require('express-validator');

exports.addProductValidation = () => {
    return [
        body('product_name', 'Enter product name').notEmpty(),
        body('product_desc', 'Enter product description').notEmpty(),
        body('price', 'Enter product price').notEmpty(),
        body('price', 'Enter Number only').isInt(),
        body('status', 'Select status').notEmpty(),
    ];
}

/* exports.addProductValidation = (method) => {
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
} */