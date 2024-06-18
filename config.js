import { Kafka } from "kafkajs";

class KafkaConfig {
  constructor() {
    this.kafka = new Kafka({
      clientId: "nodejs-kafka",
      brokers: ["localhost:9092"],
    });
    this.producer = this.kafka.producer();
    this.consumer = this.kafka.consumer({ groupId: "test-group" });
  }

  async produce(topic, messages) {
    try {
      await this.producer.connect(); // connect to the producer
      await this.producer.send({
        topic: topic,
        messages: messages, // messages should be an array
      });
    } catch (e) {
      console.error(e);
    } finally {
      await this.producer.disconnect();
    }
  }

  async consume(topic, callback) {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({
        topic: topic,
        fromBeginning: true,
      });

      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const value = message.value.toString();
          callback(value); //a function that defines the logic that'd apply to each message consumed from the Kafka topic
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export default KafkaConfig;
