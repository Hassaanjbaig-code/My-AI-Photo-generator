import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Hello from dalle AI");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const arrayImages = [];
    const aiResponce = await openai.createImage({
      prompt,
      n: 3,
      size: "1024x1024",
      response_format: "b64_json",
    });
    aiResponce.data.data.forEach((image) => {
      const images = image.b64_json;
      arrayImages.push(images);
    });
    res.status(200).json({ photo: arrayImages });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;
