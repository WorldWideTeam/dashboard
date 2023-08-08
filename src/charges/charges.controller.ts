import {
  Get,
  Controller,
  Res,
  UseGuards,
  Param,
  Render,
  UseFilters,
} from '@nestjs/common';
import { ChargesService } from './charges.service';

@Controller('/payments')
export class ChargesController {
  constructor(private paymentsService: ChargesService) {}
}
