import KafkaConfig from "./config.js";

const sendMessageToKafka = async (req, res) => {
  try {
    const { message } = req.body;
    console.log("Received request to send message:", message);
    const kafkaConfig = new KafkaConfig();
    const messages = [{ key: "Key1", value: message }];
    console.log("Prepared messages array:", messages);

    await kafkaConfig.produce("my-topic", messages);
    console.log("Message successfully sent to Kafka:", messages);

    res.status(200).json({
      status: "Ok",
      message: "Message successfully sent!",
    });
  } catch (e) {
    console.error("Error sending message to Kafka:", e);
    res.status(400).json({ message: e.message });
  }
};

const controllers = { sendMessageToKafka };

export default controllers;
