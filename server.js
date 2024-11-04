import Express from "express";
import bodyParser from "body-parser";
import { errorHandlers } from "./src/middlewares/errorHandlers.js";
import authRoutes from "./src/routes/authRoutes.js";


const app = Express();
const port = process.env.PORT;

const baseEndpoint = '/api/v1';

app.use(bodyParser.json());
app.use(Express.json());

// TODO: add routes here
// auth routes
app.use(baseEndpoint, authRoutes);

app.use(errorHandlers);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})