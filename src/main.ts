import dotenv from "dotenv";
dotenv.config();

import { connectToDatabase, disconnectFromDatabase } from "./config/database";
import logger from "./utils/logger";
import app from "./server";

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server listening on port ${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefullShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();

    await disconnectFromDatabase();
    logger.info(`Server received ${signal}`);
    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefullShutdown(signals[i]);
}
