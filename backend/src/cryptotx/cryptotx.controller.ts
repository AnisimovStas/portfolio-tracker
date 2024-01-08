import { Controller, Get } from '@nestjs/common';
import { CryptotxService } from './cryptotx.service';

@Controller('cryptotx')
export class CryptotxController {
  constructor(private readonly cryptotxService: CryptotxService) {}
  @Get()
  images() {
    return this.cryptotxService.fixImageLinks();
  }
}
