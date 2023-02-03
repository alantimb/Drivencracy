import express from "express";
import cors from "cors";
import pollRoutes from "./routes/poll.routes.js";
import choiceRoutes from "./routes/choice.routes.js";
import voteRoute from "./routes/vote.routes.js";
import resultRoute from "./routes/result.routes.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use([pollRoutes, choiceRoutes, voteRoute, resultRoute]);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));
