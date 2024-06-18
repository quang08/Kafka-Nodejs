import express from "express";
import bodyParser from "body-parser";
import controllers from "./controller.js";
import KafkaConfig from "./config.js";

const app = express();
const jsonParser = bodyParser.json();

app.post("/send", jsonParser, controllers.sendMessageToKafka);

//consume from topic
const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic", (value) => {
  console.log("Receive Mesage: ", value);
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
