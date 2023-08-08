import {
  Get,
  Controller,
  Res,
  UseGuards,
  Param,
  Render,
  UseFilters,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('/payments')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}
}
