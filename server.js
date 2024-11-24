import express from "express";
import bodyParser from "body-parser";
import { errorHandlers } from "./src/middlewares/errorHandlers.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
// import cors from 'cors';


const app = express();
const port = process.env.PORT;

const baseEndpoint = '/api/v1';

// app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// TODO: add routes here
// auth routes
app.use(`${baseEndpoint}/auth`, authRoutes);
// user routes
app.use(`${baseEndpoint}/user`, userRoutes);


app.use(errorHandlers);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})