import express from 'express';
require("dotenv").config();
import bodyParser from "body-parser";
import routes from "./router/routes";
import cors from "cors";
import fileUpload from "express-fileupload"
import helmet from 'helmet';
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send("Welcome to Project Service API");
});
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "./tmp",
      }),
)


app.use('/v1/apis/projects/', routes);

//permission to get image from node server
app.use(express.static('public'));
app.use('/assets/', express.static('src/assets/'));
const port = process.env.PORT || 7007;
app.listen(port);
