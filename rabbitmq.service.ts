import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService {
  private connection: amqp.Connection;
  private channel: amqp.Channel;

  constructor() {
    this.connect();
  }

  async connect() {
    try {
      this.connection = await amqp.connect('amqp://localhost'); // آدرس RabbitMQ خود را وارد کنید
      this.channel = await this.connection.createChannel();
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Error connecting to RabbitMQ: ', error);
      throw error;
    }
  }

  async publish(queue: string, message: string) {
    try {
      await this.channel.assertQueue(queue);
      await this.channel.sendToQueue(queue, Buffer.from(message));
      console.log(`Message sent to queue ${queue}: ${message}`);
    } catch (error) {
      console.error(`Error publishing message to queue ${queue}: `, error);
      throw error;
    }
  }

  async consume(queue: string, callback: (msg: amqp.ConsumeMessage | null) => void) {
    try {
      await this.channel.assertQueue(queue);
      await this.channel.consume(queue, callback, { noAck: true });
      console.log(`Consuming messages from queue ${queue}`);
    } catch (error) {
      console.error(`Error consuming messages from queue ${queue}: `, error);
      throw error;
    }
  }
}
