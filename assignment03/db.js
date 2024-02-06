import { MongoClient, ServerApiVersion } from "mongodb";

export default async () => {
    const dsn = process.env.MONGODB_DSN || "mongodb://localhost:27017";
    const client = new MongoClient(dsn, { serverApi: ServerApiVersion.v1 });
    await client.connect();
    return client.db(process.env.MONGODB_DB || "assignment03");
};
