const express = require("express");
const SSEChannel = require("sse-channel");

const chatChannel = new SSEChannel(undefined);
const app = express();
app.use("/static", express.static("mychat"));

app.get("/", (req, res) => {
    res.send("hi");
});

app.get("/json", (req, res) => {
    res.json({ text: "hi", numbers: [1, 2, 3] });
});

app.get("/echo", (req, res) => {
    const input = req.query.input || "";
    res.json({
        normal: input,
        shouty: input.toUpperCase(),
        characterCount: input.length,
        backwards: input.split("").reverse().join(""),
    });
});

app.get("/chat", (req, res) => {
    const data = req.query.message;

    if (!data) {
        res.status(400).end();
        return;
    }

    // noinspection JSCheckFunctionSignatures
    chatChannel.send({
        id: Math.floor(Date.now() / 1000),
        data: data.trim(),
        event: "message",
    });
    res.status(200).end();
});

app.get("/sse", (req, res) => {
    chatChannel.addClient(req, res, () => {
        for (let i = chatChannel.history.length - 1; i >= 0; i--) {
            const message = chatChannel.history[i];
            res.write(`${message.msg}\n`);
        }
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
