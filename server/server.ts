import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose, { Mongoose } from 'mongoose';


const app: express.Application = express();

app.use(cors());
dotenv.config({ path: './.env' });


let hostName: string | undefined = process.env.HOST_NAME;
let port: number | undefined = Number(process.env.PORT)
let mongoDbUrl: string | undefined = process.env.MONGODB_URL;

// mongoDb connection
if (mongoDbUrl) {
    mongoose.connect(mongoDbUrl).then((response: Mongoose) => {
        console.log("Connected to MongoDB successfully...");
    }).catch((err) => {
        console.error(err);
        process.exit(1);
    })
}

app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).json({
        msg: 'Welcome to Express Server of Nature Fresh App!'
    })
});

if (port && hostName) {
    app.listen(port, hostName, () => {
        console.log(`Express Server is started at : http://${hostName}:${port}`);
    });
}