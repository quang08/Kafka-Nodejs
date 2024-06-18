import express from "express";
import bodyParser from "body-parser";

const app = express();
const jsonParser = bodyParser.json();

app.listen(8081, () => {
	console.log("Server is running on port 8081");
})
