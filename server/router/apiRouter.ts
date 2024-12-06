import express, { response } from 'express';
import mongoose from 'mongoose';
import ProductTable from '../database/schemas/ProductSchema';

const apiRouter: express.Router = express.Router();

apiRouter.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({
        msg: 'Welcome to API Router'
    });
});

//create product
apiRouter.post('/products', async (req: express.Request, res: express.Response): Promise<any> => {
    try {
        let product = {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            quantity: req.body.quantity,
            info: req.body.info
        };

        //in short we can write it as: 
        // let { name, image, price, quantity, info } = req.body;
        // let product = { name, image, price, quantity, info };

        // status 400: "Bad Request" error, 
        //indicates that the server was unable to process a request due to a client error
        if (!product.name || !product.price || !product.quantity) {
            return res.status(400).json({
                msg: "Invalid input! Name, price, and quantity are required."
            });
        }

        //check if product already exists
        let isExistingProduct = await ProductTable.findOne({ name: product.name });
        if (isExistingProduct) {
            // 401: authentication err
            // 409: duplicate data err
            return res.status(409).json({
                msg: "Product already exists!"
            });
        }

        /* in ts plain objects are different from mongoose model objects
        * mongoose objects bring methods like save() along with them.
        * so there is a clear type mismatch and ts will not auto change 
        * type when re-assigning an old variable having its own type
        * since it can break code somewhere else in a large codebase,
        * this is called type widening or type persistence.
        * 
        * 
        * So if reassigning an old object type casting must be done like 
        * product = new ProductTable(product) as Product;
        * product = await product.save();
        * else use a new variable for this action.
        */

        let newProduct = new ProductTable(product);
        product = await newProduct.save(); //insert into db

        /* alternatively mongoose also provides a create method that does 
        * both instantiation and saving at same time
        * product = await ProductTable.create(product);
        */

        res.status(200).json({
            msg: "Product created successfully!"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

//get all products
apiRouter.get('/products', (req: express.Request, res: express.Response) => {
    res.status(200).json({
        msg: 'Get all products'
    });
});

//get single product
apiRouter.get('/products/:productId', (req: express.Request, res: express.Response) => {
    let { productId }: any = req.params;
    res.status(200).json({
        msg: 'Get a single product',
        productId: productId
    });
});

//update product
apiRouter.put('/products/:productId', async (req: express.Request, res: express.Response): Promise<any> => {
    // this is called destructuring of variables used to unpack properties from an object
    let { productId }: any = req.params;
    try {
        let updatedProduct = {
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            quantity: req.body.quantity,
            info: req.body.info
        };

        //check if product exists
        let product = await ProductTable.findById(productId);
        if (!product) {
            return res.status(404).json({
                msg: "Product Not Found!",
                productId: productId
            });
        }

        //update product if exists
        product = await ProductTable.findByIdAndUpdate(productId, {
            // note that productId was auto gen by mongo so even if string format is passed,
            // it will auto convert it to mongoId internally, works only for _id field

            $set: {
                name: updatedProduct.name ? updatedProduct.name : product.name,
                image: updatedProduct.image ? updatedProduct.image : product.image,
                price: updatedProduct.price ? updatedProduct.price : product.price,
                quantity: updatedProduct.quantity ? updatedProduct.quantity : product.quantity,
                info: updatedProduct.info ? updatedProduct.info : product.info,
            }
        }, { new: true });

        res.status(200).json({
            msg: "Product is updated successfully!",
            productId: productId
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
});

//delete product
apiRouter.delete('/products/:productId', (req: express.Request, res: express.Response) => {
    let { productId }: any = req.params;
    res.status(200).json({
        msg: 'Delete a product',
        productId: productId
    });
});


export default apiRouter;