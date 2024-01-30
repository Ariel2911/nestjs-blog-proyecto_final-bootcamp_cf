import { HttpException, HttpStatus } from '@nestjs/common';

export class ErrorManager extends Error {
  constructor({ type, message }: { type: HttpStatus; message: string }) {
    super(`${type} :: ${message}`);
  }

  public static createSignatureError(message: string) {
    const name = message.split(' :: ')[0];

    if (name) {
      throw new HttpException(message, HttpStatus[name]);
    } else {
      console.log('first');
      throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
