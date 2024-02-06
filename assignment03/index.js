import dotenv from "dotenv";
import createServer from "./server.js";

dotenv.config();

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

async function main() {
    const server = await createServer();
    await server.listen(port, host);
    console.log(`Server is running at ${host}:${port}`);
}

main().catch(console.error);
