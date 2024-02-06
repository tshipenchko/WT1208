import { Router } from "express";

/**
 * @param {import("mongodb").Db} db
 */
export default (db) => {
    const router = Router();
    // noinspection JSUnresolvedReference
    const posts = db.collection("posts");

    // Read
    router.get("/posts", async (req, res) => {
        let { skip, limit } = req.query;
        skip = parseInt(skip) || 0;
        limit = parseInt(limit) || 10;

        res.json(await posts.find().skip(skip).limit(limit).toArray());
    });

    router.get("/posts/:id", async (req, res) => {
        const { id } = req.params;
        const result = await posts.findOne({ _id: id });
        if (result === null) {
            res.status(404).json({ error: "Not found" });
        } else {
            res.json(result);
        }
    });

    // Create
    router.post("/posts", async (req, res) => {
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            res.status(400).json({ error: "title, content, and author are required" });
            return;
        }

        const result = await posts.insertOne({ title, content, author, created: new Date() });
        res.json({ id: result.insertedId });
    });

    // Update
    router.put("/posts/:id", async (req, res) => {
        const { id } = req.params;
        const { title, content, author } = req.body;
        const toUpdate = {};
        if (title) toUpdate.title = title;
        if (content) toUpdate.content = content;
        if (author) toUpdate.author = author;

        if (Object.keys(toUpdate).length === 0) {
            res.status(400).json({ error: "title, content, or author is required" });
            return;
        }

        const result = await posts.updateOne({ _id: id }, { $set: toUpdate });
        if (result.matchedCount === 0) {
            res.status(404).json({ error: "Not found" });
        } else {
            res.json({ id });
        }
    });

    // Delete
    router.delete("/posts/:id", async (req, res) => {
        const { id } = req.params;
        const result = await posts.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: "Not found" });
        } else {
            res.json({ id });
        }
    });

    return router;
};
