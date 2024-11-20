import express, { response } from 'express';

const apiRouter: express.Router = express.Router();

apiRouter.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({
        msg: 'Welcome to API Router'
    });
});

//create product
apiRouter.post('/products', (req: express.Request, res: express.Response) => {
    res.status(200).json({
        msg: 'Create a product'
    });
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
apiRouter.put('/products/:productId', (req: express.Request, res: express.Response) => {
    let { productId }: any = req.params;
    res.status(200).json({
        msg: 'Update a product',
        productId: productId
    });
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