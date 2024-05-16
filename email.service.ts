import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nastaran81dr@gmail.com',
        pass: '-password' 
      }
    });
  }

  async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'nastaran81dr@gmail.com',
      to: to,
      subject: subject,
      text: text
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.response);
      return info.response;
    } catch (error) {
      console.error('Error sending email: ', error);
      throw error;
    }
  }
}
