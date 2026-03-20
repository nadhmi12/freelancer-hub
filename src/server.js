import express from "express";

// local import
import { ENV } from "./config/env.js";
import { errorHandler } from "./middleware/errorHandler.js";
import clientRouter from "./routes/client.routes.js";

const app = express();
app.use(express.json());

app.use("/api/clients", clientRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use(errorHandler);

app.listen(ENV.PORT, () => {
  console.log(`server is running on http://localhost:${ENV.PORT}`);
});
