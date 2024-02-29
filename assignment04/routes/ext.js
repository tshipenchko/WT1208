const express = require("express");
const router = express.Router();

const RANDOM_WORDS_URL = "https://random-word.ryanrk.com/api/en/word/random/10";
const RANDOM_IMAGE_URL = "https://picsum.photos/600/200";

router.get("/random/sentence", (req, res) => {
    fetch(RANDOM_WORDS_URL)
        .then(response => response.json())
        .then(data => res.json(data.join(" ")));
});

router.get("/random/image", async (req, res) => {
    try {
        const imageResponse = await fetch(RANDOM_IMAGE_URL);

        if (!imageResponse.ok) {
            console.error(`Failed to fetch image: ${imageResponse.statusText}`);
            res.send(500).json({ msg: "Failed to fetch image" });
            return;
        }

        const imageBuffer = await imageResponse.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);

        res.set("Content-Type", "image/jpeg");
        res.set("Content-Length", imageBuffer.length);
        res.send(buffer);
    } catch (error) {
        console.error("Error fetching image:", error);
        res.status(500).send("Error fetching image");
    }
});

module.exports = router;
