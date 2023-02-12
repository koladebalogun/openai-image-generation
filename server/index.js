import express from "express";
import cors from 'cors';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


app.get('/', (req, res) => {
    res.send("Hello Dall-E")
})

mongoose.set("strictQuery", false);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('connected to mongodb and Listening on port', process.env.PORT);
    })
})
.catch((error) => {
    console.log(error)
})