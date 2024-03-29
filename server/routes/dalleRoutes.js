import express from 'express';
import * as dotenv from 'dotenv';
import {Configuration, OpenAIApi} from 'openai';


dotenv.config();

const router = express.Router();

// configuration to use openai
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY //api key gotten from openai
})

const openai = new OpenAIApi(configuration);


//this dall-E route will make a call to the openai dall-E api and based on our prompt(on the frontend) will return a generated image
router.post('/', async (req, res)=>{
    try {
        const {prompt} = req.body;

        const aiResponse = await openai.createImage({
            prompt:prompt,
            n: 1, //number of images we want to generate
            size: '1024x1024',
            response_format: 'b64_json'
        });

        //getting the generated image from the aiResponse
        const image = aiResponse.data.data[0].b64_json;

        res.status(200).json({photo:image});
    } catch (error) {
        console.log(error);

        res.status(500).send(error?.response.data.error.message);
    }
})

export default router;