import KafkaConfig from "./config.js";

const sendMessageToKafka = async (req, res) => {
  try {
    const { message } = req.body;
    const kafkaConfig = new KafkaConfig();
    const messages = [{ key: "Key1", value: message }];

    kafkaConfig.produce("my-topic", messages);
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: e });
  }
};
