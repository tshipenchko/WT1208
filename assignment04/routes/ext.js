const express = require("express");
const router = express.Router();

const RANDOM_WORDS_URL = "https://random-word.ryanrk.com/api/en/word/random/10";
const RANDOM_IMAGE_URL = "https://picsum.photos/600/200";
const RANDOM_USERS_URL = "https://fakestoreapi.com/users";

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

router.get("/random/user", async (req, res) => {
    try {
        const userResponse = await fetch(RANDOM_USERS_URL);

        if (!userResponse.ok) {
            console.error(`Failed to fetch user: ${userResponse.statusText}`);
            res.send(500).json({ msg: "Failed to fetch user" });
            return;
        }

        const users = await userResponse.json();
        const user = users[Math.floor(Math.random() * users.length)];

        res.json({
            firstName: capitalizeFirstLetter(user.name.firstname),
            lastName: capitalizeFirstLetter(user.name.lastname),
            email: user.email,
            country: "USA",
            gender: Math.random() < 0.5 ? "Male" : "Female",
        })
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send("Error fetching user");
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = router;
