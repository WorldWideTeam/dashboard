import {
  Post,
  Controller,
  HttpException,
  HttpStatus,
  Req,
  Body,
} from '@nestjs/common';
import { CoinbaseService } from './coinbase.service';
import { Event } from './events.enum';
import { ICoinbaseEvent } from './coinbase.dto';

@Controller('api/v1/callbacks')
export class CoinbaseController {
  constructor(private coinbaseService: CoinbaseService) {}

  @Post('coinbase')
  async handleCoinbaseRequest(@Body() body: { event: ICoinbaseEvent }) {
    console.log('charge');
    try {
      // const event = await this.coinbaseService.verifyEventBody({
      //   rawBody: JSON.stringify(request.body),
      //   headers: request.headers,
      // });

      const event = body.event;

      switch (event.type) {
        case Event.ChargeCreated: {
          await this.coinbaseService.createCharge(event);
          break;
        }

        case Event.ChargeConfirmed: {
          await this.coinbaseService.confirmCharge(event);
          break;
        }
      }
      return {};
    } catch (error) {
      console.log(error);
      throw new HttpException('BAD_REQUEST', HttpStatus.BAD_REQUEST);
    }
  }
}
