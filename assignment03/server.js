import express from "express";
import createDB from "./db.js";
import createRouter from "./router.js";

export default async () => {
    const app = express();
    const db = await createDB();
    const router = createRouter(db);

    app.use(express.static("public"));
    app.use(express.json());
    app.use(router);

    return app;
};
