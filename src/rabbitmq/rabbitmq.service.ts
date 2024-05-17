import { Injectable } from '@nestjs/common';
import { Connection, Channel, connect } from 'amqplib';

@Injectable()
export class RabbitmqService {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  async connection() {
    const connection: Connection = await connect(
      'amqp://username:password@localhost:5672',
    );

    const channel: Channel = await connection.createChannel();

    await channel.assertQueue('myQueue');

    const msg = 'Hello, Payever!';

    channel.sendToQueue('myQueue', Buffer.from('Email'));
    console.log(' Email Sent: %s', msg);
  }
}
