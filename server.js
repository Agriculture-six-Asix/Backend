import express from "express";
import bodyParser from "body-parser";
import { errorHandlers } from "./src/middlewares/errorHandlers.js";
import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import bibitRoutes from "./src/routes/bibitRoutes.js";
import tagRoutes from "./src/routes/tagRoutes.js";
import ratingRoutes from "./src/routes/ratingRoutes.js";
import forumRoutes from "./src/routes/forumRoutes.js";
import repliesRoutes from "./src/routes/repliesRoutes.js";
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
// bibit routes
app.use(`${baseEndpoint}/bibit`, bibitRoutes);
// tag routes
app.use(`${baseEndpoint}/tag`, tagRoutes);
// rating routes
app.use(`${baseEndpoint}/rating`, ratingRoutes);
// forum routes
app.use(`${baseEndpoint}/forum`, forumRoutes);
// forum replies routes
app.use(`${baseEndpoint}/forum`, repliesRoutes);


app.use(errorHandlers);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})