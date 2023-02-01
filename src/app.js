import express from "express";
import cors from "cors";
import pollRoutes from "./routes/poll.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(pollRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));

