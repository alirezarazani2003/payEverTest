import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UserService {
  private transporter;

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly amqpConnection: AmqpConnection
  ) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    await createdUser.save();


    this.amqpConnection.publish('exchange1', 'user.created', createdUser);

    
    await this.sendEmail(createdUser.email, 'User Created', 'Your user account has been created.');

    return createdUser;
  }

  private async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`Email sent to ${to}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
